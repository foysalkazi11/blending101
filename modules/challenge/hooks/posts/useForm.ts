import { useRef, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAppSelector } from "redux/hooks";

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
    // if (isEditMode && !initValueSet.current) {
    methods.reset({
      recipeTitle: title,
      category,
      assignDate: startDate,
      note: notes,
    });
    setImages(postImages);
    initValueSet.current = true;
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, category, startDate, notes]);

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return { methods, onReset };
};

export default useChallengeForm;
