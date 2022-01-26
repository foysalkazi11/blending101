import React from "react";
import DragAndDrop from "../../theme/dragAndDrop/DragAndDrop.component";
import styles from "../../styles/component.module.scss";
import Carousel from "../../theme/carousel/carousel.component";
import SmallcardComponent from "../../theme/cards/smallCard/SmallCard.component";
import Accordion from "../../theme/accordion/accordion.component";

//responsive crousel Setting

const responsiveSetting = {
  slidesToShow: 7,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const index = () => {
  return (
    <div className={styles.component__container}>
      <div className={styles.compoent__box}>
        <h3>DRAG AND DROPS</h3>
        <DragAndDrop />
      </div>
      <div className={styles.compoent__box}>
        <h3>Responsive Carousel</h3>

        <Carousel moreSetting={responsiveSetting}>
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
          <SmallcardComponent
            imgHeight={undefined}
            text={undefined}
            fnc={undefined}
            img={undefined}
            recipe={undefined}
            findCompareRecipe={undefined}
            fucUnCheck={undefined}
            conpareLength={undefined}
          />
        </Carousel>
      </div>

      <div className={styles.compoent__boxA} style={{ width: "33%" }}>
        <h3>Accordion</h3>

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
          </table>
        </Accordion>

        <Accordion title="Minerals">
          <table>
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
  );
};

export default index;
