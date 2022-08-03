import { useQuery } from "@apollo/client";
import Image from "next/image";
import React, { Fragment, useState } from "react";
import { BsZoomIn } from "react-icons/bs";
import Modal from "../../../component/molecules/Modal/Modal.component";
import Gallery from "../../../component/organisms/Gallery/Gallery.component";
import { CHALLENGE_GALLERY } from "../../../graphql/Planner";
import { useAppSelector } from "../../../redux/hooks";
import styles from "./splitImage.module.scss";

interface SplitImageCardInterface {
  images: string[];
  leftImage?: string;
  rightImage?: string;
}
const SplitImageCard = ({ images }: SplitImageCardInterface) => {
  const [showGallery, setShowGallery] = useState(false);
  return (
    <Fragment>
      <Modal
        overlayClass={styles.overlay}
        show={showGallery}
        hideModal={() => setShowGallery(false)}
      >
        <Gallery />
      </Modal>
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
        <BsZoomIn
          className={styles.icon}
          onClick={() => setShowGallery(true)}
        />
      </div>
    </Fragment>
  );
};

export default SplitImageCard;
