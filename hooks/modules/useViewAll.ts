import { useLazyQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { useState, useEffect, useMemo } from "react";

import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import { useAppSelector } from "../../redux/hooks";

const useViewAll = (param: string) => {
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [response, setResponse] = useState([]);

  const config = useMemo(
    () => ({
      variables: {
        userId,
      },
      skip: userId === "",
    }),
    [userId],
  );

  const [getAllrecomendedRecipes] = useLazyQuery(
    GET_ALL_RECOMMENDED_RECIPES,
    config,
  );
  const [getAllPopularRecipes] = useLazyQuery(GET_ALL_POPULAR_RECIPES, config);
  const [getAllLatestRecipes] = useLazyQuery(GET_ALL_LATEST_RECIPES, config);

  useEffect(() => {
    async function fetchData() {
      let response: any;
      switch (param) {
        case "recommended":
          response = await getAllrecomendedRecipes();
          break;
        case "popular":
          response = await getAllPopularRecipes();
          break;
        case "latest":
          response = await getAllLatestRecipes();
          break;
        default:
          return;
      }
      setResponse(response?.data[QUERY_DICTIONARY[param]?.query]);
    }
    if (param !== "") {
      fetchData();
    }
  }, [
    getAllLatestRecipes,
    getAllPopularRecipes,
    getAllrecomendedRecipes,
    param,
  ]);

  return response;
};

export default useViewAll;

export const QUERY_DICTIONARY = {
  recommended: {
    title: "Recommended",
    query: "getAllrecomendedRecipes",
    icon: faThumbsUp,
  },
  popular: {
    title: "Popular",
    query: "getAllpopularRecipes",
    icon: faFire,
  },
  latest: {
    title: "Recent",
    query: "getAllLatestRecipes",
    icon: faClock,
  },
};
