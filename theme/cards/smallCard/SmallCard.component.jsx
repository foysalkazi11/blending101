/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./smallcard.module.scss";
import { BsCheck } from "react-icons/bs";

export default function SmallcardComponent({
  img,
  imgHeight,
  text,
  fnc,
  recipe,
  findCompareRecipe,
  fucUnCheck,
  conpareLength,
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
          <button
            disabled={conpareLength === 4 ? true : false}
            className={`${styles.compar} ${
              conpareLength === 4 ? styles.disable : ""
            }`}
            onClick={handleClick}
          >
            compare
          </button>
        )}
        {/* <div className={styles.drag}>
          <DragIndicatorIcon />
        </div> */}

        {findRecipe ? (
          <div className={`${styles.tick}`} onClick={handleUnCheck}>
            <BsCheck className={styles.tickimg} />
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
