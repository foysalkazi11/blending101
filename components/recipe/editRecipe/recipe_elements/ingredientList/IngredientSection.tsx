import React, { useState } from "react";
import styles from "./ingredientList&Howto.module.scss";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import {
  setRecipeIngredients,
  setSelectedIngredientsList,
} from "../../../../../redux/edit_recipe/editRecipeStates";
import useGetDefaultPortionOfnutration from "../../../../../customHooks/useGetDefaultPortionOfNutration";
import { IngredientAddingType } from "../../../../../type/recipeEditType";
import IngredientTopPortion from "./IngredientTopPortion";
import IngredientPanel from "../../../../../component/templates/Ingredient/Ingredient.component";
import AddIngredientByParsing from "./AddIngredientByParsing";

type IngredientListPorps = {
  allIngredients?: any[];
  adjusterFunc: any;
  nutritionState: object;
  setNutritionState: any;
  calculatedIngOz?: number;
  ingredientAddingType?: IngredientAddingType;
};

const IngredientSection = ({
  allIngredients,
  adjusterFunc,
  nutritionState,
  setNutritionState,
  calculatedIngOz = 0,
  ingredientAddingType = "parsing",
}: IngredientListPorps) => {
  const dispatch = useAppDispatch();

  const [suggestedIngredients, setSuggestedIngredients] = useState([]);
  const [ingredientId, setIngredientId] = useState("");
  useGetDefaultPortionOfnutration(ingredientId);

  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );

  const removeIngredient = (id) => {
    let updated_list = selectedIngredientsList?.filter((elem) => {
      return id !== elem?._id;
    });
    dispatch(setSelectedIngredientsList(updated_list));
  };

  const recipeIngredientsOnKeyDown = (e) => {
    let modifiedArray = [];

    if (e.key === "Enter") {
      if (selectedIngredientsList.length === 0) {
        modifiedArray = [...suggestedIngredients];
      } else {
        modifiedArray = Array.from(
          new Set([...selectedIngredientsList, ...suggestedIngredients]),
        );
      }
      dispatch(setSelectedIngredientsList(modifiedArray));
      setSuggestedIngredients([]);
    }
  };

  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter,
  );

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "ingredients") {
      const items = [...selectedIngredientsList];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      dispatch(setSelectedIngredientsList(items));
    }
  };

  return (
    <div className={styles.ingredients__main__card}>
      <IngredientTopPortion
        adjusterFunc={adjusterFunc}
        calculatedIngOz={calculatedIngOz}
      />
      <div className={styles.ingredients__wrapper}>
        {ingredientAddingType === "auto" ? (
          <IngredientPanel
            ingredients={selectedIngredientsList}
            hasComment
            onDelete={removeIngredient}
            onSave={({ ingredient, portion, quantity }) => {
              const weightInGram = quantity * +portion?.meausermentWeight;
              const item = {
                ...ingredient,
                ingredientId: ingredient,
                portion: ingredient.portions,
                weightInGram,
                selectedPortion: {
                  gram: weightInGram,
                  name: portion?.measurement,
                  quantity: quantity,
                },
                ingredientStatus: "ok",
              };

              dispatch(setRecipeIngredients(item));
            }}
          />
        ) : (
          <AddIngredientByParsing
            handleOnDragEnd={handleOnDragEnd}
            allIngredients={allIngredients}
            ingredients={selectedIngredientsList}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            setIngredientId={setIngredientId}
            removeIngredient={removeIngredient}
          />
        )}
      </div>
    </div>
  );
};

export default IngredientSection;
