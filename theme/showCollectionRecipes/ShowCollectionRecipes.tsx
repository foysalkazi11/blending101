/* eslint-disable @next/next/no-img-element */
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdOutlineStarOutline } from "react-icons/md";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setAllRecipeWithinCollections,
  setShowAllRecipes,
} from "../../redux/slices/collectionSlice";
import { setLoading } from "../../redux/slices/utilitySlice";
import DatacardComponent from "../cards/dataCard/dataCard.component";
import SkeletonRecipeDiscovery from "../skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import styles from "./ShowCollectionRecipes.module.scss";
import reactToastifyNotification from "../../components/utility/reactToastifyNotification";

const ShowCollectionRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedCollectionRecipe, setSelectedCollectionRecipe] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [getAllRecipesWithinCollections] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { collectionDetailsId, showAllRecipes, allRecipeWithinCollections } =
    useAppSelector((state) => state?.collections);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleCollctionRecipe = (allRecipeWithinCollections) => {
    if (showAllRecipes) {
      setAllRecipes(allRecipeWithinCollections);
      setCollectionName("All Recipes");
    } else {
      const findCollectionRecipes = dbUser?.collections?.find(
        (col) => col?._id === collectionDetailsId
      );
      setCollectionName(findCollectionRecipes?.name);
      const recipeId = [];
      const recipes = [];
      findCollectionRecipes?.recipes?.forEach((recipe) => {
        recipeId?.push(recipe?._id);
      });
      allRecipeWithinCollections?.forEach((recipe) => {
        //@ts-ignore
        if (recipeId?.includes(recipe?._id)) {
          recipes?.push(recipe);
        }
      });
      setSelectedCollectionRecipe(recipes);
    }
  };

  const fectchCollectionRecipes = async () => {
    try {
      setLoading(true);
      const { data } = await getAllRecipesWithinCollections({
        variables: {
          userEmail: dbUser?.email,
        },
      });
      dispatch(
        setAllRecipeWithinCollections(data?.getAllRecipesFromCollection)
      );
      handleCollctionRecipe(data?.getAllRecipesFromCollection);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      reactToastifyNotification("error", error?.message);
    }
  };

  useEffect(() => {
    if (allRecipeWithinCollections?.length) {
      handleCollctionRecipe(allRecipeWithinCollections);
    } else {
      fectchCollectionRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionDetailsId, showAllRecipes]);

  useEffect(() => {
    if (collectionDetailsId || showAllRecipes) {
      fectchCollectionRecipes();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser?.collections]);

  if (loading) {
    return (
      <div className={styles.showRecipeCollectionsContainer}>
        <SkeletonRecipeDiscovery />
      </div>
    );
  }

  return (
    <div className={styles.showRecipeCollectionsContainer}>
      <div className={styles.showRecipeCollectionsHeader}>
        <div className={styles.heading}>
          {showAllRecipes ? (
            <MdOutlineStarOutline className={styles.favoriteIcon} />
          ) : (
            <MdFavoriteBorder className={styles.favoriteIcon} />
          )}

          <h2>{collectionName}</h2>
        </div>
        {showAllRecipes ? null : (
          <img
            src="/icons/close.svg"
            alt="closeIcon"
            onClick={() => dispatch(setShowAllRecipes(true))}
            style={{ cursor: "pointer" }}
          />
        )}
      </div>
      <div className={styles.showRecipes}>
        {showAllRecipes
          ? allRecipes?.length
            ? allRecipes?.map((item, index) => {
                let ingredients = [];
                item?.ingredients?.forEach((ing) => {
                  const ingredient = ing?.ingredientId?.ingredientName;
                  ingredients.push(ingredient);
                });
                const ing = ingredients.toString();
                return (
                  <div className={styles.slider__card} key={index}>
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
              })
            : null
          : selectedCollectionRecipe?.length
          ? selectedCollectionRecipe?.map((item, index) => {
              let ingredients = [];
              item?.ingredients?.forEach((ing) => {
                const ingredient = ing?.ingredientId?.ingredientName;
                ingredients.push(ingredient);
              });
              const ing = ingredients.toString();
              return (
                <div className={styles.slider__card} key={index}>
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
            })
          : null}
      </div>
    </div>
  );
};

export default ShowCollectionRecipes;
