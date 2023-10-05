import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { useState, useEffect, useCallback } from "react";
import { SHARE_PLAN } from "../plan.graphql";

/*
  ||||||||||||||||||||||||||||||||||||
    TO SHARE PLAN 
  ||||||||||||||||||||||||||||||||||||
*/
const useSharePlan = (planId): [string, () => void] => {
  const { id: userId } = useUser();
  const [sharePlan, { data: share }] = useMutation(SHARE_PLAN);

  const [link, setLink] = useState("");

  useEffect(() => {
    if (!share?.sharePlan) return;
    setLink(`${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`);
    navigator.clipboard.writeText(
      `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/planner/plan/shared/?token=${share?.sharePlan}`,
    );
  }, [share]);

  const getLink = useCallback(async () => {
    await sharePlan({
      variables: {
        userId,
        planId,
      },
    });
  }, [planId, sharePlan, userId]);

  return [link, getLink];
};

export default useSharePlan;
