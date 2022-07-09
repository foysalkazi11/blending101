import { useQuery } from "@apollo/client";
import { faPlus } from "@fortawesome/pro-solid-svg-icons";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { IoIosClose } from "react-icons/io";
import { GET_INGREDIENTS } from "../../../../graphql/Ingredients";
import { GET_BLEND_CATEGORY } from "../../../../graphql/Recipe";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { addIngredient } from "../../../../redux/slices/Planner.slice";
// import AddIngredient from "./addIngredient/addIngredient.component";
import ImageCardComponent from "../../../../theme/card/imageCard/imageCard.component";
import TitledImageCard from "../../../../theme/card/imageCard/titledImageCard/titledImageCard.component";
import DropDownElem from "../../../../theme/dropDownElem/dropDownElem.component";
import IconButton from "../../../atoms/Button/IconButton.component";
import Combobox from "../../../organisms/Forms/Combobox.component";
import NumberField from "../../../organisms/Forms/NumberField.component";
import Textarea from "../../../organisms/Forms/Textarea.component";
import Textfield from "../../../organisms/Forms/Textfield.component";
import Upload from "../../../organisms/Upload/Upload.component";
import styles from "./UploadCard.module.scss";

interface UploadCardInterface {
  setUploadState?: any;
}

const UploadCard = ({ setUploadState }: UploadCardInterface) => {
  const { data } = useQuery(GET_BLEND_CATEGORY);
  const { name, image } = useAppSelector((state) => state.planner.post.recipe);
  const [images, setImages] = useState([]);

  return (
    <div className={styles.mainContainer}>
      <IoIosClose
        className={styles.mainContainer__cancelDiv}
        onClick={() => {
          setUploadState(false);
        }}
      />
      <h5 className={styles.mainContainer__mainHeading}>
        Upload Challanges Post
      </h5>
      <div className="mt-20">
        <Upload multiple imageState={[images, setImages]} />
        {/* <ImageCardComponent /> */}
      </div>
      <div className="row mt-40">
        <div className="col-7">
          <Combobox options={data?.getAllCategories} />
        </div>
        <div className="col-5">
          <Textfield type="date" />
        </div>
      </div>
      <h5 className={styles.headingText}>My Recipe</h5>
      <div className="row">
        <div className="col-4">
          <div className={styles.notesTray__imageCard}>
            <div className={styles.recipe}>
              <Textfield
                placeholder="Recipe Title"
                value={name}
                className={styles.recipe__title}
              />
              <div className={styles.imageContainer}>
                <Image
                  src={image || "/images/5.jpeg"}
                  alt={""}
                  objectFit={"fill"}
                  layout={"fill"}
                />
              </div>
            </div>{" "}
          </div>
        </div>
        <div className="col-5">
          <AddIngredient />
        </div>
        <div className="col-3">
          <Servings />
        </div>
      </div>
      {/* <div className={styles.notesTray}>
        <div></div>
      </div> */}

      <h5 className={styles.headingText}>My Notes</h5>
      <Textarea name="notes" rows={2} placeholder="Write down your notes..." />
    </div>
  );
};

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

const SERVINGS = {
  size: 16,
  nutriScore: 234,
  calories: 120,
  carbs: 32,
  netCarbs: 12,
  glycemic: 23,
};

const Servings = () => {
  const [serving, setServing] = useState(1);
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

const AddIngredient = () => {
  // const [ingredients, setIngredinets] = useState(elemList);
  const dispatch = useAppDispatch();
  const ingredients = useAppSelector(
    (state) => state.planner.post.recipe.ingredients,
  );

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
