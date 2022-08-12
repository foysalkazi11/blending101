import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import S3_CONFIG from "../../../configs/s3";
import Checkbox from "../Forms/Checkbox.component";
import Icon from "../../atoms/Icon/Icon.component";
import styles from "./Upload.module.scss";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { removeAllImages, addImage } from "../../../redux/slices/Ui.slice";
import { faPlus, faTimes } from "@fortawesome/pro-solid-svg-icons";
import axios from "axios";

interface UploadProps {
  label?: string;
  multiple?: boolean;
  required?: boolean;
  className?: string;
  imageState: [string[], any];
  featuredState?: [string, any];
  imagesLimit?: number;
  size?: "medium" | "large";
}

const Upload = (props: UploadProps) => {
  const {
    label,
    multiple,
    required,
    className,
    imageState,
    featuredState,
    imagesLimit,
    size,
  } = props;

  const [images, setImages] = imageState;
  let featuredImage: string, setFeaturedImage: any;
  if (featuredState) {
    featuredImage = featuredState[0];
    setFeaturedImage = featuredState[1];
  }

  const [tempImages, setTempImages] = useState<string[]>([]);

  const dispatch = useAppDispatch();
  const uploadedImages = useAppSelector((state) => state.ui.images);

  useEffect(() => {
    if (
      tempImages.length > 0 &&
      uploadedImages.length > 0 &&
      tempImages.length === uploadedImages.length
    ) {
      setImages([...images, ...uploadedImages]);
      setTempImages([]);
      dispatch(removeAllImages());
    }
  }, [dispatch, images, setImages, tempImages.length, uploadedImages]);

  const addImageHandler = useCallback(
    (e: any) => {
      const files = e.target.files;
      if (files && files.length === 0) return;

      const temporaryImages: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const src = URL.createObjectURL(file);
        if (file["type"].split("/")[0] === "image") {
          temporaryImages.push(src);
        }
        temporaryImages.length > 0 &&
          setTempImages([...temporaryImages, ...tempImages]);

        const formdata = new FormData();
        for (let i = 0; i < files?.length; i++) {
          const fileName = files[i].name;

          formdata.append("images[]", files[i], fileName);
        }
        axios({
          method: "post",
          url: S3_CONFIG.baseURL,
          data: formdata,
          headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
          const resp = JSON.parse(response?.data);
          const data = resp?.images;
          dispatch(addImage({ urls: data }));
        });
      }
    },
    [dispatch, tempImages],
  );

  const onDrop = useCallback(
    (acceptedFiles) => {
      addImageHandler({ target: { files: acceptedFiles } });
    },
    [addImageHandler],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    noClick: true,
    onDrop,
  });

  let sizeClass = "";
  switch (size) {
    case "large":
      sizeClass = styles.large;
      break;
    case "medium":
      sizeClass = styles.medium;
      break;
    default:
      sizeClass = "";
      break;
  }

  return (
    <div className={className ? className : ""}>
      {label && (
        <label
          htmlFor={label}
          className={`${styles.label} ${required ? styles.required : ""}`}
        >
          {label}
        </label>
      )}
      <div
        className={`${styles["product-images"]} ${sizeClass}`}
        {...getRootProps()}
        style={{
          padding: "1rem 0",
          background: isDragActive ? "#f7f7f7" : "inherit",
        }}
      >
        {images.map((img) => (
          <figure key="img">
            <button
              type="button"
              className={styles["remove-image"]}
              onClick={(e) => {
                setImages(images.filter((image) => image !== img));
                e.stopPropagation();
              }}
            >
              <Icon fontName={faTimes} />
            </button>
            <img src={img} alt="" />
            {featuredState && (
              <Checkbox
                name={img}
                checked={img === featuredImage}
                className={styles["featured-image"]}
                onChange={(e) => setFeaturedImage(img)}
              />
            )}
          </figure>
        ))}
        {tempImages.map((img) => (
          <figure key="img">
            <button
              type="button"
              className={styles["remove-image"]}
              onClick={() => {
                setTempImages(tempImages.filter((image) => image !== img));
              }}
            >
              <Icon fontName={faTimes} />
            </button>
            <img src={img} alt="" />
            {featuredState && (
              <Checkbox
                name={img}
                checked={img === featuredImage}
                className={styles["featured-image"]}
                onChange={(e) => setFeaturedImage(img)}
              />
            )}
          </figure>
        ))}
        {
          // If multiple images are allowed and there is no limit
          ((multiple && !imagesLimit) ||
            // If the Upload component is multiple & there is limit for number of Image Upload
            (multiple &&
              imagesLimit &&
              images.length + tempImages.length < imagesLimit) ||
            // If the Upload component is not multiple & No Image is Uploaded Yet
            (!multiple && images.length + tempImages.length === 0)) && (
            <label className={styles["add-new-image"]}>
              <Icon fontName={faPlus} size="30px" />
              <input
                type="file"
                onChange={(e) => {
                  addImageHandler(e);
                  e.stopPropagation();
                }}
                style={{ display: "none" }}
                multiple
                {...getInputProps()}
              />
            </label>
          )
        }
      </div>
    </div>
  );
};

export default Upload;
