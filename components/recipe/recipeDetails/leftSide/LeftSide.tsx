/* eslint-disable @next/next/no-img-element */
import React from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import { recommendedList } from "../../fackData/recipeDetails";
import ChevronRightIcon from "../../../../public/icons/chevron_right_black_36dp.svg";
import ChevronLeftIcon from "../../../../public/icons/chevron_left_black_36dp.svg";
import styles from "./LeftSide.module.scss";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import useWindowSize from "../../../utility/useWindowSize";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";

const LeftSide = () => {
  const windowSize = useWindowSize();

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
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,

    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1250,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 980,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className={styles.header}>
        <img src="/images/telescope.svg" alt="bar icon" />
        <h3>Related</h3>
      </div>

      {recommendedList ? (
        windowSize?.width >= 1400 ? (
          recommendedList.slice(0, 4).map((cardData, index) => {
            return (
              <div key={index} style={{ paddingBottom: "10px" }}>
                {cardData ? (
                  <div key={index}>
                    <DatacardComponent
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
                  </div>
                ) : (
                  <div>
                    <CircularRotatingLoader />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <SlickSlider moreSetting={responsiveSetting}>
            {recommendedList?.map((cardData, index) => {
              return cardData ? (
                <div key={index}>
                  <DatacardComponent
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
                </div>
              ) : (
                <div>
                  <CircularRotatingLoader />
                </div>
              );
            })}
          </SlickSlider>
        )
      ) : (
        <div style={{ marginTop: "30px" }}>
          <CircularRotatingLoader />
        </div>
      )}
    </div>
  );
};

export default LeftSide;
