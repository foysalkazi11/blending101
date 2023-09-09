import React, { forwardRef, useState, useMemo, useImperativeHandle, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FormProvider } from "react-hook-form";
import DatePicker from "react-datepicker";

import { GET_CATEGORY_FOR_COMBOBOX } from "../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import Upload from "../../organisms/Upload/Upload.component";
import styles from "./Upload.module.scss";
import Publish from "../../../helpers/Publish";
import { setShowPostForm, resetForm, deleteIngredient, addIngredient } from "../../../redux/slices/Challenge.slice";
import { setShowPanel } from "../../../redux/slices/Ui.slice";
import useImage from "../../../hooks/useImage";
import {
  useAddChallengePost,
  useChallengeForm,
  useEditChallengePost,
} from "../../../hooks/modules/Challenge/useChallengePost";
import Icon from "../../atoms/Icon/Icon.component";
import { faBasketShopping, faNotebook } from "@fortawesome/pro-regular-svg-icons";
import Summary from "./Daily/Summary.component";
import IngredientPanel from "../../templates/Ingredient/Ingredient.component";
import DayPicker from "../../molecules/Date/Day.component";
import { useUser } from "../../../context/AuthProvider";

const UploadCard = forwardRef((props: any, ref) => {
  const { startDate, endDate, elementRef } = props;
  const { images, setImages, postImages: uploadImages } = useImage([]);
  const [serving, setServing] = useState(1);

  const dispatch = useAppDispatch();
  const userId = useUser().id;

  const {
    isEditMode,
    id,
    docId,
    title,
    ingredients,
    startDate: postDate,
    images: stateImages,
  } = useAppSelector((state) => state.challenge.post);

  const { data } = useQuery(GET_CATEGORY_FOR_COMBOBOX);
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

  const deleteIngredientHandler = (id) => {
    dispatch(deleteIngredient({ id }));
  };

  const showNutrientInfo = (ingredient) => {
    dispatch(
      setShowPanel({
        name: "RXPanel",
        show: true,
        payload: [
          {
            ingredientId: ingredient.ingredientId._id,
            value: ingredient?.selectedPortion?.gram,
          },
        ],
      }),
    );
  };

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
            <DayPicker activeDate={postDate} startDate={startDate} endDate={endDate} />
          </div>
          <div className="col-6">
            <Combobox options={data?.getAllCategories} name="category" placeholder="Blend Category" required />
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
        <div className="row mt-30">
          <div className="col-12">
            <h5 className={styles.headingText}>
              <Icon size="2.5rem" fontName={faBasketShopping} /> Ingredients
            </h5>
            <div className={styles.ingredient__summary}>
              <div>
                Volume: <span>16 oz</span>
              </div>
              <div>
                Consumed: <span>All</span>
              </div>
            </div>
          </div>
          <IngredientPanel
            ingredients={ingredients}
            onDelete={deleteIngredientHandler}
            onNutrition={showNutrientInfo}
            onSave={(props) => dispatch(addIngredient(props))}
          />
        </div>
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
