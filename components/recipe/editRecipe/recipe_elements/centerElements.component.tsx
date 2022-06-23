/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./centerElements.module.scss";
import MoreVertIcon from "../../../../public/icons/more_vert_black_36dp.svg";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";
import { setQuantity } from "../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setSelectedBlendCategory } from "../../../../redux/edit_recipe/editRecipeStates";
import RecipeDropDown from "../../../../theme/dropDown/recipeDropDown.component";
import HandleImageShow from "../../share/handleImageShow/HandleImageShow";
import IconWithText from "../../recipeDetails/center/Icon/IconWithText";
import {
  setOpenVersionTray,
  setOpenVersionTrayFormWhichPage,
} from "../../../../redux/slices/versionTraySlice";
import { VscVersions } from "react-icons/vsc";
import InputComponent from "../../../../theme/input/input.component";
import TextArea from "../../../../theme/textArea/TextArea";
import { MdMoreVert } from "react-icons/md";
import IconWraper from "../../../../theme/iconWraper/IconWraper";
import useHover from "../../../utility/useHover";

type CenterElementsProps = {
  recipeName?: string;
  allBlendCategories?: [];
  selectedBLendCategory?: string;
  existingImage?: string[];
  setExistingImage?: Dispatch<SetStateAction<string[]>>;
  setImages?: Dispatch<SetStateAction<any[]>>;
  images?: any[];
  updateEditRecipe?: (key: string, value: any) => void;
};

const Center_Elements = ({
  recipeName,
  allBlendCategories,
  selectedBLendCategory,
  images = [],
  setImages = () => {},
  existingImage = [],
  setExistingImage = () => {},
  updateEditRecipe = () => {},
}: CenterElementsProps) => {
  const dispatch = useAppDispatch();
  const [blendCategoryState, setBlendCategoryState] = useState(null);
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const [openMenu, setOpenMenu] = useState(false);
  const [hoverRef, hover] = useHover();

  const quantity_number = useAppSelector(
    (state) => state?.quantityAdjuster?.quantityNum,
  );
  const recipeDescription = useAppSelector(
    (state) => state?.editRecipeReducer?.descriptionRecipe,
  );

  let BlendtecItem = [{ name: `Blentec` }, { name: `Blentec` }];
  let OzItem = [{ name: "64oz" }, { name: "64oz" }];
  let dropDownStyle = {
    paddingRight: "0px",
    width: "111%",
  };

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

  useEffect(() => {
    if (!selectedBLendCategory) return;
    setBlendCategoryState(selectedBLendCategory);
  }, [selectedBLendCategory]);

  useEffect(() => {
    let blendCategoryId = allBlendCategories?.filter((elem) => {
      //@ts-ignore
      return elem?.name === blendCategoryState;
    });

    blendCategoryId &&
      // @ts-ignore
      dispatch(setSelectedBlendCategory(blendCategoryId[0]?._id));
  }, [blendCategoryState]);

  return (
    <div className={styles.main}>
      <div className={styles.topSection}>
        <InputComponent
          borderSecondary={true}
          style={{ fontWeight: "bold", color: "#000000" }}
          value={
            detailsARecipe?.postfixTitle
              ? detailsARecipe?.postfixTitle
              : detailsARecipe?.name
          }
          name={detailsARecipe?.postfixTitle ? "postfixTitle" : "name"}
          onChange={(e) => updateEditRecipe(e?.target?.name, e?.target?.value)}
        />

        <div className={styles.reightSight} ref={hoverRef}>
          <IconWraper
            hover="bgSlightGray"
            style={{ width: "36px", height: "36px" }}
            handleClick={() => setOpenMenu((prev) => !prev)}
          >
            <MdMoreVert fontSize={24} />
          </IconWraper>
          {openMenu ? (
            <div className={`${styles.menu} `}>
              <VscVersions
                className={styles.icon}
                onClick={() => {
                  dispatch(setOpenVersionTray(true));
                  dispatch(setOpenVersionTrayFormWhichPage("edit"));
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.addImagediv}>
        <HandleImageShow
          existingImage={existingImage}
          images={images}
          setExistingImage={setExistingImage}
          setImages={setImages}
        />
      </div>
      <div className={styles.scoreTraydiv}>
        <TextArea
          name="description"
          borderSecondary={true}
          value={detailsARecipe?.description}
          onChange={(e) => updateEditRecipe(e?.target?.name, e?.target?.value)}
          style={{ color: "#484848" }}
        />

        <ScoreTray />
        <div className={styles.blendingOptions}>
          <div className={styles.blendingOptions__left}>
            <ul>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "125px" }}
                >
                  <RecipeDropDown
                    ElemList={allBlendCategories}
                    style={dropDownStyle}
                    selectedValue={blendCategoryState}
                    setSelectedValue={setBlendCategoryState}
                  />
                </div>
              </li>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "115px" }}
                >
                  <RecipeDropDown
                    ElemList={BlendtecItem}
                    style={dropDownStyle}
                  />
                </div>
              </li>
              <li>
                <div
                  className={styles.left__options}
                  style={{ minWidth: "35px" }}
                >
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
