import React, { useEffect, useState } from "react";
import styles from "./ContentTray.module.scss";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronRightIcon from "../../../public/icons/chevron_right_black_36dp.svg";
import ChevronLeftIcon from "../../../public/icons/chevron_left_black_36dp.svg";
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

  useEffect(() => {
    const onlyWidth = window.innerWidth;
    if (onlyWidth <= 680) {
      setSlickSetting(1);
    } else if (onlyWidth >= 780 && onlyWidth < 1250) {
      setSlickSetting(2);
    } else if (onlyWidth >= 1250 && onlyWidth < 780) {
      setSlickSetting(3);
    } else if (onlyWidth >= 1450 && onlyWidth > 1250) {
      setSlickSetting(3);
    } else if (onlyWidth >= 1850 && onlyWidth > 1450) {
      setSlickSetting(4);
    } else {
      setSlickSetting(4);
    }
  }, []);

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

            responsive: [
              {
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1850,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1700,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1150,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 680,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              // You can unslick at a given breakpoint now by adding:
              // settings: "unslick"
              // instead of a settings object
            ],
          }}
        >
          {props.children}
        </Slider>
      </div>
    </div>
  );
};
export default ContentTray;
