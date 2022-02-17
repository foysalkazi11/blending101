import React, { useEffect, useState } from "react";
import AContainer from "../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import AppdownLoadCard from "./AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "./ContentTray/ContentTray.component";
import DatacardComponent from "../cards/dataCard/dataCard.component";
import SearchBar from "./searchBar/SearchBar.component";
import SearchtagsComponent from "../../components/searchtags/searchtags.component";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FilterPageBottom from "../../components/recipe/recipeFilter/filterBottom.component";
import FooterRecipeFilter from "../../components/footer/footerRecipeFilter.component";
import { setChangeRecipeWithinCollection } from "../../redux/slices/collectionSlice";
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
import {
  setLatest,
  setPopular,
  setRecommended,
} from "../../redux/slices/recipeSlice";

const RecipeDetails = () => {
  const { blends, ingredients } = useAppSelector((state) => state.sideTray);
  const { user } = useAppSelector((state) => state?.user);
  const { lastModifiedCollection, collectionDetailsId, showAllRecipes } =
    useAppSelector((state) => state?.collections);
  const { latest, popular, recommended } = useAppSelector(
    (state) => state?.recipe
  );
  const { filters } = useAppSelector((state) => state?.filterRecipe);
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
      dispatch(
        setRecommended(recommendedRecipes?.data?.getAllrecomendedRecipes || [])
      );
      const popularRecipes = await getAllPopularRecipes();
      dispatch(setPopular(popularRecipes?.data?.getAllpopularRecipes || []));
      const latestRecipes = await getAllLatestRecipes();
      dispatch(setLatest(latestRecipes?.data?.getAllLatestRecipes || []));
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
  }, [user]);

  return (
    <>
      <AContainer showLeftTray={true} filterTray={true} commentsTray={true}>
        <div className={styles.main__div}>
          <SearchBar />
          {blends.length || ingredients.length || filters?.length ? (
            <SearchtagsComponent />
          ) : null}

          {collectionDetailsId || showAllRecipes ? (
            <ShowCollectionRecipes />
          ) : blends.length || ingredients.length || filters?.length ? (
            <FilterPageBottom
              blends={blends}
              ingredients={ingredients}
              filters={filters}
            />
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
                            ratings={item?.averageRating}
                            noOfRatings={item?.numberOfRating}
                            carbs={item.carbs}
                            score={item.score}
                            calorie={item.calorie}
                            noOfComments={item?.numberOfRating}
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
                              ratings={item?.averageRating}
                              noOfRatings={item?.numberOfRating}
                              carbs={item.carbs}
                              score={item.score}
                              calorie={item.calorie}
                              noOfComments={item?.numberOfRating}
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
                              ratings={item?.averageRating}
                              noOfRatings={item?.numberOfRating}
                              carbs={item.carbs}
                              score={item.score}
                              calorie={item.calorie}
                              noOfComments={item?.numberOfRating}
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
