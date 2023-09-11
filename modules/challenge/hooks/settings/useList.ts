import { GetAllChallenges } from "@/app/types/challenge.types";
import { useQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { GET_CHALLENGES } from "@/challenge/challenge.graphql";

const useChallenges = () => {
  const { id } = useUser();

  const { data: challenges } = useQuery<GetAllChallenges>(GET_CHALLENGES, {
    variables: {
      memberId: id,
    },
  });

  return challenges?.getMyChallengeList || [];
};

export default useChallenges;
