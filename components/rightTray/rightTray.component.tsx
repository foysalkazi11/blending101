/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from 'react';
import styles from './rightTray.module.scss';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import UpdatedRecursiveAccordian from '../customRecursiveAccordian/updatedRecursiveAccordian.component';
import {
  setIngredientArrayForNutrition,
  setServingCounter,
} from '../../redux/edit_recipe/editRecipeStates';
import { MdOutlineClose } from 'react-icons/md';
import CircularRotatingLoader from '../../theme/loader/circularRotatingLoader.component';
import RightHeader from '../recipe/addRecipe/header/right_header/right_header.component';
import NutrationPanelSkeleton from '../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton';

interface RightTrayInterface {
  nutritionTrayData?: any;
  singleElement?: any;
  setSingleElement?: any;
  nutritionState?: any;
  setNutritionState?: any;
  counter?: number;
  counterHandler?: string;
  nutrientName?: string;
  measurement?: string;
  isComeFormRecipePage?: boolean;
  calculatedIngOz?: number;
}

const RightTray = ({
  nutritionTrayData,
  singleElement,
  setSingleElement,
  setNutritionState,
  counter,
  nutrientName,
  measurement,
  isComeFormRecipePage = false,
  calculatedIngOz = 0,
}: RightTrayInterface) => {
  const selectedIngredientsList = useAppSelector(
    (state) => state?.editRecipeReducer?.selectedIngredientsList,
  );

  const dispatch = useAppDispatch();
  const [servingSize, setServingSize] = useState(1);

  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__headerDiv}>
          <div className={styles.right__title}>Nutrition</div>
          {!singleElement && (
            <div className={styles.right__counterTray}>
              {isComeFormRecipePage ? (
                <p className={styles.servings}>{counter}</p>
              ) : (
                <div className={styles.right__counterTray__counter}>
                  <input
                    className={styles.right__counterTray__counter__input}
                    type="number"
                    value={servingSize}
                    min={1}
                    onChange={(e) => {
                      setServingSize(parseInt(e?.target?.value));
                    }}
                  />
                </div>
              )}

              {/* <div className={styles.right__counterTray__counter__icons}>
                  <div
                    className={styles.right__counterTray__counter__icons__arrow}
                  >
                    <AiOutlineUp
                      onClick={() => {
                        adjusterFunc("+");
                      }}
                    />
                  </div>
                  <div
                    className={styles.right__counterTray__counter__icons__arrow}
                  >
                    <AiOutlineDown
                      onClick={() => {
                        adjusterFunc("-");
                      }}
                    />
                  </div>
                </div> */}

              <div className={styles.right__counterTray__serving}>
                <div>servings</div>
              </div>
              <div className={styles.right__counterTray__servingsize}>
                <div className={styles.right__counterTray__serving__num}>
                  {isComeFormRecipePage
                    ? calculatedIngOz
                    : Math.round((16 * counter) / servingSize)}{' '}
                  oz
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
                      {counter}&nbsp;
                      {measurement}
                      &nbsp;
                      {nutrientName}
                    </h3>
                  </div>
                  <div
                    className={styles.content__closeBox}
                    onClick={() => {
                      setNutritionState(null);
                      setSingleElement(false);
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
          )}
        </div>

        <div className={styles.compoent__box__nutrition}>
          {nutritionTrayData ? (
            <UpdatedRecursiveAccordian
              dataObject={nutritionTrayData}
              counter={isComeFormRecipePage ? 1 : counter}
              servingSize={isComeFormRecipePage ? 1 : servingSize}
            />
          ) : (
            <div style={{ padding: ' 0 10px' }}>
              <NutrationPanelSkeleton />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
