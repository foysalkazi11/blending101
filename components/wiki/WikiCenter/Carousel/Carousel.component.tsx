// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
import React, { useState } from "react";
import styles from "./Carousel.module.scss";
import Image from "next/image";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";
import NavigateNextOutlinedIcon from "@mui/icons-material/NavigateNextOutlined";
import NavigateBeforeOutlinedIcon from "@mui/icons-material/NavigateBeforeOutlined";

function CarouselComponent() {
  const images = [
    { Image: "https://source.unsplash.com/1600x900/?salad" },
    { Image: "https://source.unsplash.com/1600x900/?salad" },
    { Image: "https://source.unsplash.com/1600x900/?salad" },
  ];

  const [currentState, nextState] = useState(0);
  const length = images.length;

  const goLeft = () => {
    nextState(currentState === 0 ? 0 : currentState - 1);
    console.log(currentState);
  };
  const goRight = () => {
    nextState(currentState === length - 1 ? currentState : currentState + 1);
    console.log(currentState);
  };

  if (!Array.isArray(images || images.length <= 0)) {
    return null;
  }
  return (
    <section className={styles.carouselSection}>
      <NavigateBeforeOutlinedIcon
        className={
          currentState === 0 ? styles.LeftArrowHidden : styles.LeftArrow
        }
        onClick={goLeft}
      />
      <NavigateNextOutlinedIcon
        className={
          currentState === length - 1
            ? styles.RightArrowHidden
            : styles.RightArrow
        }
        onClick={goRight}
      />
      {images.map((imageurl, index) => {
        {
          return (
            <div
              className={
                index === currentState ? styles.carousel : styles.carouselActive
              }
              key={index}
            >
              <Image
                src={imageurl.Image}
                alt="Picture will load soon"
                height={"100%"}
                width={"100%"}
                // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                layout="responsive"
                objectFit="cover"
                className={styles.image}
              />
            </div>
          );
        }
      })}
    </section>
  );
}

export default CarouselComponent;
