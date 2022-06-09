/* eslint-disable @next/next/no-img-element */
import React from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import { recommendedList } from "../../fackData/recipeDetails";
import styles from "./LeftSide.module.scss";
import PanelHeader from "../../share/panelHeader/PanelHeader";
import {
  NextButton,
  PreviousButton,
} from "../../share/sliderArrows/SliderArrows";

const RelatedRecipeSlider = () => {
  const responsiveSetting = {
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,

    responsive: [
      {
        breakpoint: 1024,
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
