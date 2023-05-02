import { useLazyQuery } from "@apollo/client";
import { GET_ALL_PLANS } from "../../../graphql/Planner";
import { useState, useEffect, useCallback, useRef } from "react";
import { useAppSelector } from "../../../redux/hooks";

interface IAllPlan {
  page: number;
  setPage: any;
}

const useAllPlan = (props: IAllPlan) => {
  const { page, setPage } = props;
  const [plans, setPlans] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

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
  }, []);

  useEffect(() => {
    getAllPlan({
      variables: {
        limit: 10,
        page,
        memberId: userId,
      },
    }).then((response) => {
      const data = response.data?.getAllGlobalPlans;
      setPlans((prevPlan) => [...prevPlan, ...data?.plans]);
      setHasMore(data?.plans?.length > 0);
    });
  }, [getAllPlan, page, userId]);

  return { plans, loading, observer: lastPlanRef };
};

export { useAllPlan };
