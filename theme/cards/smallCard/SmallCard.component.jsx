/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./smallcard.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckIcon from "@mui/icons-material/Check";

export default function SmallcardComponent({
  img,
  imgHeight,
  text,
  fnc,
  recipe,
  findCompareRecipe,
  fucUnCheck,
}) {
  const style = {};
  if (imgHeight) style.height = imgHeight;

  text = text || "Chocolate Avocado Smoothie";
  img = img || "/cards/coriander.png";

  const findRecipe = findCompareRecipe && findCompareRecipe(recipe?.id);

  const handleClick = () => {
    fnc && fnc(recipe);
  };

  const handleUnCheck = () => {
    fucUnCheck && fucUnCheck(recipe);
  };

  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCard__innerContainer}>
        {findRecipe ? null : (
          <div className={styles.compar} onClick={handleClick}>
            compare
          </div>
        )}
        <div className={styles.drag}>
          <DragIndicatorIcon />
        </div>
        {findRecipe ? (
          <div className={`${styles.tick}`} onClick={handleUnCheck}>
            <CheckIcon className={styles.tickimg} />
          </div>
        ) : null}

        <div className={styles.smallCard__top} style={style}>
          <img src={img} alt="coriander" />
        </div>
        <div className={styles.smallCard__bottom}>
          <p>{text}</p>
        </div>
      </div>
    </div>
  );
}
