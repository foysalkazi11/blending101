import {
  ApolloCache,
  useLazyQuery,
  useMutation,
  useQuery,
} from "@apollo/client";
import { format, isWithinInterval } from "date-fns";
import { useMemo, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";

import {
  GET_30DAYS_CHALLENGE,
  CREATE_CHALLENGE_POST,
  EDIT_CHALLENGE_POST,
  GET_CHALLENGES,
} from "../../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useRouter } from "next/router";
import {
  setChallengeView,
  setChallengeInterval,
} from "../../../redux/slices/Challenge.slice";

const useThirtyDayChallenge = () => {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const {
    activeDate,
    startDate,
    endDate,
    showPostForm: showUpload,
  } = useAppSelector((state) => state.challenge);

  const [getChallenges, { data }] = useLazyQuery(GET_30DAYS_CHALLENGE);

  const viewOnly = data?.getMyThirtyDaysChallenge?.challengeInfo?.viewOnly;

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
  }, [
    activeDate,
    endDate,
    getChallenges,
    router.query?.id,
    router.query?.token,
    startDate,
    userId,
  ]);

  useEffect(() => {
    const challenges = data?.getMyThirtyDaysChallenge?.challenge || [];
    if (challenges.length === 0) return;

    dispatch(setChallengeView(viewOnly));
    dispatch(
      setChallengeInterval({
        startDate: challenges[0]?.date,
        endDate: challenges[challenges.length - 1]?.date,
      }),
    );
  }, [data, dispatch, viewOnly]);

  return { challenge: data?.getMyThirtyDaysChallenge || [], viewOnly };
};

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
          day.date === createChallengePost?.challenge?.date
            ? createChallengePost?.challenge
            : day,
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

const useEditChallengePost = (userId) => {
  const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
    update(cache, { data: { editAChallengePost: editedPost } }) {
      const editedDate = editedPost?.challenge?.date;
      const { prevPostDate, postId } = editedPost?.prevPost;
      console.log({ editedDate, prevPostDate, postId });
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

const defaultValues = {
  category: "",
  assignDate: "",
  recipeTitle: "",
  note: "",
};
const useChallengeForm = (setImages) => {
  const initValueSet = useRef(false);
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });
  const {
    isEditMode,
    title,
    images: postImages,
    category,
    startDate,
    notes,
  } = useAppSelector((state) => state.challenge.post);

  useEffect(() => {
    if (isEditMode && !initValueSet.current) {
      methods.reset({
        recipeTitle: title,
        category,
        assignDate: startDate,
        note: notes,
      });
      setImages(postImages);
      initValueSet.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, startDate, notes]);

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return { methods, onReset };
};

export {
  useThirtyDayChallenge,
  useAddChallengePost,
  useEditChallengePost,
  useChallengeForm,
};
