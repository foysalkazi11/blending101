import React, { useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./recipe.module.scss";
import Image from "next/image";
import SearchBar from "../../../theme/recipeDiscovery/searchBar/SearchBar.component";
import SearchtagsComponent from "../../searchtags/searchtags.component";
import DatacardComponent from "../../../theme/cards/dataCard/dataCard.component";
import { FETCH_RECOMMENDED_RECIPES } from "../../../gqlLib/recipes/queries/fetchRecipes";
import axios from "axios";

const RecipeFilter = () => {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    axios
      .post("https://blendingrecipe.herokuapp.com/graphql", {
        query: FETCH_RECOMMENDED_RECIPES,
      })
      .then((result) => {
        const res = result.data?.data?.getAllrecomendedRecipes || [];
        setRecommended([...res]);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);
  return (
    <AContainer showLeftTray={true} showRighTray={true}>
      <div className={styles.mainDiv}>
        <div className={styles.mainDiv__header}>
          <SearchBar />
        </div>
        <div className={styles.mainDiv__filterCardTray}>
          <SearchtagsComponent />
        </div>
        <div className={styles.mainDiv__results}>
          <div className={styles.mainDiv__results__heading}>
            <div className={styles.mainDiv__results__heading__left}>
              88 results
            </div>
            <div className={styles.mainDiv__results__heading__right}>
              <div className={styles.mainDiv__results__heading__right__image}>
                <div>
                  <Image
                    src={"/icons/dash-icon.svg"}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className={styles.mainDiv__results__heading__right__image}>
                <div>
                  {" "}
                  <Image
                    src={"/icons/share-orange.png"}
                    alt=""
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={styles.mainDiv__results__body}>
            <ul className={styles.mainDiv__results__body__ul}>
              {recommended?.map((item, index) => {
                let ingredients = [];
                item.testIngredient.forEach((ing) => {
                  ingredients.push(ing.name);
                });
                const ing = ingredients.toString();
                return (
                  <li
                    className={styles.mainDiv__results__body__ul__li}
                    key={"recommended" + index}
                  >
                    <div className={styles.slider__card}>
                      <DatacardComponent
                        title={item.name}
                        ingredients={ing}
                        category={item.recipeBlendCategory}
                        ratings={item.ratings}
                        noOfRatings={item.noOfRatings}
                        carbs={item.carbs}
                        score={item.score}
                        calorie={item.calorie}
                        noOfComments={item.noOfComments}
                        image={item.image[0]?.image}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.mainDiv__footer}>
        <ul className={styles.mainDiv__footer__ul}>
          <div className={styles.mainDiv__footer__ul__div__left}>
            <li className={styles.mainDiv__footer__ul__li}>About Us</li>
            <li className={styles.mainDiv__footer__ul__li}>Contact Us</li>
            <li className={styles.mainDiv__footer__ul__li}>FAQ</li>
          </div>
          <li className={styles.mainDiv__footer__ul__li}>
            <div className={styles.mainDiv__footer__ul__li__icon}>
              <Image
                src={"/images/logo.png"}
                alt=""
                layout="fill"
                objectFit="contain"
              />
            </div>
          </li>
          <div className={styles.mainDiv__footer__ul__div__right}>
            <li className={styles.mainDiv__footer__ul__li}>
              Terms and Conditions
            </li>
            <li className={styles.mainDiv__footer__ul__li}>Privacy Policy</li>
          </div>
        </ul>
      </div>
    </AContainer>
  );
};

export default RecipeFilter;
