import React, { useState } from "react";
import styles from "./WikiRight.module.scss";
import Card from "./Card/Card.component";
// import { color, fontSize } from "@mui/system";
import Image from "next/image";
import { FaSortAmountDownAlt, FaSortAmountDown } from "react-icons/fa";

// import {BsCaretDown} from 'react-icons/bs';
// import dropDownIcon from '/icons/dropdown.svg';

// just to ensure correct type of values are being passed
interface PassingProps {
  name: string;
  percent: number;
}

//state for sorting icon

function WikiRightComponent() {
  const [sortState, curSortState] = useState(true);
  const SortingOrder = () => {
    curSortState(!sortState);
    return sortState;
    // return console.log(sortState);
  };
  const Ingredients = [
    { name: "Ginger", percent: 109 },
    { name: "Turmeric", percent: 95 },
    { name: "Chia Seeds", percent: 90 },
    { name: "Broth", percent: 80 },
    { name: "Sweet Potatoes", percent: 75 },
    { name: "Winter Squash", percent: 60 },
    { name: "Mint", percent: 55 },
    { name: "Pineapple", percent: 40 },
    { name: "Coconut Oil", percent: 35 },
  ];

  const Nutrition = [
    { name: "Vitamin A", percent: 100 },
    { name: "Vitexin", percent: 90 },
    { name: "Vitamin D", percent: 87 },
    { name: "Iron", percent: 69 },
    { name: "Betaxanthins", percent: 50 },
    { name: "Calcium", percent: 35 },
    { name: "Quercetiin", percent: 20 },
  ];

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
        <div className={styles.formGroup}>
          <select
            name="dropdown"
            id="dropdown"
            className={styles.customSelectbx}
            style={{ backgroundImage: `url(/icons/dropdown.svg)` }}
          >
            {dropdownItem.map((item, index) => {
              return (
                <option value={item.toLowerCase()} key={index}>
                  {item}
                </option>
              );
            })}
          </select>
        </div>
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
        {Ingredients.map(({ name, percent }: PassingProps, index) => {
          return <Card name={name} percent={percent} key={index} />;
        })}
      </div>
      <div className={styles.rightCardNutrition}>
        <div className={styles.rightCardHeading}>Nutrition</div>
        {Nutrition.map(({ name, percent }: PassingProps, index) => {
          return <Card name={name} percent={percent} key={index} />;
        })}
      </div>

      {/* Right element is being  updated */}
      {/* remove this div below as it was just to test 1st card is useless */}
    </div>
  );
}

export default WikiRightComponent;
