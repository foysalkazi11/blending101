import { useQuery } from "@apollo/client";
import React from "react";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import FilterbottomComponent from "../../../sidetray/filter/ingredients/Ingredients.component";
import PanelHeader from "../panelHeader/PanelHeader";
import styles from "./IngredientPanel.module.scss";

interface IngredientPanelPorps {
  handleIngredientClick?: (ingredient: any, present: boolean) => void;
  checkActive?: (id: string) => boolean;
}

const IngredientPanel = ({
  checkActive = () => false,
  handleIngredientClick = () => {},
}: IngredientPanelPorps) => {
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  return (
    <div className={styles.ingrdeintpanelWraper}>
      <PanelHeader icon="/icons/basket.svg" title="Ingredient List" />
      <div className={styles.ingrdeintpanelContainer}>
        <FilterbottomComponent
          checkActiveIngredient={checkActive}
          handleIngredientClick={handleIngredientClick}
          scrollAreaMaxHeight={{ maxHeight: "520px" }}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
        />
      </div>
    </div>
  );
};

export default IngredientPanel;
