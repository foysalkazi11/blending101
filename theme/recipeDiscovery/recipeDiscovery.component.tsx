import React, { useEffect, useState } from "react";
import AContainer from "../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import AppdownLoadCard from "./AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "./ContentTray/ContentTray.component";

import DatacardComponent from "../cards/dataCard/dataCard.component";
import SearchBar from "./searchBar/SearchBar.component";
import SearchtagsComponent from "../../components/searchtags/searchtags.component";
import {
  FETCH_RECOMMENDED_RECIPES,
  FETCH_POPULAR_RECIPES,
  FETCH_LATEST_RECIPES,
} from "../../gqlLib/recipes/queries/fetchRecipes";
import axios from "axios";
import { useAppSelector } from "../../redux/hooks";
import FilterPageBottom from "../../components/recipe/recipeFilter/filterBottom.component";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";

const RecipeDetails = () => {
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const blends = useAppSelector((state) => state.sideTray.blends);

  console.log("blends", blends);

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

    axios
      .post("https://blendingrecipe.herokuapp.com/graphql", {
        query: FETCH_POPULAR_RECIPES,
      })
      .then((result) => {
        const res = result.data?.data?.getAllpopularRecipes || [];
        setPopular([...res]);
      })
      .catch((err) => {
        console.log(err, "err");
      });
    axios
      .post("https://blendingrecipe.herokuapp.com/graphql", {
        query: FETCH_LATEST_RECIPES,
      })
      .then((result) => {
        const res = result.data?.data?.getAllLatestRecipes || [];
        setLatest([...res]);
      })
      .catch((err) => {
        console.log(err, "err");
      });
  }, []);

  console.log(recommended, popular, latest);
  return (
    <AContainer showLeftTray={true} filterTray={true}>
      <div className={styles.main__div}>
        <SearchBar />
        <SearchtagsComponent />
        {blends.length ? (
          <FilterPageBottom blends={blends} />
        ) : (
          <div className={styles.bottom}>
            <AppdownLoadCard />
            <div className={styles.main__tray}>
              {/* pass list of card to create carousel slider */}

              {/* its for recommended */}
              {recommended && (
                <ContentTray
                  heading={"Recommended"}
                  image={"/images/thumbs-up.svg"}
                >
                  {recommended?.map((item, index) => {
                    let ingredients = [];
                    item.testIngredient.forEach((ing) => {
                      ingredients.push(ing.name);
                    });
                    const ing = ingredients.toString();
                    return (
                      <div
                        className={styles.slider__card}
                        key={"recommended" + index}
                      >
                        <DatacardComponent
                          title={item.name}
                          ingredients={ing}
                          category={item.recipeBlendCategory?.name}
                          ratings={item.ratings}
                          noOfRatings={item.noOfRatings}
                          carbs={item.carbs}
                          score={item.score}
                          calorie={item.calorie}
                          noOfComments={item.noOfComments}
                          image={item.image[0]?.image}
                        />
                      </div>
                    );
                  })}
                </ContentTray>
              )}

              {/* its for Recent*/}

              {latest && (
                <ContentTray
                  heading={"Recent"}
                  image={"/images/clock-light.svg"}
                >
                  {latest?.map((item, index) => {
                    let ingredients = [];
                    item.testIngredient.forEach((ing) => {
                      ingredients.push(ing.name);
                    });
                    const ing = ingredients.toString();
                    {
                      return (
                        <div
                          className={styles.slider__card}
                          key={"latest" + index}
                        >
                          <DatacardComponent
                            title={item.name}
                            ingredients={ing}
                            category={item.recipeBlendCategory?.name}
                            ratings={item.ratings}
                            noOfRatings={item.noOfRatings}
                            carbs={item.carbs}
                            score={item.score}
                            calorie={item.calorie}
                            noOfComments={item.noOfComments}
                            image={item.image[0]?.image}
                          />
                        </div>
                      );
                    }
                  })}
                </ContentTray>
              )}
              {/* its for Popular */}

              {popular && (
                <ContentTray
                  heading={"Popular"}
                  image={"/images/fire-alt-light.svg"}
                >
                  {popular?.map((item, index) => {
                    let ingredients = [];
                    item.testIngredient.forEach((ing) => {
                      ingredients.push(ing.name);
                    });
                    const ing = ingredients.toString();
                    {
                      return (
                        <div
                          className={styles.slider__card}
                          key={"popular" + index}
                        >
                          <DatacardComponent
                            title={item.name}
                            ingredients={ing}
                            category={item.recipeBlendCategory?.name}
                            ratings={item.ratings}
                            noOfRatings={item.noOfRatings}
                            carbs={item.carbs}
                            score={item.score}
                            calorie={item.calorie}
                            noOfComments={item.noOfComments}
                            image={item.image[0]?.image}
                          />
                        </div>
                      );
                    }
                  })}
                </ContentTray>
              )}
            </div>
          </div>
        )}
      </div>
      <div className={styles.footerMainDiv}>
        <FooterRecipeFilter />
      </div>
    </AContainer>
  );
};

export default RecipeDetails;
