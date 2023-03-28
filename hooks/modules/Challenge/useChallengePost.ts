import { ApolloCache, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  GET_30DAYS_CHALLENGE,
  CREATE_CHALLENGE_POST,
  EDIT_CHALLENGE_POST,
} from "../../../graphql/Challenge";
import { useAppSelector } from "../../../redux/hooks";

const update30DaysChallenge = (
  userId: string,
  cache: ApolloCache<any>,
  mutated,
) => {
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
      day.date === mutated?.challenge?.date ? mutated?.challenge : day,
    ),
    challengeInfo: mutated?.challengeInfo,
  };
  cache.writeQuery({
    ...definition,
    data: { getMyThirtyDaysChallenge: data },
  });
};

const useAddChallengePost = (userId) => {
  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST, {
    update(cache, { data: { createChallengePost } }) {
      update30DaysChallenge(userId, cache, createChallengePost);
    },
  });
  return [addPost, addState];
};

const useEditChallengePost = (userId) => {
  const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
    update(cache, { data: { editAChallengePost } }) {
      update30DaysChallenge(userId, cache, editAChallengePost);
      //! If date of the post is edited we need to remove the post from the previous date
    },
  });
  return [editPost, editState];
};

const defaultValues = {
  category: "",
  assignDate: format(new Date(), "yyyy-MM-dd"),
  recipeTitle: "",
  note: "",
};
const useChallengeForm = (setImages) => {
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });
  const {
    title,
    images: postImages,
    category,
    startDate,
    notes,
  } = useAppSelector((state) => state.challenge.post);

  useEffect(() => {
    methods.reset({
      recipeTitle: title,
      category,
      assignDate: startDate,
      note: notes,
    });

    setImages(postImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, startDate, notes]);

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return { methods, onReset };
};

export { useAddChallengePost, useEditChallengePost, useChallengeForm };
