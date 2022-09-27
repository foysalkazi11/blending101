import { useLazyQuery, useQuery } from "@apollo/client";
import { faClock, faFire, faThumbsUp } from "@fortawesome/pro-light-svg-icons";
import { useState, useEffect, useMemo } from "react";
import Icon from "../../component/atoms/Icon/Icon.component";

import GET_ALL_LATEST_RECIPES from "../../gqlLib/recipes/queries/getAllLatestRecipes";
import GET_ALL_POPULAR_RECIPES from "../../gqlLib/recipes/queries/getAllPopularRecipes";
import GET_ALL_RECOMMENDED_RECIPES from "../../gqlLib/recipes/queries/getRecommendedRecipes";
import { GET_GRID_WIDGET_DATA } from "../../graphql/Widget";
import { useAppSelector } from "../../redux/hooks";

const useViewAll = (params: string[], widgetId: string) => {
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
      switch (params[0]) {
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
      setResponse(response?.data[QUERY_DICTIONARY[params[0]]?.query]);
    }
    if (params && params[0]) {
      fetchData();
    }
  }, [
    getAllLatestRecipes,
    getAllPopularRecipes,
    getAllrecomendedRecipes,
    params,
    widgetId,
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
    title: "Recommended",
    query: "getAllpopularRecipes",
    icon: faClock,
  },
  latest: {
    title: "Recommended",
    query: "getAllLatestRecipes",
    icon: faFire,
  },
};
