import React, { Dispatch, SetStateAction, useRef, useEffect } from "react";
import styles from "../wikiCenter.module.scss";
import CustomSlider from "../../../../theme/carousel/carousel.component";
import Image from "next/image";
import { placeHolderImage } from "../../wikiSingleItem/WikiSingleItem";
import { CoverImageType } from "..";

interface Props {
  imagesWithinBlock?: CoverImageType[];
  setExpandAllCollapse?: Dispatch<SetStateAction<boolean>>;
}

const ImageSlider = ({
  imagesWithinBlock = [],
  setExpandAllCollapse = () => {},
}: Props) => {
  const captionRef = useRef<HTMLDivElement>(null);
  const imageSliderContainerRef = useRef<HTMLDivElement>(null);
  let timer = useRef(null);

  const findImageBlock = (id: string) => {
    if (!id) {
      return;
    }
    setExpandAllCollapse(true);

    let titleElement = null;
    timer.current = setTimeout(() => {
      titleElement = document.getElementById(id);
      titleElement?.scrollIntoView({ behavior: "smooth" });
      titleElement.style.backgroundColor = "#d2e7bc";
      // titleElement.style.backgroundColor = "";
    }, 300);
    timer.current = setTimeout(() => {
      titleElement.style.backgroundColor = "";
    }, 2500);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  return (
    <CustomSlider>
      {imagesWithinBlock?.length ? (
        imagesWithinBlock.map((img, index) => {
          return (
            <div
              key={index}
              className={styles.imageSliderContainer}
              ref={imageSliderContainerRef}
            >
              <div
                className={styles.bgBlurImage}
                style={{ backgroundImage: `url(${img.url})` }}
              ></div>

              <Image
                src={img.url}
                alt="coverImage"
                layout="fill"
                objectFit="contain"
              />
              {img?.caption && (
                <div
                  className={styles.imageCaption}
                  // style={{
                  //   top: `${
                  //     imageSliderContainerRef?.current?.getBoundingClientRect()
                  //       ?.height -
                  //     (captionRef?.current?.getBoundingClientRect()
                  //       ?.height +
                  //       32)
                  //   }px`,
                  // }}
                >
                  <p
                    className={styles.captionText}
                    ref={captionRef}
                    onClick={() => findImageBlock(img?.id)}
                  >
                    {img?.caption}
                  </p>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className={styles.imageSliderContainer}>
          <Image
            src={placeHolderImage}
            alt="coverImage"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
    </CustomSlider>
  );
};

export default ImageSlider;
