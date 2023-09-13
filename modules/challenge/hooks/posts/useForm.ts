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
    name,
    images: postImages,
    category,
    startDate,
    note,
  } = useAppSelector((state) => state.challenge.post);

  useEffect(() => {
    // if (isEditMode && !initValueSet.current) {
    methods.reset({
      recipeTitle: name,
      category,
      assignDate: startDate,
      note: note,
    });
    setImages(postImages);
    initValueSet.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, category, startDate, note]);

  const onReset = () => {
    methods.reset(defaultValues);
  };

  return { methods, onReset };
};

export default useChallengeForm;
