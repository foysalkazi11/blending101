import React, { useState } from "react";
import styles from "./ContentTray.module.scss";
import Image from "next/image";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// interface carouselTray {
//   heading: string;
// }
const ContentTray = (props) => {
  //uses react slick caorousel so previous buttin and next button are custom buttons made for slider
  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    console.log(className);

    return (
      <div
        className={className}
        onClick={onClick}
        style={{ marginLeft: "-40px" }}
      >
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    console.log(prop);
    const { className, onClick } = prop;
    return (
      <div
        className={className}
        onClick={onClick}
        style={{ marginRight: "-40px" }}
      >
        <ChevronRightIcon />
      </div>
    );
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
      </h3>
      <div className={styles.sliderMainDiv}>
        <Slider
          initialSlide={0}
          infinite={false}
          speed={500}
          slidesToShow={2.8}
          slidesToScroll={1}
          nextArrow={<NextButton />}
          prevArrow={<PreviousButton />}
        >
          {props.children}
        </Slider>
      </div>
    </div>
  );
};
export default ContentTray;
