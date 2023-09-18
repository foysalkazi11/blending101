/*
  ||||||||||||||||||||||||||||||||||||
    ALL THE RECIPES LIST FOR PLAN DISCOVERY 
  ||||||||||||||||||||||||||||||||||||
*/

import { useLazyQuery } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { useState, useRef, useCallback, useEffect } from "react";
import { GET_ALL_PLANNER_RECIPES } from "../plan.graphql";

interface usePlanRecipesTypes {
  type: string;
  query: string;
  page: number;
  setPage: any;
}

const usePlanRecipes = (props: usePlanRecipesTypes) => {
  const { type, query, page, setPage } = props;
  const [recipes, setRecipes] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [limit] = useState(10);

  const userId = useUser().id;

  const [getRecipes, { loading }] = useLazyQuery(GET_ALL_PLANNER_RECIPES);

  // OBSERVING THE LAST RECIPE POSITION OF THE LIST TO TRY TO FETCH MORE RECIPES
  const observer = useRef(null);
  const lastRecipeRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, observer, hasMore, setPage],
  );

  // RESETTING RECIPES ON QUERY OR CATEGORY CHANGE
  useEffect(() => {
    setRecipes([]);
  }, [query, type]);

  // STORING THE FORMATTED DATA IN THE STATE
  useEffect(() => {
    const blendCategory = type === "all" ? "" : type;
    if (userId !== "") {
      getRecipes({
        variables: {
          user: userId,
          limit,
          type: blendCategory,
          searchTerm: query,
          page,
        },
      }).then((response) => {
        const data = response.data?.getAllRecipesForPlanner;
        setRecipes((prevRecipes) => [...prevRecipes, ...data?.recipes]);
        setHasMore(data?.recipes?.length > 0);
      });
    }
  }, [getRecipes, limit, page, query, type, userId]);

  return { loading, recipes, discoverRef: lastRecipeRef };
};

export default usePlanRecipes;
