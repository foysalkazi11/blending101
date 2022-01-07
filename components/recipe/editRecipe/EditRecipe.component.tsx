import React, { useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./EditRecipe.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import RightTray from "./rightTray/rightTray.component";
import Left_tray_recipe_edit from "./leftTray/left_tray_recipe_edit.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import Image from "next/image";

const EditRecipePage = () => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  return (
    <AContainer>
      <div className={styles.main}>
        <div
          className={leftTrayVisibleState ? styles.left : styles.left__stacked}
        >
          <div
            className={styles.left__Drag__lightGreen}
            onClick={() => setLeftTrayVisibleState(!leftTrayVisibleState)}
          >
            <div>
              {/* left basket drag button, images are used as backgound images for this div in scss files */}
            </div>
          </div>
          <div className={styles.left__title}>
            <div className={styles.left__title__bagicon}>
              <Image
                src={"/icons/basket.svg"}
                alt="Picture will load soon"
                height={"100%"}
                width={"100%"}
                // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            Ingredient List
          </div>
          <div className={styles.left__ingredientlistTray}>
            <Left_tray_recipe_edit />
          </div>
        </div>
        <div className={styles.center}>
          <Center_header />
          <Center_Elements />
          <IngredientList />
        </div>
        <div className={styles.right__main}>
          <RightTray />
        </div>
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
