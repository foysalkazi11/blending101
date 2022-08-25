import { faMagnifyingGlassPlus } from "@fortawesome/pro-regular-svg-icons";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import IconButton from "../../../component/atoms/Button/IconButton.component";
import Modal from "../../../component/molecules/Modal/Modal.component";
import Gallery from "../../../component/organisms/Gallery/Gallery.component";
import styles from "./splitImage.module.scss";

interface SplitImageCardInterface {
  date: Date;
  images: string[];
  challengeImages: any[];
}
const SplitImageCard = ({
  images,
  date,
  challengeImages,
}: SplitImageCardInterface) => {
  const [showGallery, setShowGallery] = useState(false);
  return (
    <Fragment>
      <Modal
        overlayClass={styles.overlay}
        show={showGallery}
        hideModal={() => setShowGallery(false)}
      >
        <Gallery date={date} galleries={challengeImages} />
      </Modal>
      <div className={styles.mainContainer}>
        {images?.slice(0, 2).map((image) => (
          <div className={styles.mainContainer__Image} key={image}>
            <Image
              src={image || "/images/no-image.png"}
              alt={""}
              layout={"fill"}
              objectFit={"cover"}
            />
          </div>
        ))}
        <IconButton
          variant="white"
          colorCode="#333"
          className={styles.icon}
          fontName={faMagnifyingGlassPlus}
          onClick={() => setShowGallery(true)}
        />
      </div>
    </Fragment>
  );
};

export default SplitImageCard;
