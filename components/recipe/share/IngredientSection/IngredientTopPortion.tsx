import React from "react";
import classes from "./IngredientSection.module.scss";
import Image from "next/image";
import AddSharpIcon from "../../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../../public/icons/remove_black_36dp.svg";

interface IngredientTopPortionProps {
  adjusterFunc?: (value: number) => void;
  calculatedIngOz?: number;
  servingSize?: number;
}

const IngredientTopPortion = ({
  adjusterFunc,
  calculatedIngOz,
  servingSize = 1,
}: IngredientTopPortionProps) => {
  return (
    <>
      <div className={classes.headingDiv}>
        <div className={classes.basket__icon}>
          <Image src={"/icons/basket.svg"} alt="icon" width={17} height={15} />
        </div>
        <h5>Ingredient List</h5>
      </div>
      <div className={classes.blending__ingredients}>
        <div className={classes.servings}>
          <div className={classes.servings__adjuster}>
            <span className={classes.servings__adjuster__name}>Servings :</span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingSize - 1);
              }}
            >
              <RemoveSharpIcon />
            </div>
            <span className={classes.servings__adjuster__score}>
              {servingSize}
            </span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingSize + 1);
              }}
            >
              <AddSharpIcon />
            </div>
          </div>
          <div className={classes.servings__size}>
            <span className={classes.servings__adjuster__name}>Volume :</span>
            <span className={classes.servings__size__score}>
              {calculatedIngOz}&nbsp;oz
            </span>
          </div>
          <div className={classes.servings__units}>
            <div>
              <span className={classes.servings__units__country}>Us</span>
              <span className={classes.servings__units__scale}>Metric</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IngredientTopPortion;
