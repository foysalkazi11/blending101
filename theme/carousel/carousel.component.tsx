import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type SlickSliderProps = {
  moreSetting?: object;
  children: React.ReactNode;
};

const SlickSlider = ({ moreSetting = {}, children }: SlickSliderProps) => {
  const SmiplePrevArrow = (props) => {
    const { className, onClick } = props;

    return (
      <div onClick={onClick} className={className}>
        <ChevronLeftIcon fontSize="large" />
      </div>
    );
  };

  const SmipleNextArrow = (props) => {
    const { className, onClick } = props;

    return (
      <div onClick={onClick} className={className}>
        <ChevronRightIcon fontSize="large" />
      </div>
    );
  };

  const settings = {
    infinite: false,
    speed: 500,

    // @ts-ignore
    nextArrow: <SmipleNextArrow />,
    // @ts-ignore
    prevArrow: <SmiplePrevArrow />,
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
  return <Slider {...finalSetting}>{children}</Slider>;
};

export default SlickSlider;
