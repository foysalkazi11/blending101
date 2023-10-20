import React, { forwardRef, useState, useImperativeHandle, useEffect, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { FormProvider } from "react-hook-form";
import { faBasketShopping, faNotebook } from "@fortawesome/pro-regular-svg-icons";

import Icon from "component/atoms/Icon/Icon.component";
import Summary from "@/challenge/partials/Post/Form/_summary.component";
import DayPicker from "component/molecules/Date/Day.component";
import Combobox from "component/organisms/Forms/Combobox.component";
import Textarea from "component/organisms/Forms/Textarea.component";
import Textfield from "component/organisms/Forms/Textfield.component";
import IngredientPanel from "component/templates/Ingredient/Ingredient.component";
import { useUser } from "context/AuthProvider";
import { GET_CATEGORY_FOR_COMBOBOX } from "@/app/graphql/Recipe";
import Publish from "helpers/Publish";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setShowPostForm, resetForm, deleteIngredient, addIngredient } from "redux/slices/Challenge.slice";
import { setShowPanel } from "redux/slices/Ui.slice";
import Upload from "component/organisms/Upload/Upload.component";

import useImage from "@/app/hooks/utils/useImage";

import useAddChallengePost from "@/challenge/hooks/posts/useAdd";
import useEditChallengePost from "@/challenge/hooks/posts/useEdit";
import useChallengeForm from "@/challenge/hooks/posts/useForm";

import styles from "./index.module.scss";

const VACCUM_VALUE = 0.033814;

const PostForm = forwardRef((props: any, ref) => {
  const { startDate, endDate, elementRef } = props;
  const { images, setImages, postImages: uploadImages } = useImage([]);

  const [serving, setServing] = useState(1);
  const [volume, setVolume] = useState(0);
  const [consumed, setConsumed] = useState(0);

  const dispatch = useAppDispatch();
  const { id: userId } = useUser();

  const {
    isEditMode,
    _id,
    docId,
    name,
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

  useMemo(() => {
    let volume = 0;
    ingredients.forEach((ingredient) => {
      volume += +ingredient.selectedPortion.quantity * +ingredient.selectedPortion.gram;
    });
    setVolume(Math.round(VACCUM_VALUE * volume));
  }, [ingredients]);

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
          originalIngredientName: ing?.ingredientId?.ingredientName,
          quantityString: `${ing?.selectedPortion?.quantity}`,
          selectedPortionName: ing?.selectedPortion?.name,
          weightInGram: ing?.selectedPortion?.gram,
        })),
      },
    };
    if (isEditMode) {
      post.post._id = _id;
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
    <div className={styles.mainContainer}>
      <FormProvider {...methods}>
        <div className={styles.wrapper}>
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
                defaultValue={name}
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
        </div>
        <div className={styles.wrapper}>
          <div className="row mt-30">
            <div className="col-12">
              <h5 className={styles.headingText}>
                <Icon size="2.5rem" fontName={faBasketShopping} /> Ingredients
              </h5>
              <div className={styles.ingredient__summary}>
                <div>
                  Volume: <span>{volume} oz</span>
                </div>
                <div className={styles.ingredient__consumed}>
                  Consumed:
                  <span>
                    <input
                      type="text"
                      value={consumed}
                      onChange={(e) => {
                        const value = +e.target.value;
                        if (!isNaN(value)) {
                          setConsumed(value);
                        }
                      }}
                    />
                    oz
                  </span>
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
        </div>
        <div className={styles.wrapper}>
          <h5 className={styles.headingText}>
            <Icon size="2.5rem" fontName={faNotebook} /> Notes
          </h5>
          <Textarea name="note" placeholder="Write down your notes..." />
        </div>
      </FormProvider>
    </div>
  );
});

PostForm.displayName = "Challenge Post Form";

export default PostForm;
