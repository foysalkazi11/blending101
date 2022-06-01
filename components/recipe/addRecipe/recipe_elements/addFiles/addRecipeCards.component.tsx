import React, { Dispatch, SetStateAction, useState } from 'react';
import styles from './addRecipeCards.module.scss';
import AddIcon from '../../../../../public/icons/add_black_36dp.svg';
import Image from 'next/image';
import CancelIcon from '../../../../../public/icons/cancel_black_36dp.svg';
import { setUploadImageList } from '../../../../../redux/edit_recipe/quantity';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';
import { setLoading } from '../../../../../redux/slices/utilitySlice';
import S3_CONFIG from '../../../../../configs/s3';
import axios from 'axios';

type AddRecipeCardProps = {
  existingImage?: { default: boolean; image: string }[];
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
};

const AddRecipeCard = ({
  existingImage = [],
  setImages = () => {},
  images = [],
}: AddRecipeCardProps) => {
  const handleClick = () => {
    const elem = document.getElementById('file__picker');
    elem.click();
  };

  const imageRenderingHandler = (event) => {
    if (event.target.files) {
      setImages((pre) => [...pre, ...event.target.files]);
    }
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
          <Image
            src={URL.createObjectURL(photo)}
            alt=""
            layout="fill"
            objectFit="fill"
          />
        </div>
      );
    });
  };

  const removeImage = (index_value: number) => {
    setImages((pre) => [
      ...pre?.filter((value, index) => index !== index_value),
    ]);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginTop: '20px' }}>
      {existingImage?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={photo?.image}>
            <span
            // onClick={() => {
            //   removeImage(index);
            // }}
            >
              <CancelIcon />
            </span>
            <Image src={photo?.image} alt="" layout="fill" objectFit="fill" />
          </div>
        );
      })}
      {images?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={index}>
            <span
              onClick={() => {
                removeImage(index);
              }}
            >
              <CancelIcon />
            </span>
            <Image
              src={URL.createObjectURL(photo)}
              alt=""
              layout="fill"
              objectFit="cover"
            />
          </div>
        );
      })}

      <div className={styles.addImage}>
        <input
          onChange={imageRenderingHandler}
          hidden
          className={styles.addImage__div}
          type="file"
          name="files[]"
          id="file__picker"
          multiple
          accept="image/*"
        />

        <div className={styles.addImage__secondDiv} onClick={handleClick}>
          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default AddRecipeCard;
