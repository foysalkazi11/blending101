import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../../context/AuthProvider";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import useToGetARecipe from "../../../../customHooks/useToGetARecipe";
import useGetBlendNutritionBasedOnRecipexxx from "../../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";
import { setOpenVersionTray, setOpenVersionTrayFormWhichPage } from "../../../../redux/slices/versionTraySlice";
import { updateSidebarActiveMenuName } from "../../../../redux/slices/utilitySlice";
import { setOpenFilterTray } from "../../../../redux/slices/sideTraySlice";
import { GiGl } from "../../../../type/nutrationType";
import SkeletonRecipeDetails from "../../../../theme/skeletons/skeletonRecipeDetails";
import ErrorPage from "../../../../components/pages/404Page";
import RecipeDetails from "../../../../components/recipe/recipeDetails/RecipeDetails";
import { RecipeDetailsType } from "../../../../type/recipeDetailsType";
import Meta from "theme/meta";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import client from "gqlLib/client";
import GET_A_RECIPE from "gqlLib/recipes/queries/getRecipeDetails";
import mapIngredientStatus from "helperFunc/mapIngredientStatus";
import { setDetailsARecipe } from "redux/slices/recipeSlice";

export const getServerSideProps = (async (context) => {
  const { params = [], token = "" } = context.query;
  const recipeId = params?.[0] || "";
  const userId = params?.[1] || "6527bba6cd8816f57ca1df59";

  const { data } = await client.query({
    query: GET_A_RECIPE,
    variables: { recipeId: token ? "" : recipeId, userId, token },
  });

  let recipe: RecipeDetailsType = data?.getARecipe2;

  recipe = {
    ...recipe,

    tempVersionInfo: {
      isShareAble: true,
      isOriginalVersion: recipe?.isMatch,
      version: {
        ...recipe?.defaultVersion,
        ingredients: mapIngredientStatus(recipe?.defaultVersion?.ingredients, recipe?.defaultVersion?.errorIngredients),
      },
    },
  };

  return { props: { recipe } };
}) satisfies GetServerSideProps<{}>;

const Index = ({ recipe }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const { params = [], token = "" } = router.query;
  const recipe__Id = params?.[0] || "";
  const versionId = params?.[1] || "";
  const [nutritionState, setNutritionState] = useState(null);
  const user = useUser();
  const { detailsARecipe } = useAppSelector((state) => state?.recipe);
  const dispatch = useAppDispatch();

  // const { handleToGetARecipe, loading: getARecipeLoading, error: getARecipeError } = useToGetARecipe();
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();

  useEffect(() => {
    dispatch(setOpenVersionTray(false));
    dispatch(setOpenVersionTrayFormWhichPage("details"));
    // dispatch(setDetailsARecipe({} as RecipeDetailsType));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch data if not exist or doesn't match with current user
  // useEffect(() => {
  //   if (user.id && recipe__Id) {
  //     handleToGetARecipe(recipe__Id, user.id, token);
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [recipe__Id, user.id, token]);

  useEffect(() => {
    // dispatch(updateSidebarActiveMenuName("Blends"));
    dispatch(setDetailsARecipe(recipe));
    dispatch(setOpenFilterTray(false));
    dispatch(setOpenVersionTray(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch nutrition value based on current ingredient
  useEffect(() => {
    handleFetchIngrdients(
      detailsARecipe?.tempVersionInfo?.version?.ingredients.filter((ing) => ing?.ingredientStatus === "ok"),
      nutritionState,
      () => {},
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detailsARecipe?.tempVersionInfo?.version?.ingredients, nutritionState]);

  //@ts-ignore
  const recipeBasedNutrition = nutritionData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionData?.getNutrientsListAndGiGlByIngredients?.giGl;

  // if (getARecipeLoading) {
  //   return <SkeletonRecipeDetails />;
  // }
  // if (getARecipeError) {
  //   return <ErrorPage errorMessage="Recipe not found" />;
  // }

  return (
    <>
      <Meta
        title={recipe?.recipeId?.name}
        description={recipe?.recipeId?.description}
        ogImage={recipe?.recipeId?.originalVersion?.selectedImage || recipe?.recipeId?.image[0]?.image}
        url={window?.location?.href || ""}
      />
      <RecipeDetails
        recipeData={detailsARecipe}
        nutritionData={recipeBasedNutrition ? JSON.parse(recipeBasedNutrition) : []}
        nutritionState={nutritionState}
        setNutritionState={setNutritionState}
        nutritionDataLoading={nutritionDataLoading}
        giGl={giGl}
        pageComeFrom="details"
      />
    </>
  );
};

Index.meta = {
  icon: "/icons/juicer.svg",
  title: "Details A Recipe",
  sidebar: true,
};

export default Index;
