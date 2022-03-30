import React from "react";
import styles from "./addRecipeCards.module.scss";
import AddIcon from "../../../../../public/icons/add_black_36dp.svg";
import Image from "next/image";
import CancelIcon from "../../../../../public/icons/cancel_black_36dp.svg";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";

interface AddRecipeCardInterface {
  imageState?: object[];
  imageRenderingHandler?: any;
  removeImage?: any;
}

const AddRecipeCard = ({
  imageState,
  imageRenderingHandler,
  removeImage,
}: AddRecipeCardInterface) => {
  const handleClick = () => {
    const elem = document.getElementById("file__picker");
    elem.click();
  };

  const renderPhotos = (source) => {
    return source?.map((photo, index) => {
      return(photo ? (
        <div className={styles.image__div} key={photo.image}>
          <span
            onClick={() => {
              removeImage(index);
            }}
          >
            <CancelIcon />
          </span>
          <Image src={photo.image} alt="" layout="fill" objectFit="fill" />
        </div>
      ) : (
        <div style={{ margin: "30px 0px" }}>
          <CircularRotatingLoader />
        </div>
      ))
    });
  };

  return (
    <div className={styles.addImage}>
      <input
        onChange={imageRenderingHandler}
        hidden
        className={styles.addImage__div}
        type="file"
        name="files[]"
        id="file__picker"
        multiple
        accept="image/jpeg, image/jpg"
      />
      {renderPhotos(imageState)}
      <div className={styles.addImage__secondDiv} onClick={handleClick}>
        <AddIcon />
      </div>
    </div>
  );
};

export default AddRecipeCard;
