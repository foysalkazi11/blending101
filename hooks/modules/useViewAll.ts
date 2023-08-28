import { useLazyQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { useState, useEffect, useMemo } from "react";

import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import { useAppSelector } from "../../redux/hooks";
import { useUser } from "../../context/AuthProvider";

const useViewAll = (param: string, limit: number = 12, page: number = 1) => {
  const userId = useUser().id;
  const [response, setResponse] = useState({ recipes: [], totalRecipes: 0 });

  const config = useMemo(
    () => ({
      variables: {
        userId,
        limit,
        page,
      },
      skip: userId === "",
    }),
    [limit, page, userId],
  );

  const [getAllRecommendedRecipes, getAllRecommendedRecipesData] = useLazyQuery(
    GET_ALL_RECOMMENDED_RECIPES,
    config,
  );
  const [getAllPopularRecipes, getAllPopularRecipesData] = useLazyQuery(
    GET_ALL_POPULAR_RECIPES,
    config,
  );
  const [getAllLatestRecipes, getAllLatestRecipesData] = useLazyQuery(
    GET_ALL_LATEST_RECIPES,
    config,
  );

  const responseObj = useMemo(
    () => ({
      recommended: {
        method: getAllRecommendedRecipes,
        data: getAllRecommendedRecipesData,
      },
      popular: {
        method: getAllPopularRecipes,
        data: getAllPopularRecipesData,
      },
      latest: {
        method: getAllLatestRecipes,
        data: getAllLatestRecipesData,
      },
    }),
    [
      getAllLatestRecipes,
      getAllLatestRecipesData,
      getAllPopularRecipes,
      getAllPopularRecipesData,
      getAllRecommendedRecipes,
      getAllRecommendedRecipesData,
    ],
  );

  async function fetchData() {
    try {
      let response = await responseObj?.[param]?.method();
      response = response?.data[QUERY_DICTIONARY[param]?.query];
      setResponse((previous) => ({
        recipes: [...previous?.recipes, ...response?.recipes],
        totalRecipes: response?.totalRecipes,
      }));
    } catch (error) {
      console.log(error);
    }
    // let response: any;
    // switch (param) {
    //   case "recommended":
    //     response = await getAllRecommendedRecipes();
    //     break;
    //   case "popular":
    //     response = await getAllPopularRecipes();
    //     break;
    //   case "latest":
    //     response = await getAllLatestRecipes();
    //     break;
    //   default:
    //     return;
    // }
    // setResponse(response?.data[QUERY_DICTIONARY[param]?.query]);
  }

  useEffect(() => {
    if (param && page) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [param, page]);

  return { ...responseObj[param]?.data, data: response };
};

export default useViewAll;

export const QUERY_DICTIONARY = {
  recommended: {
    title: "Recommended",
    query: "getAllrecomendedRecipes2",
    icon: faThumbsUp,
  },
  popular: {
    title: "Popular",
    query: "getAllpopularRecipes2",
    icon: faFire,
  },
  latest: {
    title: "Recent",
    query: "getAllLatestRecipes2",
    icon: faClock,
  },
};
