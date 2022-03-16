import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./addRecipeCards.module.scss";
import AddIcon from "../../../../../public/icons/add_black_36dp.svg";
import Image from "next/image";
import CancelIcon from "../../../../../public/icons/cancel_black_36dp.svg";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { setLoading } from "../../../../../redux/slices/utilitySlice";
import S3_CONFIG from "../../../../../configs/s3";
import axios from "axios";
import {
  setRecipeBlobImagesArray,
  setRecipeImagesArray,
  setRecipeImagesArrayRaw,
} from "../../../../../redux/edit_recipe/editRecipeStates";

type AddRecipeCardProps = {
  // setImages?: Dispatch<SetStateAction<any[]>>;
};

const AddRecipeCard = () => {
  const handleClick = () => {
    const elem = document.getElementById("file__picker");
    elem.click();
  };

  const dispatch = useAppDispatch();

  const recipeBlobImagesArray = useAppSelector((state) => {
    state.editRecipeReducer.recipeBlobImagesArray;
  });

  const recipeImagesArray = useAppSelector(
    (state) => state.editRecipeReducer.recipeImagesArray
  );
  const [imageApiInitialUrl, setImageApiInitialUrl] = useState([]);
  const [imageBlobList, setImageBlobList] = useState([]);
  const [imageFileArray, setImageFileArray] = useState([]);

  // let imageArray: string[] = [];

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
    // dispatch(setRecipeBlobImagesArray(imageArray));
  };

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
