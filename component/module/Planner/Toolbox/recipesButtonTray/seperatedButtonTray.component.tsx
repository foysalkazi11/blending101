import React from "react";
import CustomButton from "../customButtons/customButton.component";
import { MdRemoveCircleOutline } from "react-icons/md";
import Generate from "../../../../../public/images/generate.svg";
import styles from "./seperatedButtonTray.module.scss";

const SeperatedButtonTray = () => {
  return (
    <div className={styles.mainContainer}>
      <CustomButton
        text="Clear All"
        iconComponent={<MdRemoveCircleOutline />}
      />
      <CustomButton text="Generate" iconComponent={<Generate />} />
    </div>
  );
};

export default SeperatedButtonTray;
