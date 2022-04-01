/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineClose } from "react-icons/md";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import ChevronRightIcon from "../../../../public/icons/chevron_right_black_36dp.svg";
import ChevronLeftIcon from "../../../../public/icons/chevron_left_black_36dp.svg";
import { MdOutlineInfo, MdAdd, MdRemove } from "react-icons/md";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/hooks";
import { setOpenCommentsTray, setToggleModal } from "../../../../redux/slices/sideTraySlice";
import Modal from "../../../../theme/modal/customModal/CustomModal";
import ShareRecipeModal from "../shareRecipeModal/ShareRecipeModal";
import SaveRecipe from "../saveRecipe/SaveRecipe";
import Image from "next/image";
import { useRouter } from "next/router";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";

const Center = ({
  recipeData,
  counter,
  setCounter,
  nutritionState,
  setNutritionState,
  singleElement,
  setsingleElement,
}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showRecipeModal, setShowRecipeModal] = useState(true);
  const recipeDetails = recipeData;
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
            {isReadMore ? <span>&nbsp; {"Read More"}</span> : <span>&nbsp; {"Read Less"}</span>}
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
          <div
            className={styles.editBox}
            onClick={() => router.push(`/edit_recipe/${recipeDetails?._id}`)}
          >
            <FiEdit2 className={styles.editIcon} />
          </div>
          <div className={styles.closeBox} onClick={() => router.push(`/`)}>
            <MdOutlineClose className={styles.closeIcon} />
          </div>
        </div>
      </div>

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>{recipeDetails?.name}</h3>
          <span className={styles.ratingBox}>
            <img src="/images/rating.svg" alt="" />
            {recipeDetails?.averageRating} ({recipeDetails?.numberOfRating})
          </span>
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>{recipeDetails?.recipeBlendCategory?.name}</div>
            <img src="/images/yummly-logo.png" alt="recipe_logo" className={styles.recipeLogo} />
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
          {recipeDetails?.image ? (
            <SlickSlider moreSetting={responsiveSetting}>
              {recipeDetails?.image.map((img, index) => {
                return (
                  <div key={index} className={styles.imageBox}>
                    <div
                      className={styles.imageBlurBox}
                      style={{
                        backgroundImage: `url(${img.image})`,
                      }}
                    />
                    {img.image && (
                      <Image src={img.image} alt="recipe_image" layout="fill" objectFit="contain" />
                    )}
                  </div>
                );
              })}
            </SlickSlider>
          ) : (
            <div style={{ margin: "30px 0px" }}>
              <CircularRotatingLoader />
            </div>
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
          <ReadMore>{recipeDetails?.description}</ReadMore>
        </div>
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
                  setCounter((pre) => (Number(pre) <= 1 ? Number(pre) : Number(pre) - 1))
                }
              >
                <MdRemove className={styles.icon} />
              </button>
              <input
                className={styles.servings}
                type="number"
                value={counter}
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
          {recipeDetails?.ingredients ? (
            recipeDetails?.ingredients?.map((ingredient, index) => {
              return (
                <div className={styles.singleIngredent} key={index + "ingredients_recipeDetails"}>
                  <div className={styles.leftSide}>
                    <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
                    <div>
                      {`${ingredient?.selectedPortion?.quantity * counter}
                      ${ingredient.selectedPortion.name} `}
                      {nutritionState &&
                      ingredient?.ingredientId?._id === nutritionState[0].ingredientId?._id &&
                      singleElement === true ? (
                        <span className={styles.leftSide__highlighted} style={{ color: "#fe5d1f" }}>
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      ) : (
                        <span className={styles.leftSide__highlighted}>
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      )}
                    </div>
                  </div>
                  {nutritionState &&
                  ingredient?.ingredientId?._id === nutritionState[0].ingredientId?._id &&
                  singleElement === true ? (
                    <div className={styles.iconGroup} style={{ display: "flex" }}>
                      <MdOutlineInfo className={styles.icon} />

                      <BiBarChart
                        style={{ color: "#fe5d1f" }}
                        className={styles.icon}
                        onClick={() => {
                          setsingleElement(!singleElement);
                          setNutritionState([ingredient]);
                        }}
                      />

                      <BsCartPlus className={styles.icon} />
                    </div>
                  ) : (
                    <div className={styles.iconGroup}>
                      <MdOutlineInfo className={styles.icon} />

                      <BiBarChart
                        className={styles.icon}
                        onClick={() => {
                          setsingleElement(true);
                          setNutritionState([ingredient]);
                        }}
                      />

                      <BsCartPlus className={styles.icon} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ margin: "30px 0px" }}>
              <CircularRotatingLoader />
            </div>
          )}
        </div>
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/chef.svg" alt="basket" />
          <h3>How to</h3>
        </div>
        {recipeDetails?.recipeInstructions ? (
          recipeDetails?.recipeInstructions?.map((step, index) => {
            return (
              <div className={styles.steps} key={index + "recipeInstruction__recipeDetails"}>
                <span>Step {index + 1}</span>
                <p>{step}</p>
              </div>
            );
          })
        ) : (
          <div style={{ margin: "30px 0px" }}>
            <CircularRotatingLoader />
          </div>
        )}
      </div>
      <Modal>{showRecipeModal ? <ShareRecipeModal /> : <SaveRecipe />}</Modal>
    </div>
  );
};

export default Center;
