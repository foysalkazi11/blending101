import React from "react";
import { IngredientAddingType } from "../../../../type/recipeEditType";
import IngredientPanel from "../../../../component/templates/Ingredient/Ingredient.component";
import AddIngredientByParsing from "../../editRecipe/recipe_elements/ingredientList/AddIngredientByParsing";
import styles from "./IngredientSection.module.scss";
import IngredientTopPortion from "./IngredientTopPortion";
type IngredientListPorps = {
  adjusterFunc: any;
  nutritionState: object;
  setNutritionState: any;
  calculatedIngOz?: number;
  ingredientAddingType?: IngredientAddingType;
  selectedIngredientsList?: { [key: string]: any }[];
  removeIngredient?: (id: string) => void;
  setSelectedIngredientsList?: (obj: { [key: string]: any }) => void;
  handleOnDragEnd?: (result: { [key: string]: any }, type: string) => void;
};

const IngredientSection = ({
  adjusterFunc,
  nutritionState,
  setNutritionState,
  calculatedIngOz = 0,
  ingredientAddingType = "parsing",
  selectedIngredientsList = [],
  removeIngredient = () => {},
  setSelectedIngredientsList = () => {},
  handleOnDragEnd = () => {},
}: IngredientListPorps) => {
  return (
    <div className={styles.ingredients__main__card}>
      <IngredientTopPortion
        adjusterFunc={adjusterFunc}
        calculatedIngOz={calculatedIngOz}
      />
      <div className={styles.ingredientsWrapper}>
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
              setSelectedIngredientsList(item);
            }}
          />
        ) : (
          <AddIngredientByParsing
            handleOnDragEnd={handleOnDragEnd}
            ingredients={selectedIngredientsList}
            nutritionState={nutritionState}
            setNutritionState={setNutritionState}
            removeIngredient={removeIngredient}
          />
        )}
      </div>
    </div>
  );
};

export default IngredientSection;
