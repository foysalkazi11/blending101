import { GET_ALL_PLANS } from "@/plan/plan.graphql";
import { useLazyQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { useState, useRef, useCallback, useEffect } from "react";

interface IPlanDiscoveryHook {
  page: number;
  setPage: any;
  limit?: number;
  query?: string;
  param?: string;
}

const useAllPlan = (props: IPlanDiscoveryHook) => {
  const { page, setPage, limit, query = "" } = props;

  const [plans, setPlans] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { id: userId } = useUser();

  const [getAllPlan, { loading }] = useLazyQuery(GET_ALL_PLANS);

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

  // RESETTING RECIPES ON QUERY OR CATEGORY CHANGE
  useEffect(() => {
    setPlans([]);
    setPage(1);
    // setHasMore(false);
  }, [query, setPage]);

  useEffect(() => {
    const getData = setTimeout(() => {
      getAllPlan({
        variables: {
          limit: limit || 10,
          page,
          memberId: userId,
          query,
        },
      }).then((response) => {
        const data = response.data?.getAllGlobalPlans;
        if (!data?.plans) return;
        setPlans((prevPlan) => [...prevPlan, ...data?.plans]);
        setHasMore(data?.plans?.length > 0);
      });
    }, 1000);
    return () => clearTimeout(getData);
  }, [getAllPlan, limit, page, userId, query]);

  return { plans, loading, observer: lastPlanRef };
};

export default useAllPlan;
