import { useMutation } from "@apollo/client";
import { DELETE_CHALLENGE, GET_CHALLENGES } from "@/challenge/challenge.graphql";

const useChallengeDelete = (userId) => {
  const [deleteChallenge, deleteState] = useMutation(DELETE_CHALLENGE, {
    update(cache, { data: { deleteUserChallenge } }) {
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
          getMyChallengeList: getMyChallengeList.filter((challenge) => challenge?._id !== deleteUserChallenge),
        },
      });
    },
  });
  return [deleteChallenge, deleteState];
};

export default useChallengeDelete;
