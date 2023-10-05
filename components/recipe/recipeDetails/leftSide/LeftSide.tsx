/* eslint-disable @next/next/no-img-element */
import React, { useCallback, useState } from "react";
import PanelHeader from "../../share/panelHeader/PanelHeader";
import { useQuery } from "@apollo/client";
import GET_ALL_RELATED_CATEGORY_RECIPES from "../../../../gqlLib/recipes/queries/gatAllRelatedCategoryRecipes";
import joniIngredients from "../../../../helperFunc/joinIngredients";
import DataCardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import { useUser } from "../../../../context/AuthProvider";
import client from "../../../../gqlLib/client";
import { ReferenceOfRecipeUpdateFuncType } from "../../../../type/recipeType";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import ShowLastModifiedCollection from "../../../showLastModifiedCollection/ShowLastModifiedCollection";
import ShareRecipe from "../center/shareRecipe";
import {
  setChangeRecipeWithinCollection,
  setSingleRecipeWithinCollecions,
} from "../../../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../../../redux/slices/sideTraySlice";
import { RecipeDetailsLeftSide } from "../../../../theme/skeletons/skeletonRecipeDetails";
import SlickSlider from "../../../../theme/carousel/SlickSlider";
import { responsiveSetting } from "../../../showRelatedItems";
import styles from "./LeftSide.module.scss";
import StickyBox from "react-sticky-box";
type RelatedCategoryRecipesProps = {
  blendCategory: string;
  sliderView?: boolean;
};
const RelatedCategoryRecipes = ({ blendCategory = "", sliderView = false }: RelatedCategoryRecipesProps) => {
  const [openCollectionModal, setOpenCollectionModal] = useState(false);
  const [shareRecipeData, setShareRecipeData] = useState({
    id: "",
    image: "",
    name: "",
    versionId: "",
    turnedOnVersions: [],
  });
  const { lastModifiedCollection } = useAppSelector((state) => state?.collections);
  const [openShareModal, setOpenShareModal] = useState(false);
  const user = useUser();
  const { data, loading, error } = useQuery(GET_ALL_RELATED_CATEGORY_RECIPES, {
    variables: {
      blendCategory,
      userId: user.id,
      limit: 5,
      page: 1,
    },
  });
  const dispatch = useAppDispatch();

  // open recipe collection panel after added a recipe to a collection
  const handleOpenCollectionTray = () => {
    dispatch(setSingleRecipeWithinCollecions([lastModifiedCollection?.id]));
    dispatch(setOpenCollectionsTary(true));
    dispatch(setChangeRecipeWithinCollection(true));
    setOpenCollectionModal(false);
  };

  const updateRecipe: ReferenceOfRecipeUpdateFuncType = useCallback(
    (id = "", outerObj = {}, innerObj = {}, innerLabel) => {
      // update apollo client cache

      client.writeQuery({
        query: GET_ALL_RELATED_CATEGORY_RECIPES,
        variables: {
          blendCategory,
          userId: user.id,
          limit: 5,
          page: 1,
        },
        data: {
          getAllRelatedCategoryRecipes: {
            ...data?.getAllRelatedCategoryRecipes,
            recipes: data?.getAllRelatedCategoryRecipes?.recipes?.map((recipe) =>
              recipe?.recipeId?._id === id
                ? {
                    ...recipe,
                    ...outerObj,
                    [innerLabel]: { ...recipe[innerLabel], ...innerObj },
                  }
                : recipe,
            ),
          },
        },
      });
    },

    [blendCategory, data?.getAllRelatedCategoryRecipes, user.id],
  );

  if (loading) {
    return (
      <RecipeDetailsLeftSide
        style={sliderView ? { display: "flex", gap: "2rem" } : {}}
        recipeCardStyle={sliderView ? { maxWidth: "377px" } : {}}
      />
    );
  }

  return (
    <StickyBox offsetBottom={20}>
      <PanelHeader icon="/images/telescope.svg" title="Related Recipes" />

      {!sliderView ? (
        data?.getAllRelatedCategoryRecipes?.recipes?.map((item, index) => {
          const {
            recipeId: {
              _id = "",
              name = "",
              image = [],
              originalVersion = "",
              numberOfRating = 0,
              averageRating = 0,
              recipeBlendCategory,
              userId,
              brand,
              url,
            },
            defaultVersion,
            // defaultVersion: {
            //   _id: defaultVersionId = "",
            //   postfixTitle = "",
            //   ingredients,
            //   description = "",
            //   calorie: { value: calorieValue },
            //   gigl: { netCarbs },
            // },
            isMatch = false,
            allRecipes = false,
            myRecipes = false,
            notes = 0,
            addedToCompare = false,
            userCollections = [],
            versionCount = 0,
            personalRating = 0,
          } = item;
          const ing = joniIngredients(defaultVersion?.ingredients);
          return (
            <div key={`${_id}${index}`} className={styles.recipeCardGap}>
              <DataCardComponent
                title={name}
                ingredients={ing}
                category={recipeBlendCategory?.name}
                ratings={averageRating}
                noOfRatings={numberOfRating}
                carbs={defaultVersion?.gigl?.netCarbs}
                // score={rxScore}
                calorie={defaultVersion?.calorie?.value}
                noOfComments={numberOfRating}
                image={image.find((img) => img?.default)?.image || image?.[0]?.image || ""}
                recipeId={_id}
                notes={notes}
                addedToCompare={addedToCompare}
                isCollectionIds={userCollections}
                setOpenCollectionModal={setOpenCollectionModal}
                isMatch={isMatch}
                postfixTitle={defaultVersion?.postfixTitle}
                defaultVersionId={defaultVersion?._id}
                userId={userId}
                recipeVersion={versionCount}
                showMoreMenuAtHover={true}
                setShareRecipeData={setShareRecipeData}
                setOpenShareModal={setOpenShareModal}
                token={item?.token}
                updateDataFunc={updateRecipe}
                brand={brand}
                personalRating={personalRating}
                origin={url}
              />
            </div>
          );
        })
      ) : (
        <SlickSlider moreSetting={responsiveSetting}>
          {data?.getAllRelatedCategoryRecipes?.recipes?.map((item, index) => {
            const {
              recipeId: {
                _id = "",
                name = "",
                image = [],
                originalVersion = "",
                numberOfRating = 0,
                averageRating = 0,
                recipeBlendCategory,
                userId,
                brand,
                url,
              },
              defaultVersion,
              // defaultVersion: {
              //   _id: defaultVersionId = "",
              //   postfixTitle = "",
              //   ingredients,
              //   description = "",
              //   calorie: { value: calorieValue },
              //   gigl: { netCarbs },
              // },
              isMatch = false,
              allRecipes = false,
              myRecipes = false,
              notes = 0,
              addedToCompare = false,
              userCollections = [],
              versionCount = 0,
              personalRating = 0,
            } = item;
            const ing = joniIngredients(defaultVersion?.ingredients);
            return (
              <div key={`${_id}${index}`} className={styles.recipeCardGapWithinSlider}>
                <DataCardComponent
                  title={name}
                  ingredients={ing}
                  category={recipeBlendCategory?.name}
                  ratings={averageRating}
                  noOfRatings={numberOfRating}
                  carbs={defaultVersion?.gigl?.netCarbs}
                  // score={rxScore}
                  calorie={defaultVersion?.calorie?.value}
                  noOfComments={numberOfRating}
                  image={image.find((img) => img?.default)?.image || image?.[0]?.image || ""}
                  recipeId={_id}
                  notes={notes}
                  addedToCompare={addedToCompare}
                  isCollectionIds={userCollections}
                  setOpenCollectionModal={setOpenCollectionModal}
                  isMatch={isMatch}
                  postfixTitle={defaultVersion?.postfixTitle}
                  defaultVersionId={defaultVersion?._id}
                  userId={userId}
                  recipeVersion={versionCount}
                  showMoreMenuAtHover={true}
                  setShareRecipeData={setShareRecipeData}
                  setOpenShareModal={setOpenShareModal}
                  token={item?.token}
                  updateDataFunc={updateRecipe}
                  brand={brand}
                  personalRating={personalRating}
                  origin={url}
                />
              </div>
            );
          })}
        </SlickSlider>
      )}
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
        title={shareRecipeData?.name}
        image={shareRecipeData?.image}
        turnedOnVersions={shareRecipeData?.turnedOnVersions}
        show={openShareModal}
        setShow={setOpenShareModal}
        type="recipe"
        heading="Share Recipe"
      />
    </StickyBox>
  );
};

export default RelatedCategoryRecipes;
