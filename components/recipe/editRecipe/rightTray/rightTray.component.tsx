import React from "react";
import RightHeader from "../header/right_header/right_header.component";
import styles from "./rightTray.module.scss";
import Accordion from "../../../../theme/accordion/accordion.component";
import Image from "next/image";
import { healthList } from "./rightTray";
import LinearComponent from "../../../../theme/linearProgress/LinearProgress.component";

interface PassingProps {
  name: string;
  percent: number;
}
const rightTray = () => {
  return (
    <div>
      <RightHeader />
      <div className={styles.right}>
        <div className={styles.right__title}>Nutrition</div>
        <div className={styles.right__sub_heading}>
          Amount Per Servings Calories
        </div>
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
          <div className={styles.right__subheader__daily}>Daily %</div>
        </div>
        <div className={styles.compoent__box} style={{}}>
          <Accordion title="Energy">
            <table>
              <tr className={styles.table__row}>
                <td className={styles.table__row__cell}>Total Carbohydrates</td>
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
              </tr>
            </table>
          </Accordion>

          <Accordion title="Vitamins">
            <table>
              <tr>
                <td className={styles.table__row__cell}> Vitamin A </td>
                <td className={styles.table__row__cell}> 30.202 iu </td>
                <td className={styles.table__row__cell}> 597% </td>
              </tr>

              <tr>
                <td className={styles.table__row__cell}> Vitamin B </td>
                <td className={styles.table__row__cell}> 480 mg </td>
                <td className={styles.table__row__cell}> 356% </td>
              </tr>
            </table>
          </Accordion>

          <Accordion title="Minerals">
            <table>
              {/* sx={{ "&:last-child td, &:last-child th": { border: 0 } }} */}
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

export default rightTray;
