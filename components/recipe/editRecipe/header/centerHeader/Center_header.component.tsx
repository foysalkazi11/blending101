import React from "react";
import styles from "./Center_header.module.scss";
import Image from "next/image";
import ClearIcon from "../../../../../public/icons/clear_black_36dp.svg";
import ButtonComponent from "../../../../../theme/button/buttonA/button.component";
const Center_header = (editARecipeFunction) => {
  return (
    <div className={styles.center__title}>
      <div className={styles.center__title__left}>
        <span>
          <Image src={"/icons/recipe-icon.svg"} alt={"icon"} width={24} height={24} />
        </span>

        <h3>Recipe</h3>
      </div>
      <div className={styles.center__title__right}>
        <div
          className={styles.save__Recipe__button}
          onClick={() => editARecipeFunction()}
        >
          <ButtonComponent
            type={"primary"}
            style={{minHeight:"100%"}}
            fullWidth={true}
            value="Save Recipe"
          />
        </div>

        <div className={styles.center__title__right__cross}>
          <ClearIcon />
        </div>
      </div>
    </div>
  );
};

export default Center_header;
