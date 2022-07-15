import React, { useState, useMemo } from "react";
import Image from "next/image";
import { useMutation, useQuery } from "@apollo/client";
import { faPlus, faSave, faTimes } from "@fortawesome/pro-solid-svg-icons";
import { FormProvider, useForm } from "react-hook-form";

import { GET_INGREDIENTS } from "../../../../graphql/Ingredients";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addIngredient } from "../../../../redux/slices/Planner.slice";
import IconButton from "../../../atoms/Button/IconButton.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import NumberField from "../../../organisms/Forms/NumberField.component";
import Textarea from "../../../organisms/Forms/Textarea.component";
import Textfield from "../../../organisms/Forms/Textfield.component";
import Upload from "../../../organisms/Upload/Upload.component";
import styles from "./UploadCard.module.scss";
import { CREATE_CHALLENGE_POST } from "../../../../graphql/Planner";
import Publish from "../../../../helpers/Publish";

interface UploadCardInterface {
  setUploadState?: any;
}

const defaultValues = {};

const UploadCard = ({ setUploadState }: UploadCardInterface) => {
  const { data } = useQuery(GET_BLEND_CATEGORY);
  const [images, setImages] = useState([]);
  const [serving, setServing] = useState(1);

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { _id, name, image, ingredients } = useAppSelector(
    (state) => state.planner.post.recipe,
  );

  const [addPost, addState] = useMutation(CREATE_CHALLENGE_POST);

  const handleSubmit = async (data) => {
    const date = new Date(data.assignDate).toISOString();
    const post = {
      memberId: userId,
      assignDate: date,
      post: {
        images,
        recipeId: _id,
        name: data.recipeTitle,
        recipeImage: image,
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
    await Publish({
      mutate: addPost,
      variables: {
        data: post,
      },
      state: addState,
      success: "Added Post Successfully",
    });
  };

  return (
    <div className={styles.mainContainer}>
      <FormProvider {...methods}>
        <div className="flex ai-center jc-between">
          <h5 className={styles.mainContainer__mainHeading}>
            Upload Challanges Post
          </h5>
          <div className="flex">
            <IconButton
              size="small"
              variant="secondary"
              fontName={faSave}
              className="mr-10"
              onClick={methods.handleSubmit(handleSubmit)}
            />
            <IconButton
              size="small"
              variant="primary"
              fontName={faTimes}
              onClick={() => {
                setUploadState(false);
              }}
            />
          </div>
        </div>
        <div className="mt-20">
          <Upload multiple imageState={[images, setImages]} />
        </div>
        <div className="row mt-40">
          <div className="col-7">
            <Combobox options={data?.getAllCategories} name="category" />
          </div>
          <div className="col-5">
            <Textfield type="date" name="assignDate" />
          </div>
        </div>
        <h5 className={styles.headingText}>My Recipe</h5>
        <div className="row">
          <div className="col-4">
            <div className={styles.notesTray__imageCard}>
              <div className={styles.recipe}>
                <Textfield
                  placeholder="Recipe Title"
                  name="recipeTitle"
                  value={name}
                  className={styles.recipe__title}
                />
                <div className={styles.imageContainer}>
                  {image ? (
                    <div style={{ height: "100%", width: "100%" }} />
                  ) : (
                    <Image
                      src={image || "/images/5.jpeg"}
                      alt={""}
                      objectFit="cover"
                      layout={"fill"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-5">
            <AddIngredient ingredients={ingredients} />
          </div>
          <div className="col-3">
            <Servings servingState={[serving, setServing]} />
          </div>
        </div>
        <h5 className={styles.headingText}>My Notes</h5>
        <Textarea name="note" rows={2} placeholder="Write down your notes..." />
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
      <div className="flex ai-center" style={{ marginBottom: 4 }}>
        <h3 className="mr-10">Servings</h3>
        <NumberField
          minValue={1}
          value={serving}
          onChange={servingHandler}
          className={styles.notesTray__input}
        />
      </div>
      <h5>{SERVINGS.size * serving} oz serving size</h5>
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
  // const [ingredients, setIngredinets] = useState(elemList);
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
    const qty = Math.floor(Math.random() * 10);
    const portion =
      ingredientItem?.portions.find((portion) => portion.default)
        ?.measurement || ingredientItem?.portions[0].measurement;
    const unit =
      portion?.measurement || ingredientItem?.portions[0].measurement;
    const weight =
      portion?.meausermentWeight ||
      ingredientItem?.portions[0].meausermentWeight;
    setIngredient("");

    dispatch(
      addIngredient({
        ingredientId: {
          _id: ingredientItem.value,
          ingredientName: ingredientItem.label,
        },
        selectedPortion: {
          gram: qty * weight,
          name: unit,
          quantity: qty,
        },
      }),
    );

    // setIngredinets([
    //   ...ingredients,
    //   { ingredient: ingredientItem.label, qty, unit },
    // ]);
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
          <div key={ingredient.ingredientId._id} className={styles.ingredient}>
            <span>
              {ingredient.selectedPortion.quantity}{" "}
              {ingredient.selectedPortion.name}
            </span>
            <span>{ingredient.ingredientId.ingredientName}</span>
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
