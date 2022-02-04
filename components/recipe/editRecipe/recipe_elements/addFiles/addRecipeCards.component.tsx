import React, { Dispatch, SetStateAction, useState } from "react";
import styles from "./addRecipeCards.module.scss";
import AddIcon from "../../../../../public/icons/add_black_36dp.svg";
import Image from "next/image";
import CancelIcon from "../../../../../public/icons/cancel_black_36dp.svg";
import { setUploadImageList } from "../../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import index from "../../../../../pages/component";

type AddRecipeCardProps = {
  setImages?: Dispatch<SetStateAction<any[]>>;
};

const AddRecipeCard = ({ setImages }: AddRecipeCardProps) => {
  const handleClick = () => {
    const elem = document.getElementById("file__picker");
    elem.click();
  };

  const dispatch = useAppDispatch();
  const selectedImages = useAppSelector(
    (state) => state.quantityAdjuster.uploadImageList
  );

  let imageArray: string[] = [];
  const imageRenderingHandler = (event) => {
    imageArray = [...selectedImages, ...imageArray];

    if (event.target.files) {
      let BlobList = Array.from(event.target.files).map((file: any) =>
        URL.createObjectURL(file)
      );
      imageArray = [...selectedImages, ...BlobList];
      setImages((pre) => [...pre, ...event.target.files]);
    }
    dispatch(setUploadImageList(imageArray));
    console.log(selectedImages);
  };

  const renderPhotos = (source) => {
    return source.map((photo, index) => {
      return (
        <div className={styles.image__div} key={photo}>
          <span
            onClick={() => {
              removeImage(index);
            }}
          >
            <CancelIcon />
          </span>
          <Image src={photo} alt="" layout="fill" objectFit="fill" />
        </div>
      );
    });
  };

  // remove image on cross

  const removeImage = (index_value: number) => {
    let updated_list = [...selectedImages];
    updated_list.splice(index_value, 1);
    dispatch(setUploadImageList(updated_list));
    setImages((pre) => [
      ...pre?.filter((value, index) => index !== index_value),
    ]);
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
        // accept="image/jpeg, image/png, image/gif"
      />
      {renderPhotos(selectedImages)}
      <div className={styles.addImage__secondDiv} onClick={handleClick}>
        <AddIcon />
      </div>
    </div>
  );
};

export default AddRecipeCard;
