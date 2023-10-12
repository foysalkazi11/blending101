import { CREATE_CHALLENGE_POST, GET_30DAYS_CHALLENGE } from "@/challenge/challenge.graphql";
import { useMutation } from "@apollo/client";

const useAddChallengePost = (userId) => {
  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST);
  return [addPost, addState];
};

export default useAddChallengePost;
