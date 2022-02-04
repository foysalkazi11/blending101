/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import Accordion from "../../../../theme/accordion/accordion.component";
import Image from "next/image";
import { healthList } from "./rightTray";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { useLazyQuery } from "@apollo/client";
import { NUTRITION_BASED_RECIPE } from "../../../../gqlLib/recipes/queries/getSearchIngredients";

interface PassingProps {
  name: string;
  percent: number;
}

const RightTray = () => {
  const nutritionState = useAppSelector(
    (state) => state.quantityAdjuster.nutritionState
  );

  // const nutritionLevel=

  // `[{ ingredientId: "61c6e4453a320071dc96ab1a", value: 12 }
  // { ingredientId: "61c6e4453a320071dc96ab3e", value: 40 }
  // { ingredientId: "61c6e4463a320071dc96ab87", value: 76 }]`

  const [NutritionStateTemp, SetNutritionStateTemp] = useState("");
  const [
    filterIngredientByCategoryAndClass,
    { loading: searchInProcess, data: searchElement },
  ] = useLazyQuery(
    NUTRITION_BASED_RECIPE(`[
  { ingredientId: "61c6e4453a320071dc96ab1a", value: 12 }
  ]`),
    {
      fetchPolicy: "network-only",
      //   variables: { classType: "All"
      // },
    }
  );

  const fetchSearchResults = async () => {
    await filterIngredientByCategoryAndClass();

    let Calories = "";

    searchElement?.getNutritionBasedOnRecipe.map((elem) => {
      // console.log(elem.value);

      let nutritionArgument = {
        ingredientId: elem.uniqueNutrientRefference._id,
        value: elem.value,
      };

      let nutritionArguentString =
        `{` +
        `ingredientId:${nutritionArgument.ingredientId}` +
        `,` +
        `value:${nutritionArgument.value}` +
        `}`;

      Calories = Calories + JSON.stringify(nutritionArguentString);
    });
    SetNutritionStateTemp(Calories);
  };

  useEffect(() => {
    fetchSearchResults();
    console.log(NutritionStateTemp);
  }, [nutritionState]);

  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>
          Amount Per Servings Calories
        </div>
        <p>{NutritionStateTemp}</p>
        <div className={styles.right__calories}>
          <h4>Calories</h4>
          <h3>93</h3>
          <div className={styles.right__userIcon}>
            <Image
              src={"/images/user-profile.png"}
              alt=""
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>
        <hr />
        <div className={styles.right__subheader}>
          <div className={styles.right__subheader__value}>Value</div>
          <div></div>
          <div className={styles.right__subheader__daily}>Daily %</div>
        </div>
        <div className={styles.compoent__box} style={{}}>
          <Accordion title="Energy">
            <table>
              <tbody>
                {nutritionState.map((elem, index) => {
                  return (
                    <tr className={styles.table__row} key={"table_row" + index}>
                      <td className={styles.table__row__cell}>
                        Total Carbohydrates
                      </td>
                      <td className={styles.table__row__cell}>39.2 g</td>
                      <td className={styles.table__row__cell}>12%</td>
                    </tr>
                  );
                })}
                {/* <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}>
                    Total Carbohydrates
                  </td>
                  <td className={styles.table__row__cell}>39.2 g</td>
                  <td className={styles.table__row__cell}>12%</td>
                </tr>
                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}>Dietary Fiber</td>
                  <td className={styles.table__row__cell}>15.6 g</td>
                  <td className={styles.table__row__cell}>12%</td>
                </tr>

                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}>Sugars Protein</td>
                  <td className={styles.table__row__cell}>6.4 g</td>
                  <td className={styles.table__row__cell}> 8%</td>
                </tr> */}
              </tbody>
            </table>
          </Accordion>

          <Accordion title="Vitamins">
            <table>
              <tbody>
                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}> Vitamin A </td>
                  <td className={styles.table__row__cell}> 30.202 iu </td>
                  <td className={styles.table__row__cell}> 597% </td>
                </tr>

                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}> Vitamin B </td>
                  <td className={styles.table__row__cell}> 480 mg </td>
                  <td className={styles.table__row__cell}> 356% </td>
                </tr>
              </tbody>
            </table>
          </Accordion>

          <Accordion title="Minerals">
            <table>
              {/* sx={{ "&:last-child td, &:last-child th": { border: 0 } }} */}
              <tbody>
                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}> Potassium </td>
                  <td className={styles.table__row__cell}> 296 mg </td>
                  <td className={styles.table__row__cell}> 32% </td>
                </tr>

                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}> Iron </td>
                  <td className={styles.table__row__cell}> 9 mg </td>
                  <td className={styles.table__row__cell}> 39% </td>
                </tr>
                <tr className={styles.table__row}>
                  <td className={styles.table__row__cell}> Calcium </td>
                  <td className={styles.table__row__cell}> 600 mg </td>
                  <td className={styles.table__row__cell}> 232% </td>
                </tr>
              </tbody>
            </table>
          </Accordion>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.right__title}>Health</div>
        <div className={styles.right__sub_heading}>
          Disease, Condition and Systems
        </div>
        <div className={styles.compoent__box} style={{}}>
          {healthList.map(({ name, percent }: PassingProps, index) => {
            return (
              <LinearComponent name={name} percent={percent} key={index} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RightTray;
