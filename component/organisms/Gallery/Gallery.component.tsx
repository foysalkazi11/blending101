import React, { useRef, useState, useEffect, useMemo } from "react";
import Slider from "react-slick";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from "./Gallery.module.scss";
import Icon from "../../atoms/Icon/Icon.component";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/pro-solid-svg-icons";
import { useQuery } from "@apollo/client";
import { useAppSelector } from "../../../redux/hooks";
import { CHALLENGE_GALLERY } from "../../../graphql/Planner";
import image from "next/image";
import { format } from "date-fns";

const Gallery = () => {
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { data } = useQuery(CHALLENGE_GALLERY, {
    variables: {
      memberId,
    },
  });

  const [state, setState] = useState({ nav1: null, nav2: null });
  const slider1 = useRef();
  const slider2 = useRef();

  useEffect(() => {
    setState({
      nav1: slider1.current,
      nav2: slider2.current,
    });
  }, []);

  const { nav1, nav2 } = state;

  const images = useMemo(() => {
    const imageData = [];
    if (data?.getAChallengeGallery) {
      data?.getAChallengeGallery?.forEach((image) => {
        image.images.forEach((img) => {
          imageData.push({
            date: image.assignDate,
            src: img,
          });
        });
      });
    }
    return imageData;
  }, [data?.getAChallengeGallery]);

  return (
    <div className={styles.container}>
      <div>
        <Slider
          asNavFor={nav2}
          ref={(slider) => (slider1.current = slider)}
          nextArrow={<MainNextArrow />}
          prevArrow={<MainPrevArrow />}
          initialSlide={0}
        >
          {images.map((item) => (
            <div
              key={item.date + item.src}
              className={styles.gallery__activeSlide}
            >
              <img src={item.src} alt={item.date} />
            </div>
          ))}
        </Slider>
      </div>
      <div className={styles.gallery__previews}>
        <Slider
          asNavFor={nav1}
          ref={(slider) => (slider2.current = slider)}
          slidesToShow={4}
          swipeToSlide={true}
          focusOnSelect={true}
          centerMode={true}
          infinite={true}
          lazyLoad="progressive"
          centerPadding="0px"
          nextArrow={<PreviewNextArrow />}
          prevArrow={<PreviewPrevArrow />}
          initialSlide={0}
          
        >
          {images.map((item) => (
            <div key={item.date + item.src} className={styles.gallery__preview}>
              <img
                className={styles.gallery__preview__img}
                src={item.src}
                alt={item.date}
              />
              <p className={styles.gallery__preview__caption}>
                {format(new Date(item.date), "EEEE, MMM dd")}
              </p>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Gallery;

function MainNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.main} ${styles["main--right"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronRight} size="2.5rem" />
    </div>
  );
}

function MainPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.main} ${styles["main--left"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronLeft} size="2.5rem" />
    </div>
  );
}

function PreviewNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles["arrow--right"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronRight} size="2.5rem" />
    </div>
  );
}

function PreviewPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} ${styles.arrow} ${styles["arrow--left"]}`}
      style={{ ...style }}
      onClick={onClick}
    >
      <Icon fontName={faChevronLeft} size="2.5rem" />
    </div>
  );
}
