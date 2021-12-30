/* eslint-disable @next/next/no-img-element */
import React from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

const recipeSliderImage = [
  "/images/recipe-slider-img1.png",
  "/images/recipe-slider-img2.png",
  "/images/recipe-slider-img3.png",
  "/images/recipe-slider-img4.png",
];

const Center = () => {
  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + " " + styles.prevBtn} onClick={onClick}>
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    const { className, onClick } = prop;
    // console.log("+++++++++++++++" + className);
    return (
      <div className={className + " " + styles.nextBtn} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };

  const responsiveSetting = {
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,
  };
  return (
    <div>
      <div className={styles.header}>
        <div className={styles.alignItems}>
          <img src="/images/recipe-icon.svg" alt="recipe icon" />
          <h3>Recipe</h3>
        </div>
        <div className={styles.alignItems}>
          <div className={styles.editBox}>
            <FiEdit2 className={styles.editIcon} />
          </div>
          <div className={styles.closeBox}>
            <MdOutlineClose className={styles.closeIcon} />
          </div>
        </div>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>Red Hots Smoothie</h3>
          <span className={styles.ratingBox}>
            <img src="/images/rating.svg" alt="" />
            4.9 (71)
          </span>
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>Smoothie</div>
            <img
              src="/images/yummly-logo.png"
              alt="recipe_logo"
              className={styles.recipeLogo}
            />
          </div>
          <div className={styles.alignItems}>
            <div className={styles.iconWithText}>
              <img src="/images/calendar-alt-light.svg" alt="calender" />
              <p>Planner</p>
            </div>

            <div className={styles.iconWithText}>
              <img src="/images/BookmarksStar-orange.svg" alt="saved" />
              <p>Saved</p>
            </div>
            <div className={styles.iconWithText}>
              <img src="/images/share-alt-light-grey.svg" alt="share" />
              <p>Share</p>
            </div>
            <div className={styles.iconWithText}>
              <img src="/icons/comment.svg" alt="comment" />
              <p style={{ color: "#7cbc39" }}>21</p>
            </div>
          </div>
        </div>

        <div className={styles.sliderBox}>
          <SlickSlider moreSetting={responsiveSetting}>
            {recipeSliderImage?.map((img, index) => {
              return (
                <div key={index} className={styles.imageBox}>
                  <img src={img} alt="recipe_image" />
                </div>
              );
            })}
          </SlickSlider>
        </div>
      </div>
    </div>
  );
};

export default Center;
