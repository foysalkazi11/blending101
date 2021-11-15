/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./smallcard.module.scss";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import CheckIcon from "@mui/icons-material/Check";

export default function SmallcardComponent({ img, imgHeight, text, fnc }) {
  const style = {};
  if (imgHeight) style.height = imgHeight;

  text = text || "Chocolate Avocado Smoothie";
  img = img || "/cards/coriander.png";

  const handleClick = () => {
    fnc && fnc();
  };

  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCard__innerContainer}>
        <div className={styles.compar} onClick={handleClick}>
          compare
        </div>
        <div className={styles.drag}>
          <DragIndicatorIcon />
        </div>
        <div className={styles.tick}>
          <CheckIcon className={styles.tickimg} />
        </div>

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
