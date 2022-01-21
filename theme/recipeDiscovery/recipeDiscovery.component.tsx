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
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FilterPageBottom from "../../components/recipe/recipeFilter/filterBottom.component";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";
import {
  setAllRecipeWithinCollectionsId,
  setChangeRecipeWithinCollection,
} from "../../redux/slices/collectionSlice";
import {
  setOpenCollectionsTary,
  setToggleSaveRecipeModal,
} from "../../redux/slices/sideTraySlice";
import SaveRecipeModal from "../saveRecipeModal/SaveRecipeModal";
import ShowCollectionRecipes from "../showCollectionRecipes/ShowCollectionRecipes";
import { setLoading } from "../../redux/slices/utilitySlice";
import { useLazyQuery } from "@apollo/client";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
const RecipeDetails = () => {
  const [recommended, setRecommended] = useState([]);
  const [popular, setPopular] = useState([]);
  const [latest, setLatest] = useState([]);
  const blends = useAppSelector((state) => state.sideTray.blends);
  const { dbUser, user } = useAppSelector((state) => state?.user);
  const { lastModifiedCollection, collectionDetailsId, showAllRecipes } =
    useAppSelector((state) => state?.collections);
  const [getAllRecommendedRecipes] = useLazyQuery(GET_ALL_RECOMMENDED_RECIPES);
  const [getAllPopularRecipes] = useLazyQuery(GET_ALL_POPULAR_RECIPES);
  const [getAllLatestRecipes] = useLazyQuery(GET_ALL_LATEST_RECIPES);

  const dispatch = useAppDispatch();

  const handleCompareRecipe = () => {
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setToggleSaveRecipeModal(false));
  };

  const getAllRecipes = async () => {
    dispatch(setLoading(true));
    try {
      const recommendedRecipes = await getAllRecommendedRecipes();
      setRecommended(recommendedRecipes?.data?.getAllrecomendedRecipes || []);
      const popularRecipes = await getAllPopularRecipes();
      setPopular(popularRecipes?.data?.getAllpopularRecipes || []);
      const latestRecipes = await getAllLatestRecipes();
      setLatest(latestRecipes?.data?.getAllLatestRecipes || []);
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error?.messae);
    }
  };

  useEffect(() => {
    if (user) {
      getAllRecipes();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <AContainer showLeftTray={true} filterTray={true}>
        <div className={styles.main__div}>
          <SearchBar />
          <SearchtagsComponent />
          {collectionDetailsId || showAllRecipes ? (
            <ShowCollectionRecipes />
          ) : blends.length ? (
            <FilterPageBottom blends={blends} />
          ) : (
            <div className={styles.bottom}>
              <AppdownLoadCard />
              <div className={styles.main__tray}>
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
                            recipeId={item?._id}
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
                              recipeId={item?._id}
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
                              recipeId={item?._id}
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
      <SaveRecipeModal
        title={lastModifiedCollection}
        handleChange={handleCompareRecipe}
        modalContentStyle={{ borderRadius: "29px" }}
      />
    </>
  );
};

export default RecipeDetails;
