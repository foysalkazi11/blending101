/* eslint-disable @next/next/no-img-element */
import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { MdFavoriteBorder, MdOutlineStarOutline } from "react-icons/md";
import GET_ALL_RECIPES_WITHIN_COLLECTIONS from "../../gqlLib/collection/query/getAllRecipesWhithiCollections";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setAllRecipeWithinCollections,
  setCurrentCollectionInfo,
} from "../../redux/slices/collectionSlice";
import DatacardComponent from "../cards/dataCard/dataCard.component";
import styles from "./ShowCollectionRecipes.module.scss";
import SkeletonCollectionRecipe from "../skeletons/skeletonCollectionRecipe/SkeletonCollectionRecipe";
import useLocalStorage from "../../customHooks/useLocalStorage";
import GET_SINGLE_COLLECTION from "../../gqlLib/collection/query/getSingleCollection";
import IconWarper from "../iconWarper/IconWarper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/pro-regular-svg-icons";
import GET_ALL_MY_CREATED_RECIPES from "../../gqlLib/collection/query/getAllMyCreatedRecipes";

const ShowCollectionRecipes = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const { allRecipeWithinCollections, currentCollectionInfo } = useAppSelector(
    (state) => state?.collections,
  );
  const [getAllCollections, { loading: allCollectionLoading }] = useLazyQuery(
    GET_ALL_RECIPES_WITHIN_COLLECTIONS,
    {
      fetchPolicy: "cache-and-network",
    },
  );
  const [getAllMyCreatedRecipes, { loading: createdRecipesLoading }] =
    useLazyQuery(GET_ALL_MY_CREATED_RECIPES, {
      fetchPolicy: "cache-and-network",
    });
  const [getSingleCollections, { loading: singleCollectionLoading }] =
    useLazyQuery(GET_SINGLE_COLLECTION, { fetchPolicy: "cache-and-network" });

  const dispatch = useAppDispatch();
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

  const fetchCollection = async () => {
    if (currentCollectionInfo?.name === "All Recipes") {
      const { data } = await getAllCollections({
        variables: { userId: dbUser?._id },
      });
      dispatch(
        setAllRecipeWithinCollections([...data?.getAllRecipesFromCollection]),
      );
    } else if (currentCollectionInfo?.name === "My Recipes") {
      const { data } = await getAllMyCreatedRecipes({
        variables: { userId: dbUser?._id },
      });
      dispatch(
        setAllRecipeWithinCollections([...data?.getAllMyCreatedRecipes]),
      );
    } else {
      if (currentCollectionInfo?.id) {
        const { data } = await getSingleCollections({
          variables: {
            userId: dbUser?._id,
            collectionId: currentCollectionInfo?.id,
          },
        });
        dispatch(
          setAllRecipeWithinCollections([...data?.getASingleCollection]),
        );
      }
    }
  };

  const handleColseCollections = () => {
    if (
      currentCollectionInfo.id ||
      currentCollectionInfo?.name !== "All Recipes"
    ) {
      dispatch(setCurrentCollectionInfo({ id: "", name: "All Recipes" }));
    } else {
      dispatch(setCurrentCollectionInfo({ id: "", name: "" }));
    }
  };

  useEffect(() => {
    if (currentCollectionInfo?.name) {
      fetchCollection();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCollectionInfo?.name]);

  if (
    allCollectionLoading ||
    singleCollectionLoading ||
    createdRecipesLoading
  ) {
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
          {currentCollectionInfo?.name === "All Recipes" ? (
            <MdOutlineStarOutline className={styles.favoriteIcon} />
          ) : (
            <MdFavoriteBorder className={styles.favoriteIcon} />
          )}

          <h2>{currentCollectionInfo?.name}</h2>
        </div>

        <IconWarper
          handleClick={handleColseCollections}
          defaultBg="secondary"
          hover="bgSecondary"
          style={{ width: "28px", height: "28px" }}
        >
          <FontAwesomeIcon icon={faXmark} />
        </IconWarper>
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
                    isMatch={item?.isMatch}
                    postfixTitle={item?.defaultVersion?.postfixTitle}
                    userId={item?.userId}
                    recipeVersion={item?.recipeVersion}
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
