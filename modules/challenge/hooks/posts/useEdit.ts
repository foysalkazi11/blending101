import { EDIT_CHALLENGE_POST, GET_30DAYS_CHALLENGE } from "@/challenge/challenge.graphql";
import { useMutation } from "@apollo/client";

const useEditChallengePost = (userId) => {
  const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
    update(cache, { data: { editAChallengePost: editedPost } }) {
      const editedDate = editedPost?.challenge?.date;
      const { prevPostDate, postId } = editedPost?.prevPost;
      const definition = {
        query: GET_30DAYS_CHALLENGE,
        variables: {
          userId,
          startDate: "",
        },
      };
      const { getMyThirtyDaysChallenge } = cache.readQuery<any>(definition);

      const challenges = [];
      getMyThirtyDaysChallenge.challenge.forEach((day) => {
        // ADDING POST TO THE NEW DATE
        if (day.date === editedDate) {
          challenges.push(editedPost?.challenge);
        }
        // REMOVING POST FROM THE PREVIOUS DATE
        else if (prevPostDate !== editedDate && day.date === prevPostDate) {
          console.log({
            ...day,
            posts: day.posts.filter((post) => post._id !== postId),
          });
          challenges.push({
            ...day,
            posts: day.posts.filter((post) => post._id !== postId),
          });
        }
        // STORING THE DATA IN UNCHANGED WAY
        else {
          challenges.push(day);
        }
      });
      console.log(challenges);
      // const data = {
      //   challenge: getMyThirtyDaysChallenge.challenge.map((day) =>
      //     day.date === editedPost?.challenge?.date
      //       ? editedPost?.challenge
      //       : day,
      //   ),
      //   challengeInfo: editedPost?.challengeInfo,
      // };
      const data = {
        challenge: challenges,
        challengeInfo: editedPost?.challengeInfo,
      };
      cache.writeQuery({
        ...definition,
        data: { getMyThirtyDaysChallenge: data },
      });
    },
  });
  return [editPost, editState];
};

export default useEditChallengePost;
