import React, { useState, useMemo, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { faPlus, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FormProvider, useForm } from "react-hook-form";

import { GET_INGREDIENTS } from "../../../../graphql/Ingredients";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import IconButton from "../../../atoms/Button/IconButton.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import NumberField from "../../../organisms/Forms/NumberField.component";
import Textarea from "../../../organisms/Forms/Textarea.component";
import Textfield from "../../../organisms/Forms/Textfield.component";
import Upload from "../../../organisms/Upload/Upload.component";
import styles from "./UploadCard.module.scss";
import {
  CREATE_CHALLENGE_POST,
  EDIT_CHALLENGE_POST,
  GET_30DAYS_CHALLENGE,
} from "../../../../graphql/Planner";
import Publish from "../../../../helpers/Publish";
import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import { ActionButton } from "../../../atoms/Button/Button.component";
import { format } from "date-fns";
import {
  addIngredient,
  deleteIngredient,
  setShowPostForm,
  resetForm,
} from "../../../../redux/slices/Challenge.slice";

const defaultValues = {
  category: "",
  assignDate: format(new Date(), "yyyy-MM-dd"),
  recipeTitle: "",
  note: "",
};

const UploadCard = () => {
  const [images, setImages] = useState([]);
  const [serving, setServing] = useState(1);

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const {
    isEditMode,
    id,
    docId,
    title,
    images: postImages,
    ingredients,
    category,
    startDate,
    notes,
  } = useAppSelector((state) => state.challenge.post);
  const { data } = useQuery(GET_BLEND_CATEGORY);
  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST, {
    refetchQueries: [{ query: GET_30DAYS_CHALLENGE, variables: { userId } }],
  });
  const [editPost, editState] = useMutation(EDIT_CHALLENGE_POST, {
    refetchQueries: [{ query: GET_30DAYS_CHALLENGE, variables: { userId } }],
  });

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

  const handleSubmit = async (data) => {
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
      onSuccess: () => {
        dispatch(setShowPostForm(false));
        methods.reset(defaultValues);
        dispatch(resetForm());
        setImages([]);
        setServing(1);
      },
    });
  };

  return (
    <div className={styles.mainContainer}>
      <FormProvider {...methods}>
        <div className="flex ai-center jc-between">
          <h5 className={styles.mainContainer__mainHeading}>
            Upload Challanges Post
          </h5>
          <div className="flex ai-center">
            <ActionButton onClick={methods.handleSubmit(handleSubmit)}>
              Post
            </ActionButton>
            <IconButton
              size="small"
              variant="secondary"
              fontName={faTimes}
              style={{ marginLeft: 5 }}
              onClick={() => {
                dispatch(setShowPostForm(false));
              }}
            />
          </div>
        </div>
        <div className="mt-20">
          <Upload multiple imageState={[images, setImages]} />
        </div>
        <div className="row mt-40">
          <div className="col-6">
            <Textfield
              placeholder="Recipe Title"
              name="recipeTitle"
              defaultValue={title}
              className={styles.recipe__title}
            />
          </div>
          <div className="col-3">
            <Combobox
              options={data?.getAllCategories}
              name="category"
              placeholder="Blend Category"
              required
            />
          </div>
          <div className="col-3">
            <Textfield type="date" name="assignDate" required />
          </div>
        </div>
        <h5 className={styles.headingText}>My Recipe</h5>
        <div className="row">
          {/* <div className="col-4">
            <div className={styles.notesTray__imageCard}>
              <div className={styles.recipe}>
                <div className={styles.imageContainer}>
                  {image ? (
                    <Image
                      src={image || "/images/5.jpeg"}
                      alt={""}
                      objectFit="cover"
                      layout={"fill"}
                    />
                  ) : (
                    <div style={{ height: "100%", width: "100%" }} />
                  )}
                </div>
              </div>
            </div>
          </div> */}
          <div className="col-6">
            <AddIngredient ingredients={ingredients} />
          </div>
          <div className="col-6">
            <Servings servingState={[serving, setServing]} />
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
          fontName={faChevronLeft}
          // onClick={hideSettings}
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

  const { data } = useQuery(GET_INGREDIENTS, {
    variables: { classType: "All" },
  });

  const ingredientList = data?.filterIngredientByCategoryAndClass || [];

  const addIngredintHandler = () => {
    const ingredientItem = ingredientList.find(
      (ing) => ing.value === ingredient,
    );
    if (!ingredientItem) return;
    dispatch(addIngredient({ ingredient: ingredientItem }));
    setIngredient("");
  };

  const deleteIngredientHandler = (id) => {
    dispatch(deleteIngredient({ id }));
  };

  return (
    <div className={styles.ingredient}>
      <div className="flex ai-center">
        <Combobox
          placeholder="Ingredients"
          options={ingredientList}
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
        />
        <IconButton
          size="small"
          variant="secondary"
          fontName={faPlus}
          style={{ marginLeft: 5 }}
          onClick={addIngredintHandler}
        />
      </div>
      <div className={styles.ingredient__card}>
        {ingredients.map((ingredient) => (
          <div
            className={styles.ingredient__content}
            key={ingredient.ingredientId._id}
          >
            <div>
              <span>
                {ingredient.selectedPortion.quantity}{" "}
                {ingredient.selectedPortion.name}
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
