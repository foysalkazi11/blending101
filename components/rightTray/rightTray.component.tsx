/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import styles from "./rightTray.module.scss";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import UpdatedRecursiveAccordian from "../customRecursiveAccordian/updatedRecursiveAccordian.component";
import {
  setIngredientArrayForNutrition,
  setServingCounter,
} from "../../redux/edit_recipe/editRecipeStates";
import { MdOutlineClose } from "react-icons/md";
import CircularRotatingLoader from "../../theme/loader/circularRotatingLoader.component";
import RightHeader from "../recipe/addRecipe/header/right_header/right_header.component";
import NutrationPanelSkeleton from "../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";

interface RightTrayInterface {
  nutritionTrayData?: any;
  nutritionState?: any;
  setNutritionState?: any;
  counter?: number;
  isComeFormRecipeEditPage?: boolean;
  calculatedIngOz?: number;
  nutritionDataLoading: boolean;
  servingSize?: number;
  servings?: number;
  adjusterFunc?: (value: number) => void;
}

const RightTray = ({
  nutritionTrayData = {},
  setNutritionState = () => {},
  counter = 1,
  isComeFormRecipeEditPage = false,
  calculatedIngOz = 0,
  nutritionState = {},
  nutritionDataLoading,
  servingSize = 0,
  servings = 1,
  adjusterFunc = () => {},
}: RightTrayInterface) => {
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );

  const measurement =
    nutritionState?.portions?.find((itm) => itm?.default)?.measurement ||
    nutritionState?.selectedPortion?.name;
  const nutrientName =
    nutritionState?.ingredientName ||
    nutritionState?.ingredientId?.ingredientName;

  const dispatch = useAppDispatch();
  const [servingSizeCounter, setServingSizeCounter] = useState(1);

  useEffect(() => {
    if (servings) {
      setServingSizeCounter(servings);
    }
  }, [servings]);

  return (
    <div className={styles.rightTaryContainer}>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__headerDiv}>
          <div className={styles.right__title}>Nutrition</div>
          {nutritionState?._id || nutritionState?.ingredientId?._id ? (
            <div className={styles.content}>
              <div className={styles.content__heading__nutrition}>
                <>
                  <div>
                    <h3 className={styles.content__name}>
                      {1}&nbsp;
                      {measurement}
                      &nbsp;
                      {nutrientName}
                    </h3>
                  </div>
                  <div
                    className={styles.content__closeBox}
                    onClick={() => {
                      setNutritionState({});
                      dispatch(
                        setIngredientArrayForNutrition(selectedIngredientsList),
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
          ) : (
            <div className={styles.right__counterTray}>
              {/* <p className={styles.servings}>{counter}</p> */}

              <div className={styles.right__counterTray__counter}>
                <input
                  className={styles.right__counterTray__counter__input}
                  type="number"
                  value={
                    isComeFormRecipeEditPage ? counter : servingSizeCounter
                  }
                  min={1}
                  onChange={(e) => {
                    isComeFormRecipeEditPage
                      ? adjusterFunc(parseInt(e?.target?.value))
                      : setServingSizeCounter(parseInt(e?.target?.value));
                  }}
                />
              </div>

              <div className={styles.right__counterTray__serving}>
                <div>servings</div>
              </div>
              <div className={styles.right__counterTray__servingsize}>
                <div className={styles.right__counterTray__serving__num}>
                  {isComeFormRecipeEditPage
                    ? Math.round(calculatedIngOz / counter)
                    : Math.round((servingSize * counter) / servingSizeCounter)}
                  oz
                </div>
                &nbsp; : &nbsp; serving size
              </div>
            </div>
          )}
        </div>

        <div className={styles.compoent__box__nutrition}>
          {nutritionDataLoading ? (
            <div style={{ padding: " 0 10px" }}>
              <NutrationPanelSkeleton />
            </div>
          ) : (
            <UpdatedRecursiveAccordian
              dataObject={nutritionTrayData}
              counter={isComeFormRecipeEditPage ? 1 : counter}
              servingSize={
                isComeFormRecipeEditPage ? counter : servingSizeCounter
              }
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
