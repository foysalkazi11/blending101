import React, { Children, useRef } from "react";
import { useRouter } from "next/router";
import styles from "./RecipeCard.module.scss";
import { slicedString } from "../../../services/string.service";

interface RecipeProps {
  title?: string;
  ingredients?: string;
  category?: string;
  ratings?: number;
  noOfRatings?: number;
  carbs?: number;
  score?: number;
  calorie?: number;
  noOfComments?: number;
  image?: string;
  recipeId?: string;
  notes?: number;
  className?: string;

  // addedToCompare?: boolean;
  // compareRecipeList?: any[];
  // setcompareRecipeList?: (state: any) => void;
  // showMoreMenu?: boolean;
  // showOptionalEditIcon?: boolean;
  // changeToFormulateRecipe?: () => void;
  // isCollectionIds?: string[] | null;
  // setOpenCollectionModal?: Dispatch<SetStateAction<boolean>>;
}

const RecipeCard: React.FC<RecipeProps> = (props) => {
  const {
    title,
    ingredients,
    category,
    ratings,
    noOfRatings,
    carbs,
    score,
    calorie,
    noOfComments,
    image,
    recipeId,
    notes,
    children,
    className,
  } = props;
  const menu = useRef<any>();
  const router = useRouter();

  const handleClick = () => {
    const elem = menu.current;
    elem.classList.toggle("show__hidden");
  };

  return (
    <div className={`${styles.datacard} ${className}`}>
      <div>
        <div>
          <div className={styles.datacard__body__top}>
            <div>
              <h2
                className={styles.title}
                onClick={() => router.push(`/recipe_details/${recipeId}`)}
              >
                {title}
              </h2>
            </div>
            <div className={styles.datacard__body__top__menu}>
              {/* {showMoreMenu ? (
                <>
                  <MoreVertIcon onClick={handleClick} />
                  <FloatingMenu />
                </>
              ) : null} */}
            </div>
          </div>
          <div className={styles.datacard__body__middle}>
            <div className={styles.datacard__body__middle__left}>
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${image})` }}
              />
            </div>
            <div className={styles.datacard__body__middle__right}>
              <div>
                <div className={styles.databody__top}>
                  <div className={styles.databody__top__label}>
                    <div className={styles.category}>{category}</div>
                    {/* {showOptionalEditIcon ? <FloatingMenu2 /> : false} */}
                  </div>
                  <div className={styles.databody__top__info}>
                    {noOfRatings ? (
                      <>
                        <img src="/icons/star.svg" alt="star" />
                        <span>{ratings}</span>&nbsp;
                        <span>({noOfRatings})</span>
                      </>
                    ) : null}
                  </div>
                </div>
                <div className={styles.databody__bottom}>
                  <p>{slicedString(ingredients, 0, 12)}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.datacard__body__belt}>
            <div className={styles.datacard__body__belt__child}>
              Net Carbs <span>{carbs}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Rx Score <span>{score}</span>
            </div>
            <div className={styles.datacard__body__belt__child}>
              Calorie <span>{calorie}</span>
            </div>
          </div>
          <div className={styles.datacard__body__bottom}>
            <div className={styles.datacard__body__bottom__left}>
              <img src="/icons/delish.png" alt="brand" />
            </div>
            <div className={styles.datacard__body__bottom__right}>
              <ul>
                {Children.map(children, (child) => (
                  <li>{child}</li>
                ))}
                {/* {children} */}

                {/* <li>
                  <img
                    src={
                      addedToCompare
                        ? "/icons/compare-1.svg"
                        : "/icons/eclipse.svg"
                    }
                    alt="eclipse"
                    onClick={(e) =>
                      addedToCompare
                        ? handleChangeCompare(
                            e,
                            recipeId,
                            false,
                            compareRecipeList,
                            setcompareRecipeList,
                          )
                        : handleChangeCompare(
                            e,
                            recipeId,
                            true,
                            compareRecipeList,
                            setcompareRecipeList,
                          )
                    }
                  />
                </li>
                <li>
                  <img
                    src={
                      isCollectionIds?.length
                        ? "/icons/compare.svg"
                        : "/images/BookmarksStar.svg"
                    }
                    alt="compare"
                    onClick={(e) =>
                      isCollectionIds?.length
                        ? handleOpenCollectionTray(recipeId, isCollectionIds, e)
                        : handleAddToCollection(
                            recipeId,
                            setOpenCollectionModal,
                            e,
                          )
                    }
                  />
                </li>
                <li>{hangleShowCommentsAndNotesIcon(noOfComments, notes)}</li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

RecipeCard.defaultProps = {
  title: "Triple Berry Smoothie",
  ingredients: "Apple, Banana, Strawberry",
  category: "Smoothie",
  noOfRatings: 0,
  carbs: 23,
  score: 704,
  calorie: 270,
  noOfComments: 0,
  image: "/cards/juice.png",
  ratings: 4.5,
};
export default RecipeCard;
