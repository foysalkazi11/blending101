/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import { FiEdit2 } from 'react-icons/fi';
import { MdOutlineClose } from 'react-icons/md';
import SlickSlider from '../../../../theme/carousel/carousel.component';
import styles from './Center.module.scss';
import ChevronRightIcon from '../../../../public/icons/chevron_right_black_36dp.svg';
import ChevronLeftIcon from '../../../../public/icons/chevron_left_black_36dp.svg';
import { MdOutlineInfo, MdAdd, MdRemove } from 'react-icons/md';
import { BiBarChart } from 'react-icons/bi';
import { BsCartPlus } from 'react-icons/bs';
import { useAppDispatch } from '../../../../redux/hooks';
import {
  setOpenCollectionsTary,
  setOpenCommentsTray,
  setToggleModal,
} from '../../../../redux/slices/sideTraySlice';
import Modal from '../../../../theme/modal/customModal/CustomModal';
import ShareRecipeModal from '../shareRecipeModal/ShareRecipeModal';
import SaveRecipe from '../saveRecipe/SaveRecipe';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CircularRotatingLoader from '../../../../theme/loader/circularRotatingLoader.component';
import useGetDefaultPortionOfnutration from '../../../../customHooks/useGetDefaultPortionOfNutration';
import { setActiveRecipeId } from '../../../../redux/slices/collectionSlice';
import { setCurrentRecipeInfo } from '../../../../redux/slices/recipeSlice';
import ToggleMenu from '../../../../theme/toggleMenu/ToggleMenu';

const scaleMenu = [
  { label: '.5x', value: 0.5 },
  { label: '1x', value: 1 },
  { label: '2x', value: 2 },
];

interface center {
  recipeData: any;
  counter: any;
  setCounter: any;
  nutritionState: any;
  setNutritionState: any;
  singleElement: any;
  setsingleElement: any;
}

const Center = ({
  recipeData,
  counter,
  setCounter,
  nutritionState,
  setNutritionState,
  singleElement,
  setsingleElement,
}: center) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showRecipeModal, setShowRecipeModal] = useState(true);
  const [ingredientId, setIngredientId] = useState('');
  const recipeDetails = recipeData;
  useGetDefaultPortionOfnutration(ingredientId);

  const PreviousButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + ' ' + styles.prevBtn} onClick={onClick}>
        <ChevronLeftIcon />
      </div>
    );
  };
  const NextButton = (prop) => {
    const { className, onClick } = prop;
    return (
      <div className={className + ' ' + styles.nextBtn} onClick={onClick}>
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
              <span>&nbsp; {'Read More'}</span>
            ) : (
              <span>&nbsp; {'Read Less'}</span>
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

  const handleComment = (
    id: string,
    title: string,
    image: string,
    e: React.SyntheticEvent,
  ) => {
    // HANDLE COMMENTS CLICK HERE
    e?.stopPropagation();
    dispatch(setActiveRecipeId(id));
    dispatch(setOpenCommentsTray(true));
    dispatch(setCurrentRecipeInfo({ name: title, image }));
    dispatch(setOpenCollectionsTary(false));
  };

  const hangleShowCommentsAndNotesIcon = () => {
    const notes = recipeData?.notes;
    const comments = recipeData?.numberOfRating;
    const title = recipeData?.name;
    const recipeId = recipeData?._id;
    const defaultImage = recipeData?.image?.find((img) => img?.default)?.image;

    if (!comments && !notes) {
      return (
        <>
          <img
            src="/icons/no-comment.svg"
            alt="message"
            onClick={(e) => handleComment(recipeId, title, defaultImage, e)}
          />{' '}
          <p style={{ color: '#c4c4c4' }}>0</p>
        </>
      );
    }
    if (!comments) {
      return (
        <>
          <img
            src="/icons/message.svg"
            alt="message"
            onClick={(e) => handleComment(recipeId, title, defaultImage, e)}
            className={`${styles.inActiveImg}`}
          />{' '}
          <p>{''}</p>
        </>
      );
    }

    return (
      <>
        <img
          src="/icons/message.svg"
          alt="message"
          onClick={(e) => handleComment(recipeId, title, defaultImage, e)}
        />{' '}
        {comments ? <p style={{ color: '#7cbc39' }}>{comments}</p> : null}
      </>
    );
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
            <div className={styles.recipeType}>
              {recipeDetails?.recipeBlendCategory?.name}
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

            <div className={styles.iconWithText}>
              {hangleShowCommentsAndNotesIcon()}
            </div>
          </div>
        </div>

        <div className={styles.sliderBox}>
          {recipeDetails?.image ? (
            <SlickSlider moreSetting={responsiveSetting}>
              {recipeDetails?.image.map((img, index) => {
                return (
                  <div key={index} className={styles.imageBox}>
                    {img?.image && (
                      <div
                        className={styles.imageBlurBox}
                        style={{
                          backgroundImage: `url(${img.image})`,
                        }}
                      />
                    )}
                    <Image
                      src={img.image}
                      alt="recipe_image"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                );
              })}
            </SlickSlider>
          ) : (
            <div className={styles.imageBox__loader}>
              <CircularRotatingLoader />
            </div>
          )}
        </div>
        <div>
          <ReadMore>{recipeDetails?.description}</ReadMore>
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
      </div>
      <div className={styles.ingredentContainer}>
        <div className={styles.ingredentHeader}>
          <img src="/images/basket.svg" alt="basket" />
          <h3>Ingredients</h3>
        </div>
        <div className={styles.counterBox}>
          <div className={styles.counter}>
            <p>Scaling : </p>

            <div className={styles.tab}>
              {scaleMenu?.map((item, index) => {
                return (
                  <div
                    key={item?.value}
                    className={`${styles.menu} ${
                      counter === item?.value ? styles.active : null
                    }`}
                    onClick={() => setCounter(item?.value)}
                  >
                    {item?.label}
                  </div>
                );
              })}
            </div>

            {/* <button
                onClick={() => adjusterFunc(counter < 0 ? 0 : counter - 1)}
              >
                <MdRemove className={styles.icon} />
              </button> */}
            {/* <button
                onClick={() => adjusterFunc(counter < 0 ? 0 : counter - 1)}
              >
                <MdRemove className={styles.icon} />
              </button> */}

            {/* <p>{counter}</p> */}

            {/* <input
                className={styles.servings}
                type="number"
                value={counter}
                onChange={(e) => inputTagValueHandler(e)}
                min={1}
              /> */}
            {/* <button
                onClick={() => adjusterFunc(counter === 0.5 ? 1 : counter + 1)}
              >
                <MdAdd className={styles.icon} />
              </button> */}
          </div>
          <div className={styles.size}>
            <p>serving Size : </p>
            <span>{Math.round(16 * counter)} 0z</span>
          </div>
          <div className={styles.usMatric}>
            <span>US</span>
            <p>| Metric</p>
          </div>
        </div>
        <div className={styles.ingredentDisContainer}>
          {recipeDetails?.ingredients ? (
            recipeDetails?.ingredients?.map((ingredient, index) => {
              return (
                <div
                  className={styles.singleIngredent}
                  key={index + 'ingredients_recipeDetails'}
                >
                  <div className={styles.leftSide}>
                    {ingredient?.ingredientId?.featuredImage ||
                    ingredient?.ingredientId?.images?.length ? (
                      <img
                        src={
                          ingredient?.ingredientId?.featuredImage ||
                          ingredient?.ingredientId?.images[0]
                        }
                        alt="icon"
                      />
                    ) : (
                      <img src="/images/5-2-avocado-png-hd.png" alt="icon" />
                    )}

                    <div>
                      {`${ingredient?.selectedPortion?.quantity * counter}
                      ${ingredient.selectedPortion.name} `}
                      {ingredient?.ingredientId?._id ===
                      nutritionState?.ingredientId?._id ? (
                        <span
                          className={styles.leftSide__highlighted}
                          style={{ color: '#fe5d1f' }}
                        >
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      ) : (
                        <span className={styles.leftSide__highlighted}>
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      )}
                    </div>
                  </div>
                  {ingredient?.ingredientId?._id ===
                  nutritionState?.ingredientId?._id ? (
                    <div
                      className={styles.iconGroup}
                      style={{ display: 'flex' }}
                    >
                      <MdOutlineInfo
                        className={styles.icon}
                        onClick={() =>
                          setIngredientId(ingredient?.ingredientId?._id)
                        }
                      />

                      <BiBarChart
                        style={{ color: '#fe5d1f' }}
                        className={styles.icon}
                        onClick={() => {
                          setsingleElement(!singleElement);
                          setNutritionState({});
                        }}
                      />
                      <BsCartPlus className={styles.icon} />
                    </div>
                  ) : (
                    <div className={styles.iconGroup}>
                      <MdOutlineInfo
                        className={styles.icon}
                        onClick={() =>
                          setIngredientId(ingredient?.ingredientId?._id)
                        }
                      />

                      <BiBarChart
                        className={styles.icon}
                        onClick={() => {
                          window.scrollTo(0, 0);
                          setsingleElement(true);
                          setNutritionState(ingredient);
                        }}
                      />

                      <BsCartPlus className={styles.icon} />
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ margin: '30px 0px' }}>
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
              <div
                className={styles.steps}
                key={index + 'recipeInstruction__recipeDetails'}
              >
                <span>Step {index + 1}</span>
                <p>{step}</p>
              </div>
            );
          })
        ) : (
          <div style={{ margin: '30px 0px' }}>
            <CircularRotatingLoader />
          </div>
        )}
      </div>
      <Modal>{showRecipeModal ? <ShareRecipeModal /> : <SaveRecipe />}</Modal>
    </div>
  );
};

export default Center;
