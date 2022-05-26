import React, { useState } from "react";
import useGetDefaultPortionOfnutration from "../../customHooks/useGetDefaultPortionOfNutration";
import { setSelectedIngredientsList } from "../../redux/edit_recipe/editRecipeStates";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import styles from "./linearProgress.module.scss";
import LinearIndicatorcomponent from "./progress/progress.component";
interface Props {
  element?: {};
  name: string;
  ingredientId?: string;
  percent: number;
  checkbox?: boolean;
  checkedState?: boolean;
  units?: string;
  highestValue: number;
  handleOnChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Linearcomponent = ({
  element,
  name,
  percent,
  checkbox,
  units,
  highestValue,
  ingredientId = "",
  checkedState,
  handleOnChange = () => {},
}: Props) => {
  const [ingId, setIngId] = useState("");
  useGetDefaultPortionOfnutration(ingId);
  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList
  );

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen === ingredient) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...selectedIngredientsList, ingredient];
    } else {
      blendz = selectedIngredientsList?.filter((blen) => {
        return blen !== ingredient;
      });
    }

    dispatch(setSelectedIngredientsList(blendz));
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.cardHeadComponent}>
        {checkbox === true ? (
          <span className={styles.container}>
            <input
              className={styles.checkbox}
              type="checkbox"
              checked={checkedState}
              onChange={(e) => handleOnChange(e)}
              // onClick={() => handleIngredientClick(element)}
            />
            <span className={styles.mark}></span>
          </span>
        ) : null}
        <div className={styles.title} onClick={() => setIngId(ingredientId)}>
          {name}
        </div>
        <div className={styles.score}>
          {`${percent}${units?.toLowerCase()}`}
        </div>
      </div>
      <LinearIndicatorcomponent percent={percent} highestValue={highestValue} />
    </div>
  );
};
export default Linearcomponent;
