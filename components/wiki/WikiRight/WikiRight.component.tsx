import React, { useState } from "react";
import styles from "./WikiRight.module.scss";
import LinearComponent from "../../../theme/linearProgress/LinearProgress.component";
import Image from "next/image";
import DropDown from "../../../theme/dropDown/DropDown.component";
import CalciumSearchElem from "../../../theme/calcium/calcium.component";

// import {BsCaretDown} from 'react-icons/bs';
// import dropDownIcon from '/icons/dropdown.svg';

// ensure correct type of values are being passed
interface PassingProps {
  name: string;
  percent: number;
}

interface PassingData {
  ingredient?: { name: string; percent: number }[];
  nutrition?: { name: string; percent: number }[];
}
//state for sorting icon

function WikiRightComponent({ ingredient, nutrition }: PassingData) {
  const [sortState, curSortState] = useState(true);
  const SortingOrder = () => {
    curSortState(!sortState);
    return sortState;
  };

  let dropdownItem = [
    "All",
    "Leafy Green",
    "Berry",
    "Herbal",
    "Fruity",
    "Balancer",
    "Fatty",
    "Seasoning",
    "Flavor",
    "Rooty",
    "Flowering",
    "Liquid",
  ];

  //   const Data = [{ Ingredients: Ingredients }, { Nutrition: Nutrition }];

  return (
    <div className={styles.right}>
      <div className={styles.recipeHeadingTopSec}>
        <h3>
          <div className={styles.chartbarIconDiv}>
            <Image
              src={"/icons/chart-bar-light-green.svg"}
              alt="Picture will load soon"
              height={"100%"}
              width={"100%"}
              // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
              layout="responsive"
              objectFit="contain"
            />
          </div>
          Rx Facts
        </h3>
      </div>
      <div className={styles.rightCard}>
        <div className={styles.rightCardHeading}>Ingredients</div>
        <DropDown listElem={dropdownItem} />
        <CalciumSearchElem />
        <div className={styles.progressIndicator}>
          {ingredient.map(({ name, percent }: PassingProps, index) => {
            return (
              <LinearComponent name={name} percent={percent} key={index} />
            );
          })}
        </div>
      </div>
      <div className={styles.rightCardNutrition}>
        <div className={styles.rightCardHeading}>Nutrition</div>
        <div className={styles.progressIndicator}>
          {nutrition.map(({ name, percent }: PassingProps, index) => {
            return (
              <LinearComponent name={name} percent={percent} key={index} />
            );
          })}
        </div>
      </div>
      {/* Right element is being  updated */}
      {/* remove this div below as it was just to test 1st card is useless */}
    </div>
  );
}

export default WikiRightComponent;
