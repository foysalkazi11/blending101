import { useQuery } from "@apollo/client";
import React from "react";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import FilterbottomComponent from "../../../sidetray/filter/ingredients/Ingredients.component";
import PanelHeader from "../panelHeader/PanelHeader";
import styles from "./IngredientPanel.module.scss";
import StickyBox from "react-sticky-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBasketShopping, faBucket } from "@fortawesome/pro-light-svg-icons";

interface IngredientPanelPorps {
  handleIngredientClick?: (ingredient: any, present: boolean) => void;
  checkActive?: (id: string) => boolean;
  showHeader?: boolean;
  showTopHeader?: boolean;
  scrollAreaMaxHeight?: number;
}

const IngredientPanel = ({
  checkActive = () => false,
  handleIngredientClick = () => {},
  showHeader = false,
  showTopHeader = true,
  scrollAreaMaxHeight,
}: IngredientPanelPorps) => {
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } = useQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
    {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    },
  );
  //"/icons/basket.svg"
  return (
    <StickyBox offsetBottom={20}>
      {showTopHeader && (
        <PanelHeader icon={<FontAwesomeIcon icon={faBasketShopping} size="xl" />} title="Ingredients" />
      )}

      <div className={styles.ingrdeintpanelContainer}>
        <FilterbottomComponent
          checkActiveIngredient={checkActive}
          handleIngredientClick={handleIngredientClick}
          ingredientCategoryData={ingredientCategoryData?.filterIngredientByCategoryAndClass}
          ingredientCategoryLoading={ingredientCategoryLoading}
          showHeader={showHeader}
          scrollAreaMaxHeight={scrollAreaMaxHeight}
        />
      </div>
    </StickyBox>
  );
};

export default IngredientPanel;
