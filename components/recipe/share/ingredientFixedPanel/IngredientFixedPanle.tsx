/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState } from "react";
import useHover from "../../../utility/useHover";
import IngredientPanel from "../ingredientPanel/IngredientPanel";
import styles from "./IngredientFixedPanel.module.scss";

interface IngredientFixedPanlePorps {
  handleIngredientClick?: (ingredient: any, present: boolean) => void;
  checkActive?: (id: string) => boolean;
}

const IngredientFixedPanle = ({
  checkActive = () => false,
  handleIngredientClick = () => {},
}: IngredientFixedPanlePorps) => {
  const [hoevrRef, hover] = useHover();
  const [openTray, setOpenTray] = useState(false);

  return (
    <div className={styles.ingrdeintFixedPanelContainer} ref={hoevrRef}>
      <div
        className={`${styles.ingrdeintFixedPanelInnerContainer} ${
          openTray ? styles.openTray : null
        }`}
      >
        <div className={`${styles.tag} ${hover ? styles.openTag : null}`}>
          <img
            src={hover ? "/icons/ingr-green.svg" : "/icons/ingr-white.svg"}
            alt="open tag"
            onClick={() => setOpenTray((prev) => !prev)}
          />
        </div>
        <IngredientPanel
          handleIngredientClick={handleIngredientClick}
          checkActive={checkActive}
        />
      </div>
    </div>
  );
};

export default IngredientFixedPanle;
