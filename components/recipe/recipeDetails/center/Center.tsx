/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import SlickSlider from "../../../../theme/carousel/carousel.component";
import styles from "./Center.module.scss";
import { MdOutlineInfo } from "react-icons/md";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { useAppDispatch } from "../../../../redux/hooks";
import { setToggleModal } from "../../../../redux/slices/sideTraySlice";
import Modal from "../../../../theme/modal/customModal/CustomModal";
import ShareRecipeModal from "../../../../theme/shareRecipeModal/ShareRecipeModal";
import SaveRecipe from "../../../../theme/saveRecipeModal/SaveRecipeModal";
import Image from "next/image";
import { useRouter } from "next/router";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import useGetDefaultPortionOfnutration from "../../../../customHooks/useGetDefaultPortionOfNutration";
import PanelHeaderCenter from "../../share/panelHeader/PanelHeaderCenter";
import IconWithText from "./Icon/IconWithText";
import useForAddToCollection from "../../../../customHooks/useForAddToCollection";
import useForOpenCollectionTray from "../../../../customHooks/useForOpenCollection";
import useForOpenCommentsTray from "../../../../customHooks/useForOpenCommentsTray";
import useForSelectCommentsAndNotesIcon from "../../../../customHooks/useForSelectCommentsAndNotesIcon";
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import { setOpenVersionTray } from "../../../../redux/slices/versionTraySlice";

const scaleMenu = [
  { label: ".5x", value: 0.5 },
  { label: "1x", value: 1 },
  { label: "2x", value: 2 },
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
  const [showCollectionModal, setShowCollectionModal] = useState(true);
  const [ingredientId, setIngredientId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  useGetDefaultPortionOfnutration(ingredientId);
  const handleAddToCollection = useForAddToCollection();
  const handleOpenCollectionTray = useForOpenCollectionTray();
  const handleOpenCommentsTray = useForOpenCommentsTray();
  const handleSelectCommentsAndNotesIcon = useForSelectCommentsAndNotesIcon();
  const [recipeDetails, setRecipeDetails] = useLocalStorage(
    "recipeDetails",
    {},
  );

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

  const addToCollection = (id: string, e: React.SyntheticEvent) => {
    setShowCollectionModal(true);
    handleAddToCollection(id, setOpenModal, e, setRecipeDetails);
  };

  const hangleShowCommentsAndNotesIcon = () => {
    const notes = recipeData?.notes;
    const comments = recipeData?.numberOfRating;
    const title = recipeData?.name;
    const recipeId = recipeData?._id;
    const defaultImage = recipeData?.image?.find((img) => img?.default)?.image;
    const commentsAndNotes = handleSelectCommentsAndNotesIcon(comments, notes);
    return (
      <IconWithText
        wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
        handleClick={(e) =>
          handleOpenCommentsTray(recipeId, title, defaultImage, e)
        }
        icon={`/icons/${commentsAndNotes?.icon}.svg`}
        text={commentsAndNotes?.amount}
        textStyle={{ color: commentsAndNotes?.amount ? "#7cbc39" : "#c4c4c4" }}
      />
    );
  };

  return (
    <div style={{ width: "100%" }}>
      <PanelHeaderCenter
        backLink="/"
        editOrSavebtnFunc={() => router.push(`/edit_recipe/${recipeData?._id}`)}
        editOrSavebtnText="Edit"
      />

      <div className={styles.contentBox}>
        <div className={styles.heading}>
          <h3>{recipeData?.name}</h3>
          <span className={styles.ratingBox}>
            <img src="/images/rating.svg" alt="" />
            {recipeData?.averageRating} ({recipeData?.numberOfRating})
          </span>
        </div>
        <div className={styles.subMenu}>
          <div className={styles.alignItems}>
            <div className={styles.recipeType}>
              {recipeData?.recipeBlendCategory?.name}
            </div>
            <img
              src="/images/yummly-logo.png"
              alt="recipe_logo"
              className={styles.recipeLogo}
            />
          </div>

          <div className={styles.alignItems}>
            <IconWithText
              wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
              handleClick={() => dispatch(setOpenVersionTray(true))}
              icon="/icons/Versions.svg"
              text="Versions"
            />
            <IconWithText
              wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
              handleClick={() => {}}
              icon="/images/calendar-alt-light.svg"
              text="Planner"
            />

            <IconWithText
              wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
              handleClick={(e) =>
                recipeData?.userCollections?.length
                  ? handleOpenCollectionTray(
                      recipeData?._id,
                      recipeData?.userCollections,
                      e,
                    )
                  : addToCollection(recipeData?._id, e)
              }
              icon={
                recipeData?.userCollections?.length
                  ? "/icons/compare.svg"
                  : "/images/BookmarksStar.svg" //"/images/BookmarksStar-orange.svg"
              }
              text="Saved"
            />

            <IconWithText
              wraperStyle={{ marginRight: "16px", cursor: "pointer" }}
              handleClick={() => {
                setShowCollectionModal(true);
                dispatch(setToggleModal(true));
              }}
              icon="/images/share-alt-light-grey.svg"
              text="Share"
            />

            {hangleShowCommentsAndNotesIcon()}
          </div>
        </div>

        <div className={styles.sliderBox}>
          {recipeData?.image ? (
            <SlickSlider>
              {recipeData?.image.map((img, index) => {
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
          <ReadMore>{recipeData?.description}</ReadMore>
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
          </div>
          <div className={styles.size}>
            <p>Volume : </p>
            <span>
              {Math.round(parseInt(recipeData?.servingSize) * counter)} 0z
            </span>
          </div>
          <div className={styles.usMatric}>
            <span>US</span>
            <p>| Metric</p>
          </div>
        </div>
        <div className={styles.ingredentDisContainer}>
          {recipeData?.ingredients ? (
            recipeData?.ingredients?.map((ingredient, index) => {
              return (
                <div
                  className={styles.singleIngredent}
                  key={index + "ingredients_recipeDetails"}
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
                          style={{ color: "#fe5d1f" }}
                          onClick={() => {
                            window.scrollBy(0, 0);
                            setNutritionState({});
                          }}
                        >
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      ) : (
                        <span
                          className={styles.leftSide__highlighted}
                          onClick={() => {
                            window.scrollBy(0, 0);
                            setNutritionState(ingredient);
                          }}
                        >
                          {ingredient?.ingredientId?.ingredientName}
                        </span>
                      )}
                    </div>
                  </div>
                  {ingredient?.ingredientId?._id ===
                  nutritionState?.ingredientId?._id ? (
                    <div
                      className={styles.iconGroup}
                      style={{ display: "flex" }}
                    >
                      <MdOutlineInfo
                        className={styles.icon}
                        onClick={() =>
                          setIngredientId(ingredient?.ingredientId?._id)
                        }
                      />

                      <BiBarChart
                        style={{ color: "#fe5d1f" }}
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
                          window.scrollBy(0, 0);
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
        {recipeData?.recipeInstructions ? (
          recipeData?.recipeInstructions?.map((step, index) => {
            return (
              <div
                className={styles.steps}
                key={index + "recipeInstruction__recipeDetails"}
              >
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
      <Modal open={openModal} setOpen={setOpenModal}>
        {showCollectionModal ? <SaveRecipe /> : <ShareRecipeModal />}
      </Modal>
    </div>
  );
};

export default Center;
