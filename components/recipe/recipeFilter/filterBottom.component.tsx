import React, { useEffect, useState } from "react";
import styles from "./recipe.module.scss";
import Image from "next/image";
import DatacardComponent from "../../../theme/cards/dataCard/dataCard.component";
import axios from "axios";
import { FETCH_RECIPES_BY_BLEND } from "../../../gqlLib/recipes/queries/fetchRecipes";

function FilterPageBottom({blends}) {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    let arr = [];
    blends.forEach(blend => {
      arr.push(`${blend.title.toString()}`)
    })
    const value = FETCH_RECIPES_BY_BLEND(arr);
    axios
      .post("https://blendingrecipe.herokuapp.com/graphql", {
        query: value,
      })
      .then((result) => {
        const res = result.data?.data?.getAllRecipesByBlendCategory || [];
        setRecommended([...res]);
      })
      .catch((err) => {
        console.log(err, "err");
    });
    return () => {
      setRecommended([])
    }
  }, [blends])


  return (
    <div className={styles.mainDiv}>
      <div className={styles.mainDiv__results}>
        <div className={styles.mainDiv__results__heading}>
          <div className={styles.mainDiv__results__heading__left}>
            {recommended.length} results
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
  );
}

export default FilterPageBottom;
