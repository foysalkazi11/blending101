import { useQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback } from "react";
import client from "../../../../gqlLib/client";
import GET_ALL_LATEST_RECIPES from "../../../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../../../gqlLib/recipes/queries/getRecommendedRecipes";
import joniIngredients from "../../../../helperFunc/joinIngredients";
import { useAppSelector } from "../../../../redux/hooks";
import DataCardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SkeletonRecipeDiscovery from "../../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import { Ingredient, RecipeType, ReferenceOfRecipeUpdateFuncType } from "../../../../type/recipeType";
import AppdownLoadCard from "../AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../ContentTray/ContentTray.component";
import styles from "../recipeDiscovery.module.scss";
import { useUser } from "../../../../context/AuthProvider";

const defaultHeadingContent = {
  heading: "Recommended",
  image: "/images/thumbs-up.svg",
  allUrl: "recipe/viewAll/recommended",
};
interface RegularRecipesType {
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<React.SetStateAction<{ id: string; image: string; name: string }>>;
}
const RegularRecipes = ({ setOpenCollectionModal, setOpenShareModal, setShareRecipeData }: RegularRecipesType) => {
  const user = useUser();
  const {
    data: recommendedRecipesData,
    loading: recommendedRecipesLoading,
    error: recommendedRecipesError,
  } = useQuery(GET_ALL_RECOMMENDED_RECIPES, {
    // fetchPolicy: "cache-and-network",

    variables: { userId: user.id },
  });
  const {
    data: popularRecipesData,
    loading: popularRecipesLoading,
    error: popularRecipesError,
  } = useQuery(GET_ALL_POPULAR_RECIPES, {
    // fetchPolicy: "cache-and-network",
    variables: { userId: user.id },
  });
  const {
    data: latestRecipesData,
    loading: latestRecipesLoading,
    error: latestRecipesError,
  } = useQuery(GET_ALL_LATEST_RECIPES, {
    // fetchPolicy: "cache-and-network",
    variables: { userId: user.id },
  });

  const updateRecipe: ReferenceOfRecipeUpdateFuncType = useCallback(
    (id = "", outerObj = {}, innerObj = {}, innerLabel) => {
      // update apollo client cache

      client.writeQuery({
        query: GET_ALL_RECOMMENDED_RECIPES,
        variables: { userId: user.id },
        data: {
          getAllrecomendedRecipes2: {
            ...recommendedRecipesData?.getAllrecomendedRecipes2,
            recipes: recommendedRecipesData?.getAllrecomendedRecipes2?.recipes?.map((recipe) =>
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
      client.writeQuery({
        query: GET_ALL_POPULAR_RECIPES,
        variables: { userId: user.id },
        data: {
          getAllpopularRecipes2: {
            ...popularRecipesData?.getAllpopularRecipes2,
            recipes: popularRecipesData?.getAllpopularRecipes2?.recipes?.map((recipe) =>
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
      client.writeQuery({
        query: GET_ALL_LATEST_RECIPES,
        variables: { userId: user.id },
        data: {
          getAllLatestRecipes2: {
            ...latestRecipesData?.getAllLatestRecipes2,
            recipes: latestRecipesData?.getAllLatestRecipes2?.recipes?.map((recipe) =>
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

    [
      latestRecipesData?.getAllLatestRecipes2,
      popularRecipesData?.getAllpopularRecipes2,
      recommendedRecipesData?.getAllrecomendedRecipes2,
      user.id,
    ],
  );

  return (
    <React.Fragment>
      <AppdownLoadCard />
      <div className={styles.main__tray}>
        {/* its for recommended */}
        <ShowRecipes
          headerData={{
            heading: "Recommended",
            image: <FontAwesomeIcon icon={faThumbsUp} color="#fe5d1f" size="2x" />,
            allUrl: "/recipe/viewAll/recommended",
          }}
          loading={recommendedRecipesLoading}
          filters={["Leafy", "Beatle", "Fruity"]}
          recipes={recommendedRecipesData?.getAllrecomendedRecipes2?.recipes}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />
        {/* its for latest */}
        <ShowRecipes
          headerData={{
            heading: "Recent",
            image: <FontAwesomeIcon icon={faClock} color="#fe5d1f" size="2x" />,
            allUrl: "/recipe/viewAll/latest",
          }}
          loading={latestRecipesLoading}
          recipes={latestRecipesData?.getAllLatestRecipes2?.recipes}
          filters={["Wholefood", "Frozen", "Refreshing"]}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />
        {/* its for popular */}
        <ShowRecipes
          headerData={{
            heading: "Popular",
            image: <FontAwesomeIcon icon={faFire} color="#fe5d1f" size="2x" />,
            allUrl: "/recipe/viewAll/popular",
          }}
          filters={["Leafy", "Beatle", "Fruity"]}
          loading={popularRecipesLoading}
          recipes={popularRecipesData?.getAllpopularRecipes2?.recipes}
          setOpenCollectionModal={setOpenCollectionModal}
          setOpenShareModal={setOpenShareModal}
          setShareRecipeData={setShareRecipeData}
          updateDataFunc={updateRecipe}
        />

        {/* <Widget slug="recipe-editor" /> */}
      </div>
    </React.Fragment>
  );
};

interface ShowRecipesType {
  recipes: RecipeType[];
  loading: boolean;
  headerData: {
    heading: string;
    image: string | React.ReactChild;
    allUrl: string;
  };
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenShareModal?: React.Dispatch<React.SetStateAction<boolean>>;
  setShareRecipeData?: React.Dispatch<React.SetStateAction<{ id: string; image: string; name: string }>>;
  updateDataFunc?: ReferenceOfRecipeUpdateFuncType;
  filters?: any[];
}

export const ShowRecipes = ({
  headerData = defaultHeadingContent,
  loading = false,
  recipes = [],
  setOpenCollectionModal,
  setOpenShareModal = () => {},
  setShareRecipeData = () => {},
  updateDataFunc = () => {},
}: ShowRecipesType) => {
  if (loading) {
    return <SkeletonRecipeDiscovery />;
  }
  return (
    <React.Fragment>
      {recipes.length ? (
        <ContentTray {...headerData}>
          {recipes?.map((item, index) => {
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
              <div className={styles.slider__card} key={`${headerData.heading}${index}`}>
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
                  updateDataFunc={updateDataFunc}
                  brand={brand}
                  personalRating={personalRating}
                  origin={url}
                />
              </div>
            );
          })}
        </ContentTray>
      ) : null}
    </React.Fragment>
  );
};

export default RegularRecipes;
