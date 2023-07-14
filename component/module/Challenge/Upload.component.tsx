import React, {
  forwardRef,
  useState,
  useMemo,
  useImperativeHandle,
  useEffect,
} from "react";
import { useQuery } from "@apollo/client";
import { FormProvider } from "react-hook-form";
import DatePicker from "react-datepicker";

import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import Upload from "../../organisms/Upload/Upload.component";
import styles from "./Upload.module.scss";
import Publish from "../../../helpers/Publish";
import {
  setShowPostForm,
  resetForm,
  setPostDate,
} from "../../../redux/slices/Challenge.slice";
import { setShowPanel } from "../../../redux/slices/Ui.slice";
import useImage from "../../../hooks/useImage";
import {
  useAddChallengePost,
  useChallengeForm,
  useEditChallengePost,
} from "../../../hooks/modules/Challenge/useChallengePost";
import Icon from "../../atoms/Icon/Icon.component";
import {
  faBasketShopping,
  faCalendar,
  faNotebook,
} from "@fortawesome/pro-regular-svg-icons";
import { addDays, format, isToday, isTomorrow, isYesterday } from "date-fns";
import { UTCDate } from "../../../helpers/Date";
import PostIngredient from "./Daily/Ingredients.component";
import Summary from "./Daily/Summary.component";

const UploadCard = forwardRef((props: any, ref) => {
  const { startDate, endDate, elementRef } = props;
  const { images, setImages, postImages: uploadImages } = useImage([]);
  const [serving, setServing] = useState(1);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const {
    isEditMode,
    id,
    docId,
    title,
    ingredients,
    startDate: postDate,
    images: stateImages,
  } = useAppSelector((state) => state.challenge.post);

  const { data } = useQuery(GET_BLEND_CATEGORY);
  const { methods, onReset } = useChallengeForm(setImages);
  const [addPost, addState] = useAddChallengePost(userId);
  const [editPost, editState] = useEditChallengePost(userId);

  useImperativeHandle(ref, () => ({
    onChallengePost() {
      methods.handleSubmit(handleSubmit)();
    },
  }));

  const closeForm = () => {
    dispatch(setShowPostForm(false));
    onReset();
    dispatch(resetForm());
    setImages([]);
    setServing(1);
    dispatch(setShowPanel({ name: "RXPanel", show: false }));
  };

  useEffect(() => {
    setImages(stateImages);
  }, [setImages, stateImages]);

  const handleSubmit = async (data) => {
    const images = await uploadImages();
    const post: any = {
      memberId: userId,
      assignDate: postDate,
      post: {
        images,
        name: data.recipeTitle,
        recipeBlendCategory: data.category,
        note: data.note,
        servings: serving,
        servingSize: 16,
        ingredients: ingredients.map((ing) => ({
          ingredientId: ing?.ingredientId?._id,
          selectedPortionName: ing?.selectedPortion?.name,
          weightInGram: ing?.selectedPortion?.gram,
        })),
      },
    };
    if (isEditMode) {
      post.post._id = id;
      post.post.docId = docId;
    }
    await Publish({
      mutate: isEditMode ? editPost : addPost,
      variables: {
        data: post,
      },
      state: isEditMode ? editState : addState,
      load: "Submitting post",
      success: "Submitted Post Successfully",
      onSuccess: closeForm,
      onError: () => {
        setImages([]);
      },
    });
  };

  return (
    <div className={styles.mainContainer} ref={elementRef}>
      <FormProvider {...methods}>
        <div className="row mt-20 mb-20">
          <div className="col-6">
            <DateSelector
              activeDate={postDate}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
          <div className="col-6">
            <Combobox
              options={data?.getAllCategories}
              name="category"
              placeholder="Blend Category"
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <Textfield
              placeholder="Description"
              name="recipeTitle"
              defaultValue={title}
              className={styles.recipe__title}
            />
          </div>
        </div>
        <div className="row mt-20 ai-center jc-between">
          <div className="col-8">
            <Upload multiple imageState={[images, setImages]} />
          </div>
        </div>
        <Summary ingredients={ingredients} />
        <PostIngredient
          ingredients={ingredients}
          categories={data?.getAllCategories}
        />
        <h5 className={styles.headingText}>
          <Icon size="2.5rem" fontName={faNotebook} /> Notes
        </h5>
        <Textarea name="note" placeholder="Write down your notes..." />
      </FormProvider>
    </div>
  );
});

UploadCard.displayName = "Challenge Post Form";

export default UploadCard;

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => {
  const label = useMemo(() => {
    const date = UTCDate(value, "/");
    if (isToday(date)) return "Today";
    else if (isYesterday(date)) return "Yesterday";
    else if (isTomorrow(date)) return "Tomorrow";
    else return format(date, "MMMM do, yyyy");
  }, [value]);

  return (
    <div className={styles.date} onClick={onClick}>
      <Textfield ref={ref} required value={label} disabled />
      <Icon fontName={faCalendar} size={"2rem"} className={styles.date__icon} />
    </div>
  );
});
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  activeDate: string;
  startDate: string;
  endDate: string;
}
const DateSelector = (props: DateSelectorProps) => {
  const dispatch = useAppDispatch();
  const { activeDate, startDate } = props;

  const dateHandler = (date) => {
    dispatch(setPostDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <DatePicker
      selected={activeDate ? UTCDate(activeDate) : new Date()}
      minDate={startDate ? UTCDate(startDate) : new Date()}
      maxDate={addDays(new Date(), 1)}
      onChange={dateHandler}
      fixedHeight
      customInput={<DatePickerButton />}
    />
  );
};
