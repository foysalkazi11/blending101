import React from "react";
import AContainer from "../../../containers/A.container";
import styles from "./EditRecipe.module.scss";
import Image from "next/image";

const EditRecipePage = () => {
  //   const Acontainer = {
  //     showHeader: true,
  //     showSidebar: true,
  //     showLeftTray: false,
  //     showRighTray: true,
  //     nutritionTray: false,
  //     healthTray: false,
  //     ingredientTray: false,
  //     filterTray: false,
  //   };
  return (
    <AContainer>
      <div className={styles.main}>
        <div className={styles.left}>
          <div className={styles.left__title}>Ingredient List</div>
        </div>
        <div className={styles.center}>
          <div className={styles.center__title}>
            <div className={styles.center__title__left}>
              <span>
                <Image
                  src={"/icons/recipe-icon.svg"}
                  alt={"icon"}
                  width={24}
                  height={24}
                />
              </span>
              <h3>Recipe</h3>
            </div>
            <div className={styles.center__title__right}>
              <span>
                <Image
                  src={"/icons/recipe-icon.svg"}
                  alt={"icon"}
                  width={24}
                  height={24}
                />
              </span>
              <span>
                <Image
                  src={"/icons/recipe-icon.svg"}
                  alt={"icon"}
                  width={24}
                  height={24}
                />
              </span>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.right__title}>Nutrition </div>
        </div>
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
