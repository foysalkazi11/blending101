import React, { useEffect, useState } from "react";
import styles from "./addRecipeCards.module.scss";
import AddIcon from "../../../../../public/icons/add_black_36dp.svg";
import Image from "next/image";
import CancelIcon from "../../../../../public/icons/cancel_black_36dp.svg";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setRecipeImagesArray } from "../../../../../redux/edit_recipe/editRecipeStates";

const AddRecipeCard = () => {
  const handleClick = () => {
    const elem = document.getElementById("file__picker");
    elem.click();
  };

  const dispatch = useAppDispatch();

  const recipeImagesArray = useAppSelector((state) => state.editRecipeReducer.recipeImagesArray);
  const [imageFileArray, setImageFileArray] = useState([]);

  const imageRenderingHandler = (event) => {
    // imageArray = [...selectedImages, ...imageArray];
    let imageArraytemp = imageFileArray;
    if (event.target.files) {
      let BlobList = Array?.from(event.target.files)?.map((file: any) =>
        URL?.createObjectURL(file)
      );

      BlobList?.map((elem) => {
        imageArraytemp = [...imageArraytemp, { __typename: `blobType`, image: elem }];
      });
      setImageFileArray(imageArraytemp);
    }
    dispatch(setRecipeImagesArray(imageArraytemp));
  };

  console.log(imageFileArray);

  useEffect(() => {
    setImageFileArray(recipeImagesArray);
  }, [recipeImagesArray]);

  const renderPhotos = (source) => {
    return source?.map((photo, index) => {
      return (
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
      );
    });
  };

  const removeImage = (index_value: number) => {
    let updated_list = [...imageFileArray];
    updated_list.splice(index_value, 1);
    // dispatch(setRecipeImagesArray(updated_list));
    setImageFileArray(updated_list);
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
      {renderPhotos(imageFileArray)}
      <div className={styles.addImage__secondDiv} onClick={handleClick}>
        <AddIcon />
      </div>
    </div>
  );
};

export default AddRecipeCard;
