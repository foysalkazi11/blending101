import { useMutation } from "@apollo/client";
import { ACTIVATE_CHALLENGE, GET_CHALLENGES } from "@/challenge/challenge.graphql";

const useChallengeActivate = (userId) => {
  const [activateChallenge, activateState] = useMutation(ACTIVATE_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge"],
    update(cache, { data: { activateChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      const value = getMyChallengeList.map((challenge) =>
        challenge?._id === activateChallenge ? { ...challenge, isActive: true } : { ...challenge, isActive: false },
      );
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.map((challenge) =>
            challenge?._id === activateChallenge ? { ...challenge, isActive: true } : { ...challenge, isActive: false },
          ),
        },
      });
    },
  });
  return [activateChallenge, activateState];
};

export default useChallengeActivate;
