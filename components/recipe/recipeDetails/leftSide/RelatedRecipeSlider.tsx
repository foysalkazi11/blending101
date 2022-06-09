/* eslint-disable @next/next/no-img-element */
import React from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import { recommendedList } from "../../fackData/recipeDetails";
import ChevronRightIcon from "../../../../public/icons/chevron_right_black_36dp.svg";
import ChevronLeftIcon from "../../../../public/icons/chevron_left_black_36dp.svg";
import styles from "./LeftSide.module.scss";
import PanelHeader from "../../share/panelHeader/PanelHeader";

const RelatedRecipeSlider = () => {
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
    return (
      <div className={className + " " + styles.nextBtn} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };
  const responsiveSetting = {
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,

    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.relatedProductSliderContainer}>
      <PanelHeader icon="/images/telescope.svg" title="Related" />
      <CustomSlider moreSetting={responsiveSetting}>
        {recommendedList?.map((cardData, index) => {
          return (
            <DatacardComponent
              key={cardData.title + index}
              title={cardData.title}
              ingredients={cardData.ingredients}
              category={cardData.category}
              ratings={cardData.ratings}
              noOfRatings={cardData.noOfRatings}
              carbs={cardData.carbs}
              score={cardData.score}
              calorie={cardData.calorie}
              noOfComments={cardData.noOfComments}
              image={cardData.image}
            />
          );
        })}
      </CustomSlider>
    </div>
  );
};

export default RelatedRecipeSlider;
