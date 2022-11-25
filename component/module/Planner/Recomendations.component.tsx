import {
  faCalendarDay,
  faEye,
  faLightbulbOn,
  faSave,
} from "@fortawesome/pro-light-svg-icons";
import { useRouter } from "next/router";
import React from "react";
import IconHeading from "../../../theme/iconHeading/iconHeading.component";

import styles from "./Recomendations.module.scss";
import classes from "../../molecules/Card/RecipeCard.module.scss";
import Icon from "../../atoms/Icon/Icon.component";

const Recomendations = (props) => {
  const {
    title,
    ingredients,
    category,
    ratings,
    noOfRatings,
    carbs,
    score,
    calorie,
    image,
    recipeId,
    children,
    className,
  } = props;
  const router = useRouter();

  return (
    <div className={styles.recommend}>
      <IconHeading icon={faLightbulbOn} title={"Recommendation"} />
      <div className={styles.recommend__body}>
        {[1, 2, 3].map((data) => (
          <div key={data} className={`${classes.datacard} mb-20 ${className}`}>
            <div>
              <div>
                <div className={classes.datacard__body__top}>
                  <div>
                    <h2
                      className={classes.title}
                      onClick={() => router.push(`/recipe_details/${recipeId}`)}
                    >
                      {title}
                    </h2>
                  </div>
                  <div className={classes.datacard__body__top__menu} />
                </div>
                <div className={classes.datacard__body__middle}>
                  <div className={classes.datacard__body__middle__left}>
                    <div
                      className={classes.image}
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </div>
                  <div className={classes.datacard__body__middle__right}>
                    <div>
                      <div className={classes.databody__top}>
                        {/* <div className={classes.databody__top__label}>
                          <div className={classes.category}>{category}</div>
                        </div> */}
                        <div className={classes.databody__top__info}>
                          <span>5.0</span>&nbsp;
                          <img src="/icons/star.svg" alt="star" />
                          <img src="/icons/star.svg" alt="star" />
                          <img src="/icons/star.svg" alt="star" />
                          <img src="/icons/star.svg" alt="star" />
                          <img src="/icons/star.svg" alt="star" />
                        </div>
                      </div>
                      <div className={classes.databody__bottom}>
                        <p>
                          Great plan for building lean muscle. Seven tasty
                          wholefood and smoothie blends.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={classes.datacard__body__belt}>
                  <div className={classes.datacard__body__belt__child}>
                    Cost <span>${carbs}</span>
                  </div>
                  <div className={classes.datacard__body__belt__child}>
                    Nutrie Score <span>{score}</span>
                  </div>
                  <div className={classes.datacard__body__belt__child}>
                    Calories <span>{calorie}</span>
                  </div>
                </div>
                <div className={classes.datacard__body__bottom}>
                  <div className={classes.datacard__body__bottom__left}>
                    <img src="/icons/delish.png" alt="brand" />
                  </div>
                  <div className={classes.datacard__body__bottom__right}>
                    <Icon
                      fontName={faEye}
                      style={{ color: "#fe5d1f" }}
                      size="18px"
                      className="mr-20"
                    />
                    <Icon
                      fontName={faSave}
                      style={{ color: "#fe5d1f" }}
                      size="18px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Recomendations.defaultProps = {
  title: "High Protein Low Fat Workout Plan",
  ingredients: [],
  category: "Uncategorized",
  noOfRatings: 10,
  carbs: 23,
  score: 704,
  calorie: 270,
  noOfComments: 0,
  image: "/cards/juice.png",
  ratings: 4.5,
};

export default Recomendations;
