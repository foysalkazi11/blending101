/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
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
import imageUploadS3 from "../../utility/imageUploadS3";
import { BLEND_CATEGORY } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { useLazyQuery } from "@apollo/client";

const EditRecipePage = () => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [uploadUrl, setUploadUrl] = useState([]);
  const [blendCategory, setblendCategory] = useState([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(null);
  const editRecipeHeading = useRef();
  const dispatch = useAppDispatch();

  const handleSubmitData = async () => {
    dispatch(setLoading(true));
    try {
      if (images?.length) {
        const res: any = await imageUploadS3(images);
        setUploadUrl(res);
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    handleSubmitData();
  }, [images]);

  const [
    getAllCategories,
    { loading: blendCategoriesInProgress, data: blendCategoriesData },
  ] = useLazyQuery(BLEND_CATEGORY, { fetchPolicy: "network-only" });

  const fetchAllBlendCategories = async () => {
    await getAllCategories();
    setblendCategory(blendCategoriesData?.getAllCategories);
    setSelectedBlendValueState(blendCategoriesData?.getAllCategories[0]?.name);
  };

  useEffect(() => {
    if (!blendCategoriesInProgress) {
      fetchAllBlendCategories();
    }
  }, [blendCategoriesInProgress]);

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
            blendCategoryList={blendCategory}
            setDropDownState={setSelectedBlendValueState}
            setImages={setImages}
            editRecipeHeading={editRecipeHeading}
          />
          <IngredientList
            blendCategory={blendCategory}
            selectedBlendValueState={selectedBlendValueState}
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
