/* eslint-disable @next/next/no-img-element */
import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { MdFavoriteBorder, MdOutlineStarOutline } from "react-icons/md";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setAllRecipeWithinCollections,
  setShowAllRecipes,
  setSingleCollectionInfo,
} from "../../redux/slices/collectionSlice";
import DatacardComponent from "../cards/dataCard/dataCard.component";
import styles from "./ShowCollectionRecipes.module.scss";
import SkeletonCollectionRecipe from "../skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import useLocalStorage from "../../customHooks/useLocalStorage";
import GET_SINGLE_COLLECTION from "../../gqlLib/collection/query/getSingleCollection";

const ShowCollectionRecipes = () => {
  const [collectionName, setCollectionName] = useState("");
  const { dbUser } = useAppSelector((state) => state?.user);
  const { singleCollectionInfo, showAllRecipes, allRecipeWithinCollections } =
    useAppSelector((state) => state?.collections);
  const [
    getAllCollections,
    {
      data: allCollectionData,
      loading: allCollectionLoading,
      error: allCollectionError,
    },
  ] = useLazyQuery(GET_ALL_RECIPES_WITHIN_COLLECTIONS);
  const [
    getSingleCollections,
    {
      data: singleCollectionData,
      loading: singleCollectionLoading,
      error: singleCollectionError,
    },
  ] = useLazyQuery(GET_SINGLE_COLLECTION);

  const dispatch = useAppDispatch();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage(
    "compareList",
    [],
  );

  const handleColseCollections = () => {
    if (singleCollectionInfo.id) {
      dispatch(setShowAllRecipes(true));
      dispatch(setSingleCollectionInfo({ id: "", name: "" }));
    }
    if (showAllRecipes) {
      dispatch(setShowAllRecipes(false));
      dispatch(setSingleCollectionInfo({ id: "", name: "" }));
    }
  };

  useEffect(() => {
    if (
      !allCollectionLoading &&
      allCollectionData?.getAllRecipesFromCollection
    ) {
      if (showAllRecipes) {
        setCollectionName("All Recipes");
        dispatch(
          setAllRecipeWithinCollections([
            ...allCollectionData?.getAllRecipesFromCollection,
          ]),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allCollectionLoading, allCollectionData?.getAllRecipesFromCollection]);

  useEffect(() => {
    if (
      !singleCollectionLoading &&
      singleCollectionData?.getASingleCollection
    ) {
      if (singleCollectionInfo?.id) {
        setCollectionName(singleCollectionInfo?.name);
        dispatch(
          setAllRecipeWithinCollections([
            ...singleCollectionData?.getASingleCollection,
          ]),
        );
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCollectionLoading, singleCollectionData?.getASingleCollection]);

  useEffect(() => {
    if (showAllRecipes) {
      getAllCollections({
        variables: { userId: dbUser?._id },
      });
    } else {
      if (singleCollectionInfo?.id) {
        getSingleCollections({
          variables: {
            userId: dbUser?._id,
            collectionId: singleCollectionInfo?.id,
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singleCollectionInfo?.name, showAllRecipes]);

  if (allCollectionLoading || singleCollectionLoading) {
    return (
      <div className={styles.showRecipeCollectionsContainer}>
        <SkeletonCollectionRecipe />
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

        <img
          src="/icons/close.svg"
          alt="closeIcon"
          onClick={handleColseCollections}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className={styles.showRecipes}>
        {allRecipeWithinCollections?.length
          ? allRecipeWithinCollections?.map((item, index) => {
              let ingredients = [];
              item?.ingredients?.forEach((ing) => {
                const ingredient = ing?.ingredientId?.ingredientName;
                ingredients.push(ingredient);
              });
              const ing = ingredients.toString();
              return (
                <div key={index}>
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
                    isCollectionIds={item?.userCollections}
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
