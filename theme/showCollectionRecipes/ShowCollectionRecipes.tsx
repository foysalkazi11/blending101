/* eslint-disable @next/next/no-img-element */
import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdOutlineStarOutline } from "react-icons/md";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setShowAllRecipes } from "../../redux/slices/collectionSlice";
import { setLoading } from "../../redux/slices/utilitySlice";
import DatacardComponent from "../cards/dataCard/dataCard.component";
import styles from "./ShowCollectionRecipes.module.scss";

const ShowCollectionRecipes = () => {
  const [allRecipes, setAllRecipes] = useState([]);
  const [selectedCollectionRecipe, setSelectedCollectionRecipe] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const [getAllRecipesWithinCollections] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { collectionDetailsId, showAllRecipes } = useAppSelector(
    (state) => state?.collections
  );
  const dispatch = useAppDispatch();

  const addToCollection = async () => {
    try {
      if (showAllRecipes) {
        dispatch(setLoading(true));
        const { data } = await getAllRecipesWithinCollections({
          variables: {
            userEmail: dbUser?.email,
          },
        });
        setAllRecipes(data?.getAllRecipesFromCollection);
        setCollectionName("All Recipes");
        dispatch(setLoading(false));
      } else {
        const findCollectionRecipes = dbUser?.collections?.find(
          (col) => col?._id === collectionDetailsId
        );

        setCollectionName(findCollectionRecipes?.name);
        setSelectedCollectionRecipe(findCollectionRecipes?.recipes);
      }

      // reactToastifyNotification("info", `Successfully added to new collection`);
    } catch (error) {
      dispatch(setLoading(false));
      console.log(error);
      // reactToastifyNotification("eror", error?.message);
    }
  };

  useEffect(() => {
    addToCollection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionDetailsId, showAllRecipes]);

  useEffect(() => {
    if (collectionDetailsId || showAllRecipes) {
      addToCollection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dbUser?.collections]);

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
                item?.testIngredient?.forEach((ing) => {
                  ingredients.push(ing.name);
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
              item?.testIngredient?.forEach((ing) => {
                ingredients.push(ing.name);
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
