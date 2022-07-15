import Image from "next/image";
import React from "react";
import { BsZoomIn } from "react-icons/bs";
import styles from "./splitImage.module.scss";

interface SplitImageCardInterface {
  images: string[];
  leftImage?: string;
  rightImage?: string;
}
const SplitImageCard = ({ images }: SplitImageCardInterface) => {
  // const leftImage = leftImage || "/images/5.jpeg";
  // rightImage = rightImage || "/images/5.jpeg";
  return (
    <div className={styles.mainContainer}>
      {images.map((image) => (
        <div className={styles.mainContainer__Image} key={image}>
          <Image
            src={image || "/images/no-image.png"}
            alt={""}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
      ))}
      {/* {leftImage && (
        <div className={styles.mainContainer__Image}>
          <Image src={leftImage} alt={""} layout={"fill"} objectFit={"cover"} />
        </div>
      )}
      {rightImage && (
        <div className={styles.mainContainer__Image}>
          <Image
            src={rightImage}
            alt={""}
            layout={"fill"}
            objectFit={"cover"}
          />
        </div>
      )} */}
      <BsZoomIn className={styles.icon} />
    </div>
  );
};

export default SplitImageCard;
