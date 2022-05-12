/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
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
import SaveRecipe from "../saveRecipeModal/SaveRecipeModal";
import ShowCollectionRecipes from "../showCollectionRecipes/ShowCollectionRecipes";
import { useLazyQuery } from "@apollo/client";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
import {
  setLatest,
  setPopular,
  setRecommended,
} from "../../redux/slices/recipeSlice";
import { useRouter } from "next/router";
import SaveToCollectionModal from "../modal/saveToCollectionModal/SaveToCollectionModal";
import SkeletonRecipeDiscovery from "../skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import useLocalStorage from "../../customHooks/useLocalStorage";

const RecipeDetails = () => {
  const router = useRouter();
  const { blends, ingredients, openFilterTray } = useAppSelector(
    (state) => state.sideTray
  );
  const { user, dbUser } = useAppSelector((state) => state?.user);
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
  const isMounted = useRef(false);
  const [loading, setLoading] = useState(true);
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage(
    "compareList",
    []
  );

  const handleCompareRecipe = () => {
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    dispatch(setToggleSaveRecipeModal(false));
  };

  const getAllRecipes = async () => {
    setLoading(true);
    try {
      if (!recommended?.length) {
        const recommendedRecipes = await getAllRecommendedRecipes({
          variables: { userId: dbUser?._id },
        });
        dispatch(
          setRecommended(
            recommendedRecipes?.data?.getAllrecomendedRecipes || []
          )
        );
      }

      if (!popular?.length) {
        const popularRecipes = await getAllPopularRecipes({
          variables: { userId: dbUser?._id },
        });
        dispatch(setPopular(popularRecipes?.data?.getAllpopularRecipes || []));
      }

      if (!latest?.length) {
        const latestRecipes = await getAllLatestRecipes({
          variables: { userId: dbUser?._id },
        });
        dispatch(setLatest(latestRecipes?.data?.getAllLatestRecipes || []));
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error?.messae);
    }
  };

  useEffect(() => {
    if (dbUser?._id) {
      if (!latest?.length || !popular?.length || !recommended?.length) {
        getAllRecipes();
      }
    }
  }, [dbUser?._id]);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      <AContainer showLeftTray={true} filterTray={true} commentsTray={true}>
        <div className={styles.main__div}>
          <div
            style={
              openFilterTray
                ? { marginLeft: "233px", transition: "all 0.6s" }
                : { transition: "all 0.6s" }
            }
          >
            <SearchBar  />
            {blends.length || ingredients.length || filters?.length ? (
              <SearchtagsComponent />
            ) : null}
          </div>

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

                {recommended?.length ? (
                  <ContentTray
                    heading={"Recommended"}
                    image={"/images/thumbs-up.svg"}
                  >
                    {recommended?.map((item, index) => {
                      let ingredients = [];
                      item?.ingredients?.forEach((ing) => {
                        const ingredient = ing?.ingredientId?.ingredientName;
                        ingredients.push(ingredient);
                      });
                      const ing = ingredients.join(" ");
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
                            carbs={item?.carbs}
                            score={item?.score}
                            calorie={item?.calorie}
                            noOfComments={item?.numberOfRating}
                            image={item.image[0]?.image}
                            recipeId={item?._id}
                            notes={item?.notes}
                            addedToCompare={item?.addedToCompare}
                            compareRecipeList={compareRecipeList}
                            setcompareRecipeList={setcompareRecipeList}
                          />
                        </div>
                      );
                    })}
                  </ContentTray>
                ) : (
                  <SkeletonRecipeDiscovery />
                )}

                {/* its for Recent*/}

                {latest.length ? (
                  <ContentTray
                    heading={"Recent"}
                    image={"/images/clock-light.svg"}
                  >
                    {latest?.map((item, index) => {
                      let ingredients = [];
                      item?.ingredients?.forEach((ing) => {
                        const ingredient = ing?.ingredientId?.ingredientName;
                        ingredients.push(ingredient);
                      });
                      const ing = ingredients.toString();
                      {
                        return (
                          <div
                            className={styles.slider__card}
                            key={"latest" + index}
                            onClick={() =>
                              router.push(`/recipe_details/${item?._id}`)
                            }
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
                              notes={item?.notes}
                              addedToCompare={item?.addedToCompare}
                              compareRecipeList={compareRecipeList}
                              setcompareRecipeList={setcompareRecipeList}
                            />
                          </div>
                        );
                      }
                    })}
                  </ContentTray>
                ) : (
                  <SkeletonRecipeDiscovery />
                )}
                {/* its for Popular */}

                {popular.length ? (
                  <ContentTray
                    heading={"Popular"}
                    image={"/images/fire-alt-light.svg"}
                  >
                    {popular?.map((item, index) => {
                      let ingredients = [];
                      item?.ingredients?.forEach((ing) => {
                        const ingredient = ing?.ingredientId?.ingredientName;
                        ingredients.push(ingredient);
                      });
                      const ing = ingredients.toString();
                      {
                        return (
                          <div
                            className={styles.slider__card}
                            key={"popular" + index}
                            onClick={() =>
                              router.push(`/recipe_details/${item?._id}`)
                            }
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
                              notes={item?.notes}
                              addedToCompare={item?.addedToCompare}
                              compareRecipeList={compareRecipeList}
                              setcompareRecipeList={setcompareRecipeList}
                            />
                          </div>
                        );
                      }
                    })}
                  </ContentTray>
                ) : (
                  <SkeletonRecipeDiscovery />
                )}
              </div>
            </div>
          )}
        </div>
        <div className={styles.footerMainDiv}>
          <FooterRecipeFilter />
        </div>
      </AContainer>
      <SaveToCollectionModal>
        <SaveRecipe
          title={lastModifiedCollection}
          handleChange={handleCompareRecipe}
        />
      </SaveToCollectionModal>
    </>
  );
};

export default RecipeDetails;
