import React from "react";
import { IngredientAddingType } from "../../../../type/recipeEditType";
import IngredientPanel from "../../../../component/templates/Ingredient/Ingredient.component";
import AddIngredientByParsing from "../../editRecipe/recipe_elements/ingredientList/AddIngredientByParsing";
import styles from "./IngredientSection.module.scss";
import IngredientTopPortion from "./IngredientTopPortion";
import { mixedNumberToDecimal } from "helpers/Number";
type IngredientListPorps = {
  adjusterFunc: any;
  nutritionState: object;
  setNutritionState: any;
  calculatedIngOz?: number;
  ingredientAddingType?: IngredientAddingType;
  selectedIngredientsList?: { [key: string]: any }[];
  removeIngredient?: (id: string) => void;
  removeErrorIngredient?: (id: string) => void;
  setSelectedIngredientsList?: (obj: { [key: string]: any }) => void;
  handleOnDragEnd?: (result: { [key: string]: any }, type: string) => void;
  servingSize?: number;
};

const IngredientSection = ({
  adjusterFunc,
  nutritionState,
  setNutritionState,
  calculatedIngOz = 0,
  ingredientAddingType = "parsing",
  selectedIngredientsList = [],
  removeIngredient = () => {},
  removeErrorIngredient = () => {},
  setSelectedIngredientsList = () => {},
  handleOnDragEnd = () => {},
  servingSize = 1,
}: IngredientListPorps) => {
  return (
    <div className={styles.ingredients__main__card}>
      <IngredientTopPortion adjusterFunc={adjusterFunc} calculatedIngOz={calculatedIngOz} servingSize={servingSize} />
      <div className={styles.ingredientsWrapper}>
        {ingredientAddingType === "auto" ? (
          <IngredientPanel
            ingredients={selectedIngredientsList}
            hasComment
            onDelete={removeIngredient}
            onDeleteErrorIngredient={removeErrorIngredient}
            onNutrition={setNutritionState}
            singleIngredient={nutritionState}
            onSave={({ ingredient, portion, quantity }) => {
              const qty = mixedNumberToDecimal(quantity);
              const weightInGram = qty * +portion?.meausermentWeight;

              const item = {
                ...ingredient,
                ingredientId: ingredient,
                portion: ingredient.portions,
                weightInGram,
                selectedPortion: {
                  gram: weightInGram,
                  name: portion?.measurement,
                  quantity: qty,
                },
                ingredientStatus: "ok",
                originalIngredientName: ingredient?.ingredientName,
                quantityString: quantity,
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
