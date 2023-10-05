import { useLazyQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { isWithinInterval } from "date-fns";
import { useRouter } from "next/router";
import { useEffect, useMemo } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setChallengeView, setChallengeInterval } from "redux/slices/Challenge.slice";
import { GET_30DAYS_CHALLENGE } from "../challenge.graphql";
import { Get30DaysChallenge } from "@/app/types/challenge.types";
import { UserRecipe } from "@/recipe/recipe.types";

const useChallenge = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { activeDate, startDate, endDate } = useAppSelector((state) => state.challenge);

  const { id: userId } = useUser();

  const [getChallenges, { data }] = useLazyQuery<Get30DaysChallenge>(GET_30DAYS_CHALLENGE);

  const challenge = data?.getMyThirtyDaysChallenge;

  useEffect(() => {
    if (
      userId === "" ||
      (![activeDate, startDate, endDate].includes("") &&
        isWithinInterval(new Date(activeDate), {
          start: new Date(startDate),
          end: new Date(endDate),
        }))
    )
      return;
    getChallenges({
      variables: {
        userId,
        startDate: activeDate,
        challengeId: router.query?.id,
        token: router.query?.token,
      },
    });
  }, [activeDate, endDate, getChallenges, router.query?.id, router.query?.token, startDate, userId]);

  useEffect(() => {
    const challenges = challenge?.challenge || [];
    if (challenges.length === 0) return;

    dispatch(setChallengeView(challenge?.challengeInfo?.viewOnly));
    dispatch(
      setChallengeInterval({
        startDate: challenges[0]?.date,
        endDate: challenges[challenges.length - 1]?.date,
      }),
    );
  }, [challenge, dispatch]);

  const recipes = useMemo(() => {
    const recipes: UserRecipe[] = [];
    challenge?.challenge.forEach((day) => {
      day?.posts.forEach((post) => {
        const image = post.images.length > 0 ? post.images[0] : { url: "", hash: "" };
        recipes.push({
          recipeId: {
            _id: post?._id,
            name: post?.name,
            recipeBlendCategory: post?.recipeBlendCategory,
            image: [{ image: image.url, default: true, ...image }],
          },
          defaultVersion: {
            ingredients: post?.ingredients,
          },
        });
      });
    });
    return recipes;
  }, [challenge]);

  return { challenge: challenge, recipes };
};

export default useChallenge;
