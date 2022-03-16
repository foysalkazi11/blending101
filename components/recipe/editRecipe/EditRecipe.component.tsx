/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./EditRecipe.module.scss";
import Center_header from "./header/centerHeader/Center_header.component";
import RightTray from "./rightTray/rightTray.component";
import Left_tray_recipe_edit from "./leftTray/left_tray_recipe_edit.component";
import Center_Elements from "./recipe_elements/centerElements.component";
import IngredientList from "./recipe_elements/ingredientList/ingredientList&Howto.component";
import Image from "next/image";
import FooterRecipeFilter from "../../footer/footerRecipeFilter.component";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import imageUploadS3 from "../../utility/imageUploadS3";
import { BLEND_CATEGORY } from "../../../gqlLib/recipes/queries/getEditRecipe";
import { useLazyQuery } from "@apollo/client";
import { State } from "react-beautiful-dnd";

interface editRecipe {
  recipeName: string;
  allIngredients: [];
  nutritionTrayData: any;
  recipeInstructions: string[];
}

const EditRecipePage = ({
  recipeName,
  allIngredients,
  nutritionTrayData,
  recipeInstructions,
}: editRecipe) => {
  const [leftTrayVisibleState, setLeftTrayVisibleState] = useState(true);
  const [images, setImages] = useState<any[]>([]);
  const [uploadUrl, setUploadUrl] = useState([]);
  const [blendCategory, setblendCategory] = useState([]);
  const [selectedBlendValueState, setSelectedBlendValueState] = useState(null);
  const [editRecipeHeading, setEditRecipeHeading] = useState("");
  const dispatch = useAppDispatch();
  // const handleSubmitData = async () => {
  //   dispatch(setLoading(true));
  //   let res: any;
  //   try {
  //     if (images?.length) {
  //       res = await imageUploadS3(images);
  //       setUploadUrl(res);
  //     }
  //     dispatch(setLoading(false));
  //   } catch (error) {
  //     dispatch(setLoading(false));
  //   }
  //   if (res) {
  //     return res;
  //   } else console.log({ res: "something went wrong in image uploading" });
  // };

  // const [
  //   getAllCategories,
  //   { loading: blendCategoriesInProgress, data: blendCategoriesData },
  // ] = useLazyQuery(BLEND_CATEGORY, {
  //   fetchPolicy: "network-only",
  // });

  // const fetchAllBlendCategories = async () => {
  //   await getAllCategories();
  //   setblendCategory(blendCategoriesData?.getAllCategories);
  // };

  // useEffect(() => {
  //   if (!blendCategoriesInProgress) {
  //     fetchAllBlendCategories();
  //   }
  // }, [blendCategoriesInProgress]);

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
                layout="responsive"
                objectFit="contain"
              />
            </div>
            Ingredient List
          </div>
          <div className={styles.left__ingredientlistTray}>
            <Left_tray_recipe_edit allIngredients={allIngredients} />
          </div>
        </div>
        <div className={styles.center}>
          <Center_header />
          <Center_Elements
            recipeName={recipeName}

            // allBlendCategories={allBlendCategories}
            // recipeImages={recipeImages}
            // mode={mode}
            // blendCategoryList={blendCategory}
            // setDropDownState={setSelectedBlendValueState}
            // selectedBlendValueState={selectedBlendValueState}
            // setImages={setImages}
            // setEditRecipeHeading={setEditRecipeHeading}
            // recipeTitle={recipeData?.name}
            // recipeBlendCategoryEditMode={recipeData?.recipeBlendCategory?.name}
          />

          <IngredientList
            recipeInstructions={recipeInstructions}

            // recipeIngredients={recipeIngredients}
            // mode={mode}
            // howToStepsEditMode={recipeData?.recipeInstructions}
            // ingredientListEditMode={recipeData?.ingredients}
            // blendCategory={blendCategory}
            // selectedBlendValueState={selectedBlendValueState}
            // handleSubmitData={handleSubmitData}
            // uploadedImagesUrl={uploadUrl}
            // editRecipeHeading={editRecipeHeading}
          />
        </div>
        <div className={styles.right__main}>
          <RightTray nutritionTrayData={nutritionTrayData} />
        </div>
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};
export default EditRecipePage;
