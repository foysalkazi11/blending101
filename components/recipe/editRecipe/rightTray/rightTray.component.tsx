/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import { useAppSelector, useAppDispatch } from "../../../../redux/hooks";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import {
  setIngredientArrayForNutrition,
  setServingCounter,
} from "../../../../redux/edit_recipe/editRecipeStates";
import { MdOutlineClose } from "react-icons/md";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";

interface PassingProps {
  name: string;
  percent: number;
}

const RightTray = ({
  nutritionTrayData,
  adjusterFunc,
  singleElement,
  setSingleElement,
  nutritionState,
  setNutritionState,
}) => {
  const servingCounter = useAppSelector(
    (state) => state?.editRecipeReducer?.servingCounter
  );
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList
  );
  const dispatch = useAppDispatch();

  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__headerDiv}>
          <div className={styles.right__title}>Nutrition</div>
          {!singleElement && (
            <div className={styles.right__counterTray}>
              <div className={styles.right__counterTray__counter}>
                <input
                  className={styles.right__counterTray__counter__input}
                  type="number"
                  value={servingCounter}
                  onChange={(e) => {
                    dispatch(setServingCounter(Number(e.target.value)));
                  }}
                />
                <div className={styles.right__counterTray__counter__icons}>
                  <div className={styles.right__counterTray__counter__icons__arrow}>
                    <AiOutlineUp
                      onClick={() => {
                        adjusterFunc("+");
                      }}
                    />
                  </div>
                  <div className={styles.right__counterTray__counter__icons__arrow}>
                    <AiOutlineDown
                      onClick={() => {
                        adjusterFunc("-");
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className={styles.right__counterTray__serving}>
                <div>servings</div>
              </div>
              <div className={styles.right__counterTray__servingsize}>
                <div className={styles.right__counterTray__serving__num}>
                  {Math.round(16 / servingCounter)} oz
                </div>
                &nbsp; : &nbsp;serving size
              </div>
            </div>
          )}
          {singleElement && (
            <div className={styles.content}>
              <div className={styles.content__heading__nutrition}>
                <>
                  <div>
                    <h3 className={styles.content__name}>
                      {nutritionState?.ingredientName}
                    </h3>
                  </div>
                  <div
                    className={styles.content__closeBox}
                    onClick={() => {
                      setNutritionState(null);
                      setSingleElement(false);
                      dispatch(
                        setIngredientArrayForNutrition(selectedIngredientsList)
                      );
                    }}
                  >
                    <MdOutlineClose
                      className={styles.content__closeBox__closeIcon}
                    />
                  </div>
                </>
              </div>
            </div>
          )}
        </div>

        <div className={styles.compoent__box__nutrition}>
          {nutritionTrayData ? (
            <UpdatedRecursiveAccordian
              dataObject={nutritionTrayData}
              counter={servingCounter}
            />
          ) : (
            <div>
              <CircularRotatingLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
