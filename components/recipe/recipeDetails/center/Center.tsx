/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import ChevronRightIcon from "../../../../public/icons/chevron_right_black_36dp.svg";
import ChevronLeftIcon from "../../../../public/icons/chevron_left_black_36dp.svg";
import { MdOutlineInfo, MdAdd, MdRemove } from "react-icons/md";
import DropDown from "../../../../theme/dropDown/DropDown.component";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/hooks";
import {
  setOpenCommentsTray,
  setToggleModal,
} from "../../../../redux/slices/sideTraySlice";
import Modal from "../../../../theme/modal/Modal";
import ShareRecipeModal from "../shareRecipeModal/ShareRecipeModal";
import SaveRecipe from "../saveRecipe/SaveRecipe";
import Image from "next/image";

const Center = ( recipeData ) => {
  const [counter, setCounter] = useState(1);
  const dispatch = useAppDispatch();
  const [showRecipeModal, setShowRecipeModal] = useState(true);
  const recipeDetails =recipeData && recipeData;

  const openCommentsTray = () => {
    dispatch(setOpenCommentsTray(true));
  };
  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + " " + styles.prevBtn} onClick={onClick}>
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + " " + styles.nextBtn} onClick={onClick}>
        <ChevronRightIcon />
      </div>
    );
  };

  const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    if (text?.length > 300) {
      return (
        <p className={styles.text}>
          {isReadMore ? text.slice(0, 300) : text},
          <span onClick={toggleReadMore} className={styles.read_or_hide}>
            {isReadMore ? (
              <span>&nbsp; {"Read More"}</span>
            ) : (
              <span>&nbsp; {"Read Less"}</span>
            )}
          </span>
        </p>
      );
    } else {
      return <p className={styles.text}>{text}</p>;
    }
  };

  const responsiveSetting = {
    nextArrow: <NextButton />,
    prevArrow: <PreviousButton />,
  };


  return (
    <div>
      <div className={styles.header}>
        <div className={styles.alignItems}>
          <img src="/images/recipe-icon.svg" alt="recipe icon" />
          <h3>Recipe</h3>
        </div>
        <div className={styles.alignItems}>
          <div className={styles.editBox}>
            <FiEdit2 className={styles.editIcon} />
          </div>
          <div className={styles.closeBox}>
            <MdOutlineClose className={styles.closeIcon} />
          </div>
        </div>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>{recipeDetails?.recipeData?.name}</h3>
          <span className={styles.ratingBox}>
            <img src="/images/rating.svg" alt="" />
            {recipeDetails?.recipeData?.averageRating} ({recipeDetails?.recipeData?.numberOfRating})
          </span>
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>
              {recipeDetails?.recipeData?.recipeBlendCategory?.name}
            </div>
            <img
              src="/images/yummly-logo.png"
              alt="recipe_logo"
              className={styles.recipeLogo}
            />
          </div>
          <div className={styles.alignItems}>
            <div className={styles.iconWithText}>
              <img src="/images/calendar-alt-light.svg" alt="calender" />
              <p>Planner</p>
            </div>

            <div
              className={styles.iconWithText}
              onClick={() => {
                setShowRecipeModal(false);
                dispatch(setToggleModal(true));
              }}
            >
              <img src="/images/BookmarksStar-orange.svg" alt="saved" />
              <p>Saved</p>
            </div>
            <div
              className={styles.iconWithText}
              onClick={() => {
                setShowRecipeModal(true);
                dispatch(setToggleModal(true));
              }}
            >
              <img src="/images/share-alt-light-grey.svg" alt="share" />
              <p>Share</p>
            </div>
            <div className={styles.iconWithText} onClick={openCommentsTray}>
              <img src="/icons/comment.svg" alt="comment" />
              <p style={{ color: "#7cbc39" }}>21</p>
            </div>
          </div>
        </div>

        <div className={styles.sliderBox}>
          {recipeDetails?.recipeData?.image && (
            <SlickSlider moreSetting={responsiveSetting}>
              {recipeDetails?.recipeData?.image.map((img, index) => {
                return (
                  <div key={index} className={styles.imageBox}>
                    <Image
                      src={img.image}
                      alt="recipe_image"
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                );
              })}
            </SlickSlider>
          )}
        </div>

        <div className={styles.infoContainer}>
          <div className={styles.infoBox}>
            <span>45</span>
            <p>Net Carbs</p>
          </div>
          <div className={styles.infoBox}>
            <span>16</span>
            <p>Glycemic Load</p>
          </div>
          <div className={styles.infoBox}>
            <MdOutlineInfo className={styles.infoIcon} />
            <span>805</span>
            <p>Rx Score</p>
          </div>
        </div>

        <div>
          <ReadMore>{recipeDetails?.recipeData?.description}</ReadMore>
        </div>

        {/* <div className={styles.dropDownContainer}>
          <div style={{ flex: 1 }}>
            <DropDown
              listElem={BlendtecItem}
              style={{ backgroundColor: "#fafbf9" }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <DropDown
              listElem={ozItem}
              style={{ backgroundColor: "#fafbf9" }}
            />
          </div>
          <div style={{ flex: 1 }} className={styles.timeBox}>
            <img src="/images/time-icon.svg" alt="time-icon" />
            <p>
              Prep: <span>{recipeDetails?.recipeData?.prepTime}</span>
            </p>
          </div>
        </div> */}
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/basket.svg" alt="basket" />
          <h3>Ingredients</h3>
        </div>
        <div className={styles.counterBox}>
          <div className={styles.counter}>
            <p>Servings : </p>
            <div className={styles.count}>
              <button
                onClick={() =>
                  setCounter((pre) =>
                    Number(pre) <= 1 ? Number(pre) : Number(pre) - 1
                  )
                }
              >
                <MdRemove className={styles.icon} />
              </button>
              <input
                className={styles.servings}
                type="number"
                value={counter}
                //@ts-ignore
                onChange={(e) => setCounter(e?.target?.value)}
                min={1}
              />
              <button onClick={() => setCounter((pre) => Number(pre) + 1)}>
                <MdAdd className={styles.icon} />
              </button>
            </div>
          </div>
          <div className={styles.size}>
            <p>serving Size : </p>
            <span>16 0z</span>
          </div>
          <div className={styles.usMatric}>
            <span>US</span>
            <p>| Matric</p>
          </div>
        </div>
        <div className={styles.ingredentDisContainer}>
          {recipeDetails?.recipeData?.ingredients &&
            recipeDetails?.recipeData?.ingredients?.map((ingredient, index) => {
              return (
                <div
                  className={styles.singleIngredent}
                  key={index + "ingredients_recipeDetails"}
                >
                  <div className={styles.leftSide}>
                    <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
                    <p>{`${ingredient.selectedPortion.quantity} ${ingredient.selectedPortion.name}`}</p>
                  </div>
                  <div className={styles.iconGroup}>
                    <MdOutlineInfo className={styles.icon} />
                    <BiBarChart className={styles.icon} />
                    <BsCartPlus className={styles.icon} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/chef.svg" alt="basket" />
          <h3>How to</h3>
        </div>
        {recipeDetails?.recipeData?.recipeInstructions &&
          recipeDetails?.recipeData?.recipeInstructions?.map((step, index) => {
            return (
              <div
                className={styles.steps}
                key={index + "recipeInstruction__recipeDetails"}
              >
                <span>Step {index + 1}</span>
                <p>{step}</p>
              </div>
            );
          })}
      </div>
      <Modal contentStyle={{ borderRadius: "29px" }}>
        {showRecipeModal ? <ShareRecipeModal /> : <SaveRecipe />}
      </Modal>
    </div>
  );
};

export default Center;
