import React from "react";
import { IoIosClose } from "react-icons/io";
import AddIngredient from "../../../../theme/addIngredient/addIngredient.component";
import ImageCardComponent from "../../../../theme/card/imageCard/imageCard.component";
import TitledImageCard from "../../../../theme/card/imageCard/titledImageCard/titledImageCard.component";
import DropDownElem from "../../../../theme/dropDownElem/dropDownElem.component";
import styles from "./UploadCard.module.scss";

interface UploadCardInterface {
  setUploadState?: any;
}

const UploadCard = ({ setUploadState }: UploadCardInterface) => {
  return (
    <div className={styles.mainContainer}>
      <IoIosClose
        className={styles.mainContainer__cancelDiv}
        onClick={() => {
          setUploadState(false);
        }}
      />
      <h5 className={styles.mainContainer__mainHeading}>
        Upload Challanges Post
      </h5>
      <div>
        <ImageCardComponent />
      </div>
      <div className={styles.dropDownTray}>
        <div className={styles.dropDownTray__elem}>
          <DropDownElem />
        </div>
        <div className={styles.dropDownTray__elem}>
          <DropDownElem />
        </div>
      </div>
      <h5 className={styles.headingText}>My Notes</h5>
      <div className={styles.notesTray}>
        <div className={styles.notesTray__imageCard}>
          <TitledImageCard />
        </div>
        <div className={styles.notesTray__servings}>
          <h3>[ 1 ] How many servings?</h3>
          <h5>16 oz serving size</h5>
          <div className={styles.notesTray__servings__scoreCard}>
            <TextScoreDiv text="Nutri-Score" score="234" />
            <TextScoreDiv text="Calories" score="120" />
            <TextScoreDiv text="Carbs" score="32" />
            <TextScoreDiv text="Net Carbs" score="12" />
            <TextScoreDiv text="Glycemic Load" score="23" />
          </div>
        </div>
        <div>
          <AddIngredient />
        </div>
      </div>

      <h5 className={styles.headingText}>My Notes</h5>
      <div className={styles.notesText}>
        <h5 className={styles.notesText__heading}>asdfasd</h5>
        <h5 className={styles.notesText__content}>
          asdfas asdfasdf asfd asdfasdf asfasdf asdf asfasdf asfdasdf asdfas f
        </h5>
      </div>
    </div>
  );
};

export default UploadCard;

interface textScoreInterface {
  text?: string;
  score?: string;
}

const TextScoreDiv = ({ text, score }: textScoreInterface) => {
  return (
    <div className={styles.textScoreDiv}>
      <span className={styles.textScoreDiv__text}>{text}</span>
      <span className={styles.textScoreDiv__score}>{score}</span>
    </div>
  );
};
