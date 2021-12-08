import React, { useState } from "react";
import styles from "./ContentTray.module.scss";
import Image from "next/image";
import SlickSlider from "../../carousel/carousel.component";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

// interface carouselTray {
//   heading: string;
// }
const ContentTray = (props) => {
  //uses react slick caorousel so previous buttin and next button are custom buttons made for slider

  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div
        className={className + " " + styles.customArrowLeft}
        onClick={onClick}
      >
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    const { className, onClick } = prop;
    // console.log("+++++++++++++++" + className);
    return (
      <div
        className={className + " " + styles.customArrowRight}
        onClick={onClick}
      >
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
        breakpoint: 1450,
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
    ],
  };

  return (
    <div className={styles.main__slider}>
      <h3>
        <span>
          <Image
            src={props.image}
            alt={"Icon"}
            layout={"fill"}
            objectFit={"contain"}
            quality={100}
          />
        </span>
        {props.heading}
        <div className={styles.viewAll}>View All</div>
      </h3>
      <div className={styles.sliderMainDiv}>
        <SlickSlider moreSetting={responsiveSetting}>
          {props.children}
        </SlickSlider>
      </div>
    </div>
  );
};
export default ContentTray;
