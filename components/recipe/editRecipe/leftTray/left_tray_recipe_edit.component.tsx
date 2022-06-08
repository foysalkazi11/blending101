/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import styles from "./left_tray_recipe_edit.module.scss";
import { setSelectedIngredientsList } from "../../../../redux/edit_recipe/editRecipeStates";
import FilterbottomComponent from "../../../sidetray/filter/filterBottom.component";
import { categories } from "../../../utility/staticData";
interface ingredientState {
  name: string;
  value: number;
  units: string;
  ingredientId: string;
}
interface recipeData {
  allIngredients?: any;
  recipeIngredients?: object[];
}
const Left_tray_recipe_edit = ({
  allIngredients,
  recipeIngredients,
}: recipeData) => {
  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList,
  );

  const handleIngredientClick = (ingredient: any, present: boolean) => {
    let blendz = [];
    if (!present) {
      blendz = [...selectedIngredientsList, ingredient];
    } else {
      blendz = selectedIngredientsList?.filter((blen) => {
        return blen?._id !== ingredient?._id;
      });
    }

    dispatch(setSelectedIngredientsList(blendz));
  };

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen?._id === id) {
        present = true;
      }
    });
    return present;
  };

  return (
    <div className={styles.left_main_container}>
      <div className={styles.filter}>
        <div className={styles.filter__top} style={{ marginTop: "15px" }}>
          <FilterbottomComponent
            categories={categories}
            checkActiveIngredient={checkActive}
            handleIngredientClick={handleIngredientClick}
            scrollAreaMaxHeight={{ maxHeight: "520px" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Left_tray_recipe_edit;
