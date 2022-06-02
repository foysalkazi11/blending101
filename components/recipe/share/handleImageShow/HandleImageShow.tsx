import React, { Dispatch, SetStateAction, useRef, useState } from 'react';
import styles from './HandleImageShow.module.scss';
import AddIcon from '../../../../public/icons/add_black_36dp.svg';
import Image from 'next/image';
import { MdClose } from 'react-icons/md';
import IconWraper from '../../../../theme/iconWraper/IconWraper';

interface AddRecipeCardProps {
  existingImage?: { default: boolean; image: string }[];
  setExistingImage?: Dispatch<
    SetStateAction<{ default: boolean; image: string }[]>
  >;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
}

const HandleImageShow = ({
  existingImage = [],
  setExistingImage = () => {},
  setImages = () => {},
  images = [],
}: AddRecipeCardProps) => {
  const inputRef = useRef(null);

  const handleClick = () => {
    const elem = inputRef?.current;
    elem?.click();
  };

  const imageRenderingHandler = (event) => {
    if (event.target.files) {
      setImages((pre) => [...pre, ...event.target.files]);
    }
  };

  const removeImage = (index_value: number) => {
    setImages((pre) => [
      ...pre?.filter((value, index) => index !== index_value),
    ]);
  };
  const removeExistingImage = (image: string) => {
    setExistingImage((pre) => [
      ...pre?.filter((item, index) => item?.image !== image),
    ]);
  };

  return (
    <div className={styles.imageShowContainer}>
      {existingImage?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={photo?.image}>
            <div className={styles.icon}>
              <IconWraper
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '1px',
                }}
                handleClick={() => removeExistingImage(photo?.image)}
              >
                <MdClose color="#f4f4f4" />
              </IconWraper>
            </div>

            <Image src={photo?.image} alt="" layout="fill" objectFit="fill" />
          </div>
        );
      })}
      {images?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={index}>
            <div className={styles.icon}>
              <IconWraper
                style={{
                  position: 'absolute',
                  top: '2px',
                  right: '2px',
                }}
                handleClick={() => removeImage(index)}
              >
                <MdClose color="#f4f4f4" />
              </IconWraper>
            </div>

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
          ref={inputRef}
        />

        <div className={styles.addImage__secondDiv} onClick={handleClick}>
          <AddIcon />
        </div>
      </div>
    </div>
  );
};

export default HandleImageShow;
