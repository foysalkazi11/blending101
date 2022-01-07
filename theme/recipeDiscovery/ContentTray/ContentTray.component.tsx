import React, { useEffect, useState } from "react";
import styles from "./ContentTray.module.scss";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import {useWindowWidth} from "@react-hook/window-size";
// interface carouselTray {
//   heading: string;
// }

const ContentTray = (props) => {
  //uses react slick caorousel so previous buttin and next button are custom buttons made for slider

  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    // console.log("===========>" + onClick);
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

    return (
      <div
        className={className + " " + styles.customArrowRight}
        onClick={onClick}
      >
        <ChevronRightIcon />
      </div>
    );
  };

  const [slickSetting, setSlickSetting] = useState(2);

  const onlyWidth = useWindowWidth();

  useEffect(() => {
    if (onlyWidth <= 680) {
      setSlickSetting(1);
    } else if (onlyWidth <= 780 && onlyWidth > 680) {
      setSlickSetting(2);
    } else if (onlyWidth <= 1250 && onlyWidth > 780) {
      setSlickSetting(3);
    } else if (onlyWidth <= 1450 && onlyWidth > 1250) {
      setSlickSetting(3);
    } else if (onlyWidth <= 1850 && onlyWidth > 1450) {
      setSlickSetting(4);
    } else {
      setSlickSetting(5);
    }
  }, [onlyWidth]);

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
        <Slider
          {...{
            nextArrow: <NextButton />,
            prevArrow: <PreviousButton />,
            infinite: false,
            speed: 500,
            slidesToShow: slickSetting,
            slidesToScroll: 1,
            initialSlide: 0,
          }}
        >
          {props.children}
        </Slider>
      </div>
    </div>
  );
};
export default ContentTray;