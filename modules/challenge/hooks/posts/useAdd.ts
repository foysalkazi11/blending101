import { CREATE_CHALLENGE_POST, GET_30DAYS_CHALLENGE } from "@/challenge/challenge.graphql";
import { useMutation } from "@apollo/client";

const useAddChallengePost = (userId) => {
  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST, {
    update(cache, { data: { createChallengePost } }) {
      const definition = {
        query: GET_30DAYS_CHALLENGE,
        variables: {
          userId,
          startDate: "",
        },
      };
      const { getMyThirtyDaysChallenge } = cache.readQuery<any>(definition);
      const data = {
        challenge: getMyThirtyDaysChallenge.challenge.map((day) =>
          day.date === createChallengePost?.challenge?.date ? createChallengePost?.challenge : day,
        ),
        challengeInfo: createChallengePost?.challengeInfo,
      };
      cache.writeQuery({
        ...definition,
        data: { getMyThirtyDaysChallenge: data },
      });
    },
  });
  return [addPost, addState];
};

export default useAddChallengePost;
