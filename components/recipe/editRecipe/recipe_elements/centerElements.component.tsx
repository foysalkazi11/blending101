/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import styles from "./centerElements.module.scss";
import MoreVertIcon from "../../../../public/icons/more_vert_black_36dp.svg";
import AddRecipeCard from "./addFiles/addRecipeCards.component";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import { setQuantity } from "../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import {
  setDescriptionRecipe,
  setEditRecipeName,
  setSelectedBlendCategory,
} from "../../../../redux/edit_recipe/editRecipeStates";
import RecipeDropDown from "../../../../theme/dropDown/recipeDropDown.component";

type CenterElementsProps = {
  recipeName?: string;
  allBlendCategories?: [];
  selectedBLendCategory?: string;
};

const Center_Elements = ({
  recipeName,
  allBlendCategories,
  selectedBLendCategory,
}: CenterElementsProps) => {
  useEffect(() => {
    if (!selectedBLendCategory) return;
    setBlendCategoryState(selectedBLendCategory);
  }, [selectedBLendCategory]);

  const dispatch = useAppDispatch();
  const editRecipeHeading = useRef();
  const [blendCategoryState, setBlendCategoryState] = useState(null);
  useEffect(() => {
    let blendCategoryId = allBlendCategories?.filter((elem) => {
      //@ts-ignore
      return elem?.name === blendCategoryState;
    });
    // @ts-ignore

    blendCategoryId && dispatch(setSelectedBlendCategory(blendCategoryId[0]?._id));
  }, [blendCategoryState]);

  //quantity number sets number for top card bottom right counter in edit recipe
  const quantity_number = useAppSelector((state) => state?.quantityAdjuster?.quantityNum);
  const recipeDescription = useAppSelector((state) => state?.editRecipeReducer?.descriptionRecipe);

  // variables for ingredients card of edit recipe
  const adjusterFunc = (task, type) => {
    if (type === "quantity_number") {
      if (quantity_number <= 0 && task === "-") {
        dispatch(setQuantity(0));
      } else {
        task === "+"
          ? dispatch(setQuantity(quantity_number + 1))
          : dispatch(setQuantity(quantity_number - 1));
      }
    }
  };

  //lists for each dropdown
  let BlendtecItem = [{ name: `Blentec` }, { name: `Blentec` }];
  let OzItem = [{ name: "64oz" }, { name: "64oz" }];

  let dropDownStyle = {
    paddingRight: "0px",
    width: "111%",
  };

  const handleDescriptionChange = (text) => {
    dispatch(setDescriptionRecipe(text));
  };

  const handleHeadingchange = (text) => {
    //@ts-ignore
    editRecipeHeading.current.textContent = text;
    dispatch(setEditRecipeName(text));
  };

  useEffect(() => {
    if (!recipeName) return;
    handleHeadingchange(recipeName);
  }, [recipeName]);

  return (
    <div className={styles.main}>
      <div className={styles.topSection}>
        <h3
          className={styles.topSection__heading}
          contentEditable
          suppressContentEditableWarning
          id="recipeTitle"
          ref={editRecipeHeading}
          onInput={(e) => {
            handleHeadingchange(e.currentTarget.textContent);
          }}
        />

        <div className={styles.topSection__RightIcon}>
          <MoreVertIcon />
        </div>
      </div>
      <div className={styles.addImagediv}>
        <AddRecipeCard />
      </div>
      <div className={styles.scoreTraydiv}>
        <div className={styles.scoreTraydiv__description}>
          <textarea
            value={recipeDescription}
            onChange={(e) => {
              handleDescriptionChange(e.target.value);
            }}
          />
        </div>
        <ScoreTray />
        <div className={styles.blendingOptions}>
          <div className={styles.blendingOptions__left}>
            <ul>
              <li>
                <div className={styles.left__options} style={{ minWidth: "125px" }}>
                  <RecipeDropDown
                    ElemList={allBlendCategories}
                    style={dropDownStyle}
                    selectedValue={blendCategoryState}
                    setSelectedValue={setBlendCategoryState}
                  />
                </div>
              </li>
              <li>
                <div className={styles.left__options} style={{ minWidth: "115px" }}>
                  <RecipeDropDown ElemList={BlendtecItem} style={dropDownStyle} />
                </div>
              </li>
              <li>
                <div className={styles.left__options} style={{ minWidth: "35px" }}>
                  <RecipeDropDown ElemList={OzItem} style={dropDownStyle} />
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.blendingOptions__right}>
            <div className={styles.blendingOptions__right__options}>
              <span className={styles.text}>{quantity_number}</span>
              <div className={styles.arrow}>
                <div className={styles.arrow_div}>
                  <Image
                    onClick={() => {
                      adjusterFunc("+", "quantity_number");
                    }}
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.reverse_arrow}
                  />
                  <Image
                    onClick={() => {
                      adjusterFunc("-", "quantity_number");
                    }}
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.original_arrow}
                  />
                </div>
              </div>
            </div>
            <span className={styles.timer_icon}>
              <Image
                src={"/icons/time-icon.svg"}
                alt="Picture will load soon"
                height={"20px"}
                width={"20px"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center_Elements;
