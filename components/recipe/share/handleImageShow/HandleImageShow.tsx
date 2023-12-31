import React, { Dispatch, SetStateAction, useRef, memo } from "react";
import styles from "./HandleImageShow.module.scss";
import AddIcon from "../../../../public/icons/add_black_36dp.svg";
import Image from "next/image";
import { MdClose } from "react-icons/md";
import IconWraper from "../../../../theme/iconWarper/IconWarper";
import CustomCheckbox from "../../../../theme/checkbox/CustomCheckbox";
import notification from "components/utility/reactToastifyNotification";
import useToDeleteImageFromS3 from "customHooks/image/useToDeleteImageFromS3";
import CircularRotatingLoader from "theme/loader/circularRotatingLoader.component";

interface CheckBoxProps {
  value?: string | number;
  name?: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disable?: boolean;
  id?: string;
  showCheckBox?: boolean;
  selectedImage?: string;
}

interface AddRecipeCardProps {
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  checkBoxProps?: CheckBoxProps;
}

const HandleImageShow = ({
  existingImage = [],
  setExistingImage = () => {},
  setImages = () => {},
  images = [],
  checkBoxProps = {
    checked: false,
    disable: false,
    handleChange: () => {},
    id: "",
    name: "",
    showCheckBox: false,
    value: "",
  },
}: AddRecipeCardProps) => {
  const inputRef = useRef(null);
  const { showCheckBox, selectedImage, ...rest } = checkBoxProps;
  const { deleteImage, loading: imageDeleteLoading } = useToDeleteImageFromS3();

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
    setImages((pre) => pre?.filter((value, index) => index !== index_value));
  };
  const removeExistingImage = async (image: string) => {
    try {
      await deleteImage(image);
      setExistingImage((pre) => pre?.filter((item, index) => item !== image));
    } catch (error) {
      notification("error", "Failed to remove image");
    }
  };

  return (
    <div className={styles.imageShowContainer}>
      {existingImage?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={photo}>
            {showCheckBox && (
              <div className={styles.icon}>
                <CustomCheckbox
                  style={{
                    position: "absolute",
                    top: "12px",
                    left: "3px",
                    zIndex: 1,
                  }}
                  {...rest}
                  value={photo}
                  checked={photo === selectedImage}
                />
              </div>
            )}

            <div className={styles.icon}>
              <IconWraper
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "1px",
                }}
                defaultBg="gray"
                handleClick={() => removeExistingImage(photo)}
                disabled={imageDeleteLoading}
              >
                {imageDeleteLoading ? <CircularRotatingLoader color="white" /> : <MdClose color="#f4f4f4" />}
              </IconWraper>
            </div>

            <img src={photo} alt="img" />
          </div>
        );
      })}
      {images?.map((photo, index) => {
        return (
          <div className={styles.image__div} key={index}>
            <div className={styles.icon}>
              <IconWraper
                style={{
                  position: "absolute",
                  top: "2px",
                  right: "2px",
                }}
                handleClick={() => removeImage(index)}
                hover="bgPrimary"
              >
                <MdClose color="#f4f4f4" />
              </IconWraper>
            </div>

            <Image src={URL.createObjectURL(photo)} alt="img" layout="fill" objectFit="cover" />
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

export default memo(HandleImageShow);
