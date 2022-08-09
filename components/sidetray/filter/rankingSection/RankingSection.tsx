import React, { Dispatch, SetStateAction } from "react";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import IngredientPanelSkeleton from "../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";
import { ingredientState, List } from "../ingredients/Ingredients.component";
import styles from "../filter.module.scss";

interface Props {
  ascendingDescending?: boolean;
  setascendingDescending?: Dispatch<SetStateAction<boolean>>;
  list?: List[];
  setList?: Dispatch<SetStateAction<List[]>>;
  rankingDropDownState?: string;
  setRankingDropDownState?: Dispatch<SetStateAction<string>>;
  scrollAreaMaxHeight?: React.CSSProperties;
  handleIngredientClick?: (item: any, exist: boolean) => void;
  checkActiveIngredient?: (arg: any) => boolean;
  nutritionLoading?: boolean;
  arrayOrderState?: any[];
  allIngredients?: any[];
}

const RankingSection = ({
  ascendingDescending = true,
  list = [],
  rankingDropDownState = "",
  setList = () => {},
  setRankingDropDownState = () => {},
  setascendingDescending = () => {},
  handleIngredientClick = () => {},
  checkActiveIngredient = () => false,
  scrollAreaMaxHeight = { maxHeight: "350px" },
  nutritionLoading = false,
  arrayOrderState = [],
  allIngredients = [],
}: Props) => {
  return (
    <div className={styles.rankings}>
      <CalciumSearchElem
        ascendingDescending={ascendingDescending}
        setascendingDescending={setascendingDescending}
        list={list}
        setList={setList}
        dropDownState={rankingDropDownState}
        setDropDownState={setRankingDropDownState}
      />
      <div
        className={`${styles.rankgingItemContainer} y-scroll`}
        style={scrollAreaMaxHeight}
      >
        {nutritionLoading ? (
          <IngredientPanelSkeleton />
        ) : arrayOrderState?.length ? (
          arrayOrderState?.map(
            ({ name, value, units, ingredientId }: ingredientState, index) => {
              return (
                <Linearcomponent
                  name={name}
                  percent={Number(value?.toFixed(2))}
                  key={index}
                  units={units}
                  //@ts-ignore
                  highestValue={
                    ascendingDescending
                      ? arrayOrderState[0]?.value
                      : arrayOrderState[arrayOrderState?.length - 1]?.value
                  }
                  checkbox={true}
                  checkedState={checkActiveIngredient(ingredientId)}
                  handleOnChange={() =>
                    handleIngredientClick(
                      allIngredients?.find(
                        (item) => item?._id === ingredientId,
                      ) || {},
                      checkActiveIngredient(ingredientId),
                    )
                  }
                />
              );
            },
          )
        ) : (
          <div className={styles.noResult}>
            <p>No Ingredients</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RankingSection;
