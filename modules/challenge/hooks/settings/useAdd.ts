import { useMutation } from "@apollo/client";
import { CREATE_CHALLENGE, GET_CHALLENGES } from "@/challenge/challenge.graphql";
import { useUser } from "context/AuthProvider";
import Publish from "helpers/Publish";

const useChallengeAdd = (days) => {
  const { id: userId } = useUser();

  const [addAction, addState] = useMutation(CREATE_CHALLENGE, {
    update(cache, { data: { createUserChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId: userId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.concat(createUserChallenge),
        },
      });
    },
  });

  const addChallenge = async (data) => {
    const challengeData = {
      data: {
        memberId: userId,
        ...data,
        days: days,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    };
    Publish({
      mutate: addAction,
      variables: challengeData,
      state: addState,
      success: `Created Challenge Successfully`,
    });
  };

  return addChallenge;
};

export default useChallengeAdd;
