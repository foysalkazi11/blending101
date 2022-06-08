import React from "react";
import FilterbottomComponent from "../../../sidetray/filter/filterBottom.component";
import { categories } from "../../../utility/staticData";
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
  return (
    <div className={styles.ingrdeintpanelWraper}>
      <PanelHeader icon="/icons/basket.svg" title="Ingredient List" />
      <div className={styles.ingrdeintpanelContainer}>
        <FilterbottomComponent
          categories={categories}
          checkActiveIngredient={checkActive}
          handleIngredientClick={handleIngredientClick}
          scrollAreaMaxHeight={{ maxHeight: "520px" }}
        />
      </div>
    </div>
  );
};

export default IngredientPanel;
