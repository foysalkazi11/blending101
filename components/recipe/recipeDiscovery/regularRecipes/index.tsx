import { useQuery } from "@apollo/client";
import React from "react";
import Widget from "../../../../component/module/Widget/Widget.component";
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import GET_ALL_LATEST_RECIPES from "../../../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../../../gqlLib/recipes/queries/getRecommendedRecipes";
import { useAppSelector } from "../../../../redux/hooks";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SkeletonRecipeDiscovery from "../../../../theme/skeletons/skeletonRecipeDiscovery/SkeletonRecipeDiscovery";
import { Ingredient, RecipeType } from "../../../../type/recipeType";
import AppdownLoadCard from "../AppdownLoadCard/AppdownLoadCard.component";
import ContentTray from "../ContentTray/ContentTray.component";
import styles from "../recipeDiscovery.module.scss";

const defaultHeadingContent = {
  heading: "Recommended",
  image: "/images/thumbs-up.svg",
  allUrl: "recipes/recommended",
};
interface RegularRecipesType {
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
}
const RegularRecipes = ({ setOpenCollectionModal }: RegularRecipesType) => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    data: recommendedRecipesData,
    loading: recommendedRecipesLoading,
    error: recommendedRecipesError,
  } = useQuery(GET_ALL_RECOMMENDED_RECIPES, {
    fetchPolicy: "cache-and-network",

    variables: { userId: dbUser?._id },
  });
  const {
    data: popularRecipesData,
    loading: popularRecipesLoading,
    error: popularRecipesError,
  } = useQuery(GET_ALL_POPULAR_RECIPES, {
    fetchPolicy: "cache-and-network",
    variables: { userId: dbUser?._id },
  });
  const {
    data: latestRecipesData,
    loading: latestRecipesLoading,
    error: latestRecipesError,
  } = useQuery(GET_ALL_LATEST_RECIPES, {
    fetchPolicy: "cache-and-network",
    variables: { userId: dbUser?._id },
  });

  // const getAllRecipes = async () => {
  //   try {
  //     if (!recommended?.length) {
  //       const recommendedRecipes = await getAllRecommendedRecipes({
  //         variables: { userId: dbUser?._id },
  //       });
  //       dispatch(
  //         setRecommended(
  //           recommendedRecipes?.data?.getAllrecomendedRecipes || [],
  //         ),
  //       );
  //     }

  //     if (!popular?.length) {
  //       const popularRecipes = await getAllPopularRecipes({
  //         variables: { userId: dbUser?._id },
  //       });
  //       dispatch(setPopular(popularRecipes?.data?.getAllpopularRecipes || []));
  //     }

  //     if (!latest?.length) {
  //       const latestRecipes = await getAllLatestRecipes({
  //         variables: { userId: dbUser?._id },
  //       });
  //       dispatch(setLatest(latestRecipes?.data?.getAllLatestRecipes || []));
  //     }
  //   } catch (error) {
  //     console.log(error?.message);
  //   }
  // };

  // useEffect(() => {
  //   if (dbUser?._id) {
  //     if (!latest?.length || !popular?.length || !recommended?.length) {
  //       getAllRecipes();
  //     }
  //   }
  // }, [dbUser?._id]);

  return (
    <>
      <AppdownLoadCard />
      <div className={styles.main__tray}>
        {/* its for recommended */}
        <ShowRecipes
          headerData={{
            heading: "Recommended",
            image: "/images/thumbs-up.svg",
            allUrl: "recipes/recommended",
          }}
          loading={recommendedRecipesLoading}
          recipes={recommendedRecipesData?.getAllrecomendedRecipes}
          setOpenCollectionModal={setOpenCollectionModal}
        />
        {/* its for latest */}
        <ShowRecipes
          headerData={{
            heading: "Recent",
            image: "/images/clock-light.svg",
            allUrl: "recipes/latest",
          }}
          loading={latestRecipesLoading}
          recipes={latestRecipesData?.getAllLatestRecipes}
          setOpenCollectionModal={setOpenCollectionModal}
        />
        {/* its for popular */}
        <ShowRecipes
          headerData={{
            heading: "Popular",
            image: "/images/fire-alt-light.svg",
            allUrl: "recipes/popular",
          }}
          loading={popularRecipesLoading}
          recipes={popularRecipesData?.getAllpopularRecipes}
          setOpenCollectionModal={setOpenCollectionModal}
        />

        <Widget slug="recipe-editor" />
      </div>
    </>
  );
};

interface ShowRecipesType {
  recipes: RecipeType[];
  loading: boolean;
  headerData: {
    heading: string;
    image: string;
    allUrl: string;
  };
  setOpenCollectionModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowRecipes = ({
  headerData = defaultHeadingContent,
  loading = false,
  recipes = [],
  setOpenCollectionModal,
}: ShowRecipesType) => {
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage<any>(
    "compareList",
    [],
  );

  // joni ingredients
  const joniIngredients = (ingredients: Ingredient[]) => {
    let ingredientsArr: string[] = [];
    ingredients?.forEach((ing) => {
      const ingredient = ing?.ingredientId?.ingredientName;
      ingredientsArr.push(ingredient);
    });
    return ingredientsArr.join(", ");
  };

  if (loading) {
    return <SkeletonRecipeDiscovery />;
  }
  return recipes.length ? (
    <ContentTray {...headerData}>
      {recipes?.map((item, index) => {
        const ing = joniIngredients(item?.ingredients);
        return (
          <div
            className={styles.slider__card}
            key={`${headerData.heading}${index}`}
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
              isCollectionIds={item?.userCollections}
              setOpenCollectionModal={setOpenCollectionModal}
              isMatch={item?.isMatch}
              postfixTitle={item?.defaultVersion?.postfixTitle}
              userId={item?.userId}
            />
          </div>
        );
      })}
    </ContentTray>
  ) : null;
};

export default RegularRecipes;
