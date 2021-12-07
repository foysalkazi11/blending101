import React, { useState } from "react";
import styles from "./WikiRight.module.scss";
import LinearComponent from "../../../theme/linearProgress/LinearProgress.component";
// import { color, fontSize } from "@mui/system";
import Image from "next/image";
import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";
import DropDown from "../../../theme/dropDown/DropDown.component";

// import {BsCaretDown} from 'react-icons/bs';
// import dropDownIcon from '/icons/dropdown.svg';

// ensure correct type of values are being passed
interface PassingProps {
  name: string;
  percent: number;
}

interface PassingData{
  ingredient?:{name:string,percent:number}[];
  nutrition?:{name:string,percent:number}[];
}
//state for sorting icon

function WikiRightComponent({ingredient,nutrition}:PassingData) {
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
        <div className={styles.calciumMg}>
          <div className={styles.calciumText}>
            <div>Calcium (mg)</div>
          </div>
          <div className={styles.calciumIcon}>
            <div>
              {sortState ? (
                <span>
                  <FaSortAmountDown onClick={SortingOrder} />
                </span>
              ) : (
                <span>
                  <FaSortAmountDownAlt onClick={SortingOrder} />
                </span>
              )}
            </div>
          </div>
        </div>
        {ingredient.map(({ name, percent }: PassingProps, index) => {
          return <LinearComponent name={name} percent={percent} key={index} />;
        })}
      </div>
      <div className={styles.rightCardNutrition}>
        <div className={styles.rightCardHeading}>Nutrition</div>
        {nutrition.map(({ name, percent }: PassingProps, index) => {
          return <LinearComponent name={name} percent={percent} key={index} />;
        })}
      </div>

      {/* Right element is being  updated */}
      {/* remove this div below as it was just to test 1st card is useless */}
    </div>
  );
}

export default WikiRightComponent;
