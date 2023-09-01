import React, { useCallback, useState } from "react";
import { useQuery } from "@apollo/client";
import { faClock, faStar } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GET_ALL_COLLECTIONS_WITH_RECIPES from "../../../../gqlLib/collection/query/getAllCollectionsWithRecipes";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import SkeletonRecipeDiscovery from "../../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import { ShowRecipes } from "../../../recipe/recipeDiscovery/regularRecipes";
import ErrorPage from "../../404Page";
import styles from "./myCollection.module.scss";
import ShowLastModifiedCollection from "../../../showLastModifiedCollection/ShowLastModifiedCollection";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import ShareRecipe from "../../../recipe/recipeDetails/center/shareRecipe";
import client from "../../../../gqlLib/client";
import { useUser } from "../../../../context/AuthProvider";
import RecipeCommentsTray from "../../../sidetray/commentsTray/RecipeCommentsTray";
import VersionTray from "../../../sidetray/versionTray/VersionTray";
import RecipeCollectionAndThemeTray from "../../../sidetray/collection/RecipeCollectionAndThemeTray";

const MyCollections = () => {
  const user = useUser();
  const { data, loading, error } = useQuery(GET_ALL_COLLECTIONS_WITH_RECIPES, {
    variables: { userId: user?.id },
  });
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const [openShareModal, setOpenShareModal] = useState(false);
  const { lastModifiedCollection } = useAppSelector(
    (state) => state?.collections,
  );
  const dispatch = useAppDispatch();

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  // update data after any interaction
  const updateContainerData = useCallback(
    (objectId: string, recipeId: string, updateObj: { [key: string]: any }) => {
      client.writeQuery({
        query: GET_ALL_COLLECTIONS_WITH_RECIPES,
        variables: { userId: user?.id },
        data: {
          getAllCollectionsWithRecipes: data?.getAllCollectionsWithRecipes?.map(
            (item) =>
              item?._id === objectId
                ? {
                    ...item,
                    recipes: item?.recipes?.map((recipe) =>
                      recipe?.recipeId?._id === recipeId
                        ? { ...recipe, ...updateObj }
                        : recipe,
                    ),
                  }
                : item,
          ),
        },
      });
    },
    [data?.getAllCollectionsWithRecipes, user.id],
  );

  if (loading) {
    return (
      <div className={styles.myCollectionsContainer}>
        <SkeletonRecipeDiscovery />
        <SkeletonRecipeDiscovery />
        <SkeletonRecipeDiscovery />
      </div>
    );
  }
  if (error) {
    return (
      <ErrorPage
        style={{ height: "50vh" }}
        errorMessage="No collection recipe found"
      />
    );
  }
  return (
    <React.Fragment>
      <RecipeCommentsTray showPanle="right" showTagByDefaut={false} />
      <VersionTray showPanle="right" showTagByDefaut={false} />
      <RecipeCollectionAndThemeTray showPanle="left" showTagByDefaut={false} />
      <div className={styles.myCollectionsContainer}>
        {data?.getAllCollectionsWithRecipes?.map((collection) => {
          const {
            _id,
            canContribute,
            canShareWithOther,
            description,
            image,
            isShared,
            name,
            personalizedName,
            recipes,
            sharedBy,
            slug,
          } = collection;
          return (
            <ShowRecipes
              key={collection?._id}
              headerData={{
                heading: name,
                image: (
                  <FontAwesomeIcon
                    icon={name === "Recent Recipes" ? faClock : faStar}
                    color="#fe5d1f"
                    size="2x"
                  />
                ),
                allUrl: `/collection/recipeCollection/${slug}`,
              }}
              loading={false}
              recipes={recipes}
              setOpenCollectionModal={setOpenCollectionModal}
              setOpenShareModal={setOpenShareModal}
              setShareRecipeData={setShareRecipeData}
              updateDataFunc={(recipeId, updateObj) =>
                updateContainerData(_id, recipeId, updateObj)
              }
            />
          );
        })}
        <ShowLastModifiedCollection
          open={openCollectionModal}
          setOpen={setOpenCollectionModal}
          shouldCloseOnOverlayClick={true}
          lastModifiedCollectionName={lastModifiedCollection?.name}
          openCollectionPanel={handleOpenCollectionTray}
        />
        <ShareRecipe
          id={shareRecipeData?.id}
          versionId={shareRecipeData.versionId}
          turnedOnVersions={shareRecipeData.turnedOnVersions}
          title={shareRecipeData?.name}
          image={shareRecipeData?.image}
          show={openShareModal}
          setShow={setOpenShareModal}
          type="recipe"
          heading="Share Recipe"
        />
      </div>
    </React.Fragment>
  );
};

export default MyCollections;
