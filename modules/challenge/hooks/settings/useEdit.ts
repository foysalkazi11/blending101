import { useMutation } from "@apollo/client";
import { EDIT_CHALLENGE, GET_CHALLENGES } from "@/challenge/challenge.graphql";
import { useUser } from "context/AuthProvider";
import Publish from "helpers/Publish";

const useChallengeEdit = (days, challengeId) => {
  const { id: memberId } = useUser();

  const [editAction, editState] = useMutation(EDIT_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge"],
    update(cache, { data: { editUserChallenge } }) {
      const definition = {
        query: GET_CHALLENGES,
        variables: {
          memberId,
        },
      };
      const { getMyChallengeList } = cache.readQuery<any>(definition);
      cache.writeQuery({
        ...definition,
        data: {
          getMyChallengeList: getMyChallengeList.map((challenge) => {
            if (challenge?._id === editUserChallenge?._id) {
              return editUserChallenge;
            } else {
              return challenge;
            }
          }),
        },
      });
    },
  });

  const editChallenge = async (data) => {
    const challengeData = {
      data: {
        memberId,
        ...data,
        days: days,
        startDate: data.startDate,
        endDate: data.endDate,
        challengeId,
      },
    };

    Publish({
      mutate: editAction,
      variables: challengeData,
      state: editState,
      success: `Edited Challenge Successfully`,
    });
  };

  return editChallenge;
};

export default useChallengeEdit;
