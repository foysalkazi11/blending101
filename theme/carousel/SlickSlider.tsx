import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "../../public/icons/chevron_left_black_36dp.svg";
import ChevronRightIcon from "../../public/icons/chevron_right_black_36dp.svg";

type SlickSliderProps = {
  moreSetting?: object;
  children: React.ReactNode;
  nextArrow?: React.ReactNode;
  prevArrow?: React.ReactNode;
};
export const SmiplePrevArrow = (props) => {
  return (
    <div {...props}>
      <ChevronLeftIcon />
    </div>
  );
};

export const SmipleNextArrow = (props) => {
  return (
    <div {...props}>
      <ChevronRightIcon />
    </div>
  );
};

const CustomSlider = ({ moreSetting = {}, children, nextArrow, prevArrow }: SlickSliderProps, ref) => {
  const settings = {
    infinite: false,
    speed: 500,
    swipeToSlide: true,

    nextArrow: nextArrow || <SmipleNextArrow />,

    prevArrow: prevArrow || <SmiplePrevArrow />,
  };

  // responsive setting exemple

  // const responsiveSetting = {
  //   slidesToShow: 7,
  //   slidesToScroll: 1,
  //   responsive: [
  //     {
  //       breakpoint: 1450,
  //       settings: {
  //         slidesToShow: 6,
  //         slidesToScroll: 1,
  //       },
  //     },
  //     {
  //       breakpoint: 1250,
  //       settings: {
  //         slidesToShow: 5,
  //         slidesToScroll: 1,
  //       },
  //     },

  //   ],
  // };

  const finalSetting = {
    ...settings,
    ...moreSetting,
  };
  return (
    <Slider {...finalSetting} ref={ref}>
      {children}
    </Slider>
  );
};

export default React.forwardRef(CustomSlider);
