import React, { useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import styles from "./SliderArrows.module.scss";

type SliderArrowsProps = {
  compareRecipeLength: number;
  prevFunc: () => void;
  nextFunc: () => void;
};

const SliderArrows = ({
  compareRecipeLength,
  prevFunc,
  nextFunc,
}: SliderArrowsProps) => {
  return (
    <>
      {compareRecipeLength ? (
        <div className={styles.customeArrowContainer}>
          <div></div>

          <div className={styles.customeArrowContainer__arrows}>
            <div
              className={styles.customeArrowContainer__arrows__prev}
              onClick={prevFunc}
            >
              <ChevronLeftIcon />
            </div>

            <div
              className={styles.customeArrowContainer__arrows__prev}
              onClick={nextFunc}
            >
              <ChevronRightIcon />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SliderArrows;
