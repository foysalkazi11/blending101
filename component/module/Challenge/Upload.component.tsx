import React, { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { faTimes, faChartSimple } from "@fortawesome/pro-solid-svg-icons";
import { FormProvider } from "react-hook-form";

import { GET_INGREDIENTS } from "../../../graphql/Ingredients";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import IconButton from "../../atoms/Button/IconButton.component";
import Combobox from "../../organisms/Forms/Combobox.component";
import NumberField from "../../organisms/Forms/NumberField.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import Upload from "../../organisms/Upload/Upload.component";
import styles from "./Upload.module.scss";
import Publish from "../../../helpers/Publish";
import { ActionButton } from "../../atoms/Button/Button.component";
import {
  addIngredient,
  deleteIngredient,
  setShowPostForm,
  resetForm,
} from "../../../redux/slices/Challenge.slice";
import { setShowPanel } from "../../../redux/slices/Ui.slice";
import useImage from "../../../hooks/useImage";
import {
  useAddChallengePost,
  useChallengeForm,
  useEditChallengePost,
} from "../../../hooks/modules/Challenge/useChallengePost";

const UploadCard = () => {
  const { images, setImages, postImages: uploadImages } = useImage([]);
  const [serving, setServing] = useState(1);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const panelList = useAppSelector((state) => state.ui.panel);
  const panel = panelList.find((panel) => panel.name === "RXPanel");
  const { isEditMode, id, docId, title, ingredients } = useAppSelector(
    (state) => state.challenge.post,
  );

  const { data } = useQuery(GET_BLEND_CATEGORY);
  const { methods, onReset } = useChallengeForm(setImages);
  const [addPost, addState] = useAddChallengePost(userId);
  const [editPost, editState] = useEditChallengePost(userId);

  const closeForm = () => {
    dispatch(setShowPostForm(false));
    onReset();
    dispatch(resetForm());
    setImages([]);
    setServing(1);
    dispatch(setShowPanel({ name: "RXPanel", show: false }));
  };

  const handleSubmit = async (data) => {
    const images = await uploadImages();
    const post: any = {
      memberId: userId,
      assignDate: data.assignDate,
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
    console.log(isEditMode);
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
      success: "Submitted Post Successfully",
      onSuccess: closeForm,
    });
  };

  const showNutrientInfo = () => {
    if (panel && panel?.show) {
      dispatch(setShowPanel({ name: "RXPanel", show: false }));
    } else {
      dispatch(
        setShowPanel({
          name: "RXPanel",
          show: true,
          payload: ingredients.map((ing) => ({
            ingredientId: ing?.ingredientId?._id,
            value: ing?.selectedPortion?.gram,
          })),
        }),
      );
    }
  };

  return (
    <div className={styles.mainContainer}>
      <FormProvider {...methods}>
        <div className="row mt-20">
          <div className="col-4">
            <Textfield type="date" name="assignDate" required />
          </div>
          <div className="col-8">
            <Textfield
              placeholder="Description"
              name="recipeTitle"
              defaultValue={title}
              className={styles.recipe__title}
            />
          </div>
        </div>
        <div className="mt-20">
          <Upload multiple imageState={[images, setImages]} />
        </div>
        <div className="row mt-40">
          <div className="col-3">
            <Combobox
              options={data?.getAllCategories}
              name="category"
              placeholder="Blend Category"
              required
            />
          </div>
          <div className="col-3"></div>
        </div>
        <h5 className={styles.headingText}>My Recipe</h5>
        <div className="row">
          <div className="col-6">
            <AddIngredient ingredients={ingredients} />
          </div>
          <div className="col-6">
            <Servings
              servingState={[serving, setServing]}
              showNutrientInfo={showNutrientInfo}
            />
          </div>
        </div>
        <h5 className={styles.headingText}>My Notes</h5>
        <Textarea name="note" placeholder="Write down your notes..." />
      </FormProvider>
    </div>
  );
};

const SERVINGS = {
  size: 16,
  nutriScore: 234,
  calories: 120,
  carbs: 32,
  netCarbs: 12,
  glycemic: 23,
};

const Servings = (props) => {
  const [serving, setServing] = props.servingState;
  const servingHandler = (e) => {
    setServing(e.target.value);
  };
  return (
    <div className={styles.notesTray__servings}>
      <div className="flex jc-between" style={{ width: "100%" }}>
        <div className="flex ai-center" style={{ marginBottom: 4 }}>
          <NumberField
            minValue={1}
            value={serving}
            onChange={servingHandler}
            className={styles.notesTray__input}
          />
          <div className="ml-20">
            <h3 className="mr-10">Servings</h3>
            <h5>{SERVINGS.size * serving} oz serving size</h5>
          </div>
        </div>
        <IconButton
          size="medium"
          variant="white"
          className="mr-20"
          fontName={faChartSimple}
          onClick={props.showNutrientInfo}
        />
      </div>
      <div className={styles.notesTray__servings__scoreCard}>
        <TextScoreDiv
          text="Nutri-Score"
          score={SERVINGS.nutriScore * serving}
        />
        <TextScoreDiv text="Calories" score={SERVINGS.calories * serving} />
        <TextScoreDiv text="Carbs" score={SERVINGS.carbs * serving} />
        <TextScoreDiv text="Net Carbs" score={SERVINGS.netCarbs * serving} />
        <TextScoreDiv
          text="Glycemic Load"
          score={SERVINGS.glycemic * serving}
        />
      </div>
    </div>
  );
};

const AddIngredient = ({ ingredients }) => {
  const dispatch = useAppDispatch();
  const [ingredient, setIngredient] = useState("");
  const [showSuggestion, setShowSuggestion] = useState(false);

  const { data } = useQuery(GET_INGREDIENTS, {
    variables: { classType: "All" },
  });

  const addIngredintHandler = (id: string) => {
    const ingredientItem = ingredientList.find((ing) => ing.value === id);
    if (!ingredientItem) return;
    dispatch(addIngredient({ ingredient: ingredientItem }));
    setIngredient("");
    setShowSuggestion(false);
  };

  const deleteIngredientHandler = (id) => {
    dispatch(deleteIngredient({ id }));
  };

  const ingredientList = useMemo(() => {
    let results = [];
    results = data?.filterIngredientByCategoryAndClass.filter((ing) => {
      const isAlreadySelected = ingredients.some(
        (item) => item?.ingredientId._id === ing?.value,
      );
      if (ingredient) {
        return (
          !isAlreadySelected &&
          ing?.label.toLowerCase().startsWith(ingredient.toLowerCase())
        );
      } else return !isAlreadySelected;
    });
    return results;
  }, [data?.filterIngredientByCategoryAndClass, ingredient, ingredients]);

  return (
    <div className={styles.ingredient}>
      <div className={styles.ingredient__field}>
        <Textfield
          placeholder="Type your ingredients..."
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          onFocus={() => {
            setShowSuggestion(true);
          }}
          // onBlur={(e) => {
          //   console.log(e.target);
          //   setShowSuggestion(false);
          // }}
        />
        {showSuggestion && (
          <ul>
            {ingredientList.map((ing) => (
              <li
                key={ing.value}
                onClick={() => addIngredintHandler(ing.value)}
              >
                {ing.label}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={styles.ingredient__card}>
        {ingredients.map((ingredient) => (
          <div
            className={styles.ingredient__content}
            key={ingredient.ingredientId._id}
          >
            <div>
              <span>
                {ingredient?.selectedPortion?.quantity}{" "}
                {ingredient?.selectedPortion?.name}
              </span>
              <span>{ingredient.ingredientId.ingredientName}</span>
            </div>
            <IconButton
              size="small"
              variant="primary"
              fontName={faTimes}
              className={styles.ingredient__button}
              onClick={() =>
                deleteIngredientHandler(ingredient.ingredientId._id)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadCard;

interface textScoreInterface {
  text?: string;
  score?: any;
}

const TextScoreDiv = ({ text, score }: textScoreInterface) => {
  return (
    <div className={styles.textScoreDiv}>
      <span className={styles.textScoreDiv__text}>{text}</span>
      <span className={styles.textScoreDiv__score}>{score}</span>
    </div>
  );
};
