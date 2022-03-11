/* eslint-disable react-hooks/exhaustive-deps */
import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import styles from "./centerElements.module.scss";
import MoreVertIcon from "../../../../public/icons/more_vert_black_36dp.svg";
import AddRecipeCard from "./addFiles/addRecipeCards.component";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import { setQuantity } from "../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import DropDown from "../../../../theme/dropDown/DropDown.component";
type CenterElementsProps = {
  setImages?: Dispatch<SetStateAction<any[]>>;
  setEditRecipeHeading?: any;
  setDropDownState?: any;
  blendCategoryList: any;
  recipeTitle: string;
  mode?: "edit" | "add";
  selectedBlendValueState: any;
  recipeBlendCategoryEditMode: any;
};

const Center_Elements = ({
  setImages,
  recipeTitle,
  setEditRecipeHeading,
  setDropDownState,
  blendCategoryList,
  mode,
  selectedBlendValueState,
  recipeBlendCategoryEditMode,
}: CenterElementsProps) => {
  const dispatch = useAppDispatch();
  const editRecipeHeading = useRef();

  //quantity number sets number for top card bottom right counter in edit recipe
  const quantity_number = useAppSelector((state) => state.quantityAdjuster.quantityNum);
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
  let WholefoodItem = [];
  let dropDownDataAllFeildsArray = [];
  if (blendCategoryList) {
    blendCategoryList.map((v, i) => {
      WholefoodItem.push(v.name);
      dropDownDataAllFeildsArray.push(v);
    });
  }
  let BlendtecItem = ["Blendtec", "Blendtec"];
  let OzItem = ["64 oz", "64 oz"];
  let dropDownStyle = {
    paddingRight: "0px",
    width: "111%",
  };

  useEffect(() => {
    // @ts-ignore
    setEditRecipeHeading(editRecipeHeading?.current?.textContent);
  }, [editRecipeHeading?.current]);
  return (
    <div className={styles.main}>
      <div className={styles.topSection}>
        <h3
          className={styles.topSection__heading}
          contentEditable={true}
          id="recipeTitle"
          ref={editRecipeHeading}
          onInput={(e) => {
            setEditRecipeHeading(e.currentTarget.textContent);
          }}
        >
          {mode === "edit" && recipeTitle ? recipeTitle : "Recipe Title"}
        </h3>

        <div className={styles.topSection__RightIcon}>
          <MoreVertIcon />
        </div>
      </div>
      <div className={styles.addImagediv}>
        <AddRecipeCard setImages={setImages} />
      </div>
      <div className={styles.scoreTraydiv}>
        <ScoreTray />
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur.
        </p>
        <div className={styles.blendingOptions}>
          <div className={styles.blendingOptions__left}>
            <ul>
              <li>
                <div className={styles.left__options} style={{ minWidth: "125px" }}>
                  <DropDown
                    selectedBlendValueState={selectedBlendValueState}
                    listElem={WholefoodItem}
                    style={dropDownStyle}
                    valueState={setDropDownState}
                  />
                </div>
              </li>
              <li>
                <div className={styles.left__options} style={{ minWidth: "115px" }}>
                  <DropDown listElem={BlendtecItem} style={dropDownStyle} />
                </div>
              </li>
              <li>
                <div className={styles.left__options} style={{ minWidth: "35px" }}>
                  <DropDown listElem={OzItem} style={dropDownStyle} />
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
