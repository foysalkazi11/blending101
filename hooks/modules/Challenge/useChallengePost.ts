// import { ApolloCache, useMutation } from "@apollo/client";
// import { GET_CHALLENGES } from "../../../graphql/Challenge";

// const update30DaysChallenge = (
//   userId: string,
//   cache: ApolloCache<any>,
//   mutated,
// ) => {
//   const definition = {
//     query: GET_CHALLENGES,
//     variables: {
//       memberId: userId,
//     },
//   };
//   const { getMyChallengeList } = cache.readQuery<any>(definition);
//   const data = {
//     challenge: getMyChallengeList.challenge.map((day) =>
//       day.date === mutated?.challenge?.date ? mutated?.challenge : day,
//     ),
//     challengeInfo: mutated?.challengeInfo,
//   };
//   cache.writeQuery({
//     ...definition,
//     data: { getMyChallengeList: data },
//   });
// };

// const useAddChallenge = (userId) => {
//   const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST, {
//     update(cache, { data: { createChallengePost } }) {
//       const definition = {
//         query: GET_CHALLENGES,
//         variables: {
//           memberId: userId,
//         },
//       };
//       const { getMyChallengeList } = cache.readQuery<any>(definition);
//       const data = {
//         challenge: getMyChallengeList.challenge.map((day) =>
//           day.date === mutated?.challenge?.date ? mutated?.challenge : day,
//         ),
//         challengeInfo: mutated?.challengeInfo,
//       };
//       cache.writeQuery({
//         ...definition,
//         data: { getMyChallengeList: data },
//       });
//     },
//   });
//   return [addPost, addState];
// };

// const useEditChallenge = (userId) => {
//   const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
//     update(cache, { data: { editAChallengePost } }) {
//       update30DaysChallenge(userId, cache, editAChallengePost);
//     },
//   });
//   return [editPost, editState];
// };

// export { useAddChallenge, useEditChallenge };

const a = [];
export default a;
