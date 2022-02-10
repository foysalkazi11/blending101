import React, { useRef, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./EditRecipe.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import RightTray from "./rightTray/rightTray.component";
import Left_tray_recipe_edit from "./leftTray/left_tray_recipe_edit.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import Image from "next/image";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import { useAppDispatch } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import S3_CONFIG from "../../../configs/s3";
import axios from "axios";
import imageUploadS3 from "../../utility/imageUploadS3";

const EditRecipePage = () => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [uploadUrl, setUploadUrl] = useState([]);
  const editRecipeHeading = useRef();
  const dispatch = useAppDispatch();

  const handleSubmitData = async () => {
    dispatch(setLoading(true));
    try {
      if (images?.length) {
        // let pngFreeArray = images;
        // console.log(images);
        // pngFreeArray = images.filter((item) => item.name.includes(".png")===false);
        // setImages(pngFreeArray);
        // console.log(pngFreeArray);
        const res: any = await imageUploadS3(images);
        setUploadUrl(res);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };
  return (
    <AContainer>
      <div className={styles.main}>
        <div
          className={styles.left}
          style={leftTrayVisibleState ? { marginLeft: "0px" } : {}}
        >
          <div
            className={styles.left__Drag__lightGreen}
            style={
              leftTrayVisibleState
                ? {
                    backgroundImage: `url("/icons/ingr-green.svg")`,
                    backgroundSize: "contain",
                  }
                : {
                    backgroundImage: `url("/icons/ingr-white.svg")`,
                    backgroundSize: "contain",
                  }
            }
            onClick={() => setLeftTrayVisibleState(!leftTrayVisibleState)}
          >
            <div>
              {/* left basket drag button, images are used as backgound images for this div in scss files */}
            </div>
          </div>
          <div className={styles.left__title}>
            <div className={styles.left__title__bagicon}>
              <Image
                src={"/icons/basket.svg"}
                alt="Picture will load soon"
                height={"100%"}
                width={"100%"}
                // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                layout="responsive"
                objectFit="contain"
              />
            </div>
            Ingredient List
          </div>
          <div className={styles.left__ingredientlistTray}>
            <Left_tray_recipe_edit />
          </div>
        </div>
        <div className={styles.center}>
          <Center_header />
          <Center_Elements
            setImages={setImages}
            editRecipeHeading={editRecipeHeading}
          />
          <IngredientList
            handleSubmitData={handleSubmitData}
            uploadedImagesUrl={uploadUrl}
            editRecipeHeading={editRecipeHeading}
          />
        </div>
        <div className={styles.right__main}>
          <RightTray />
        </div>
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
