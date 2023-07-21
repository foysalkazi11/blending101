import React from "react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setShowPanel } from "../../../../redux/slices/Ui.slice";
import IconButton from "../../../atoms/Button/IconButton.component";

import classes from "./IngredientPanel.module.scss";
import { faBlender } from "@fortawesome/pro-regular-svg-icons";

const IngredientDrawer = () => {
  const dispatch = useAppDispatch();
  const panelList = useAppSelector((state) => state.ui.panel);
  const panel = panelList.find((panel) => panel.name === "Ingredient");
  console.log(panel?.payload);
  return (
    <div
      className={`${classes["side-panel"]} ${
        panel?.show ? classes.active : ""
      }`}
    >
      <IconButton
        fontName={faBlender}
        variant="fade"
        className={classes["side-panel__close"]}
        onClick={() => dispatch(setShowPanel({ name: "RXPanel", show: false }))}
      />
      <div className={classes["side-panel__content"]}>
        <div className={classes.ingredient}>
          <h3 className={classes.ingredient__title}>Ingredients</h3>
          {panel?.payload.map((ingredient) => (
            <div
              className={classes.ingredient__content}
              key={ingredient.ingredientId._id}
            >
              <div className={classes.ingredient__item}>
                <div>
                  {ingredient?.ingredientId?.featuredImage ? (
                    <img
                      src={ingredient?.ingredientId?.featuredImage}
                      alt={ingredient.ingredientId.ingredientName}
                    />
                  ) : (
                    <span />
                  )}
                </div>
                <span>
                  {ingredient?.selectedPortion?.quantity || 1}{" "}
                  {ingredient?.selectedPortion?.name}
                </span>
                <span>{ingredient.ingredientId.ingredientName}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IngredientDrawer;
