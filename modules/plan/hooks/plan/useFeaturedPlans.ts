import { GET_RECENT_PLANS, GET_RECCOMENDED_PLANS, GET_POPULAR_PLANS } from "@/plan/plan.graphql";
import { useLazyQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { useRef, useState, useCallback, useMemo, useEffect } from "react";

interface IPlanDiscoveryHook {
  page: number;
  setPage: any;
  limit?: number;
  query?: string;
  param?: string;
}

const useFeaturedPlan = (props: IPlanDiscoveryHook) => {
  const { param, page, setPage } = props;

  const hasFetchedPlan = useRef(false);
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(false);

  const memberId = useUser().id;
  console.log({ ...hasFetchedPlan, param });

  // OBSERVING THE LAST RECIPE POSITION OF THE LIST TO TRY TO FETCH MORE RECIPES
  const observer = useRef<any>();
  const lastPlanRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, setPage],
  );

  const config = useMemo(
    () => ({
      variables: {
        memberId,
        limit: 8,
        page,
      },
      skip: memberId === "",
    }),
    [memberId, page],
  );

  const [getAllRecommendedRecipes] = useLazyQuery(GET_RECENT_PLANS);
  const [getAllPopularRecipes] = useLazyQuery(GET_RECCOMENDED_PLANS);
  const [getAllLatestRecipes] = useLazyQuery(GET_POPULAR_PLANS);

  useEffect(() => {
    async function fetchData(config) {
      setLoading(true);
      let response: any;
      switch (param) {
        case "recommended":
          response = await getAllRecommendedRecipes(config);
          break;
        case "popular":
          response = await getAllPopularRecipes(config);
          break;
        case "recent":
          response = await getAllLatestRecipes(config);
          break;
        default:
          return;
      }
      const data = response.data?.result;
      setResponse((prevPlan) => [...prevPlan, ...data?.plans]);
      setHasMore(data?.plans?.length > 0);
      setLoading(false);
    }

    if (param && param !== "" && !hasFetchedPlan.current) {
      fetchData(config).then(() => {
        hasFetchedPlan.current = true;
      });
    }
  }, [param, config, getAllRecommendedRecipes, getAllPopularRecipes, getAllLatestRecipes]);

  return { data: response, loading, observer: lastPlanRef };
};

export default useFeaturedPlan;
