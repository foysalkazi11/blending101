/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./RightSide.module.scss";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import { MdOutlineClose } from "react-icons/md";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";

interface PassingProps {
  name: string;
  percent: number;
}

const RightSide = ({
  nutritionData,
  counter,
  counterHandler,
  nutritionState,
  setsingleElement,
  singleElement,
  adjusterFunc,
}) => {
  console.log(nutritionData, "dadas");
  return (
    <div>
      <div className={styles.header}>
        <img src="/icons/chart-bar-light-green.svg" alt="bar icon" />
        <h3>Rx Facts</h3>
      </div>
      <div className={styles.content}>
        <div className={styles.content__heading}>
          <h3>Nutrition</h3>
          {singleElement === false && (
            <div className={styles.right__counterTray}>
              <div className={styles.right__counterTray__counter}>
                <input
                  className={styles.right__counterTray__counter__input}
                  type="number"
                  value={counter}
                  onChange={(e) => {
                    counterHandler(e.target.value);
                  }}
                />
                <div className={styles.right__counterTray__counter__icons}>
                  <AiOutlineUp
                    onClick={() => {
                      adjusterFunc("+");
                    }}
                  />
                  <AiOutlineDown
                    onClick={() => {
                      adjusterFunc("-");
                    }}
                  />
                </div>
              </div>
              <div className={styles.right__counterTray__serving}>
                <div>servings</div>
                <div className={styles.right__counterTray__serving__num}>
                  {Math.round(16 / counter)} oz
                </div>
              </div>
              <div className={styles.right__counterTray__servingsize}>
                serving size
              </div>
            </div>
          )}
          <div className={styles.content__heading__nutrition}>
            {singleElement === true ? (
              <div
                className={styles.content__closeBox}
                onClick={() => {
                  setsingleElement(false);
                }}
              >
                <MdOutlineClose className={styles.content__closeBox__closeIcon} />
              </div>
            ) : null}
          </div>
          {singleElement === true ? (
            <div>
              <h3 className={styles.content__name}>
                {nutritionState && nutritionState[0]?.ingredientId?.ingredientName}
              </h3>
            </div>
          ) : null}
          <p>Amount Per Serving Calories</p>
        </div>
        <div className={styles.ingredientsDetails}>
          {nutritionData ? (
            <UpdatedRecursiveAccordian
              dataObject={nutritionData}
              counter={counter}
            />
          ) : (
            <div style={{ marginTop: "30px" }}>
              <CircularRotatingLoader />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RightSide;
