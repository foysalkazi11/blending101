import { useEffect, useMemo, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  ADD_RECIPE_TO_PLANNER,
  GET_ALL_PLANNER_RECIPES,
  GET_QUEUED_PLANNER_RECIPES,
} from "../../../graphql/Planner";
import { useAppSelector } from "../../../redux/hooks";
import { GET_BLEND_CATEGORY } from "../../../graphql/Recipe";

import styles from "../../../component/module/Planner/Queue.module.scss";
import Publish from "../../../helpers/Publish";

// FOR FETCHING BOTH RECIPE DISCOVERY & QUEUED RECIPE
interface IRecipeQueueHook {
  type: string;
  toggler: boolean;
  query: string;
  page: number;
}

const useRecipeQueue = (props: IRecipeQueueHook) => {
  const { type, toggler, query, page } = props;
  const [recipes, setRecipes] = useState([]);
  const [pageLength, setPageLength] = useState(1);
  const [limit] = useState(3);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [getRecipes, { loading: discoverLoading, data: discoverData }] =
    useLazyQuery(GET_ALL_PLANNER_RECIPES);
  const [getQueuedRecipes, { loading, data: queuedData }] = useLazyQuery(
    GET_QUEUED_PLANNER_RECIPES,
  );

  useEffect(() => {
    const blendCategory = type === "all" ? "" : type;
    if (userId !== "") {
      getRecipes({
        variables: {
          user: userId,
          searchTerm: query,
          page,
          limit,
          type: blendCategory,
        },
      });
      getQueuedRecipes({
        variables: {
          currentDate: format(new Date(), "yyyy-MM-dd"),
          user: userId,
          searchTerm: query,
          page,
          limit,
          type: blendCategory,
        },
      });
    }
  }, [getQueuedRecipes, getRecipes, limit, page, query, type, userId]);

  useEffect(() => {
    if (toggler) {
      setRecipes(discoverData?.getAllRecipesForPlanner?.recipes || []);
      setPageLength(
        Math.ceil(discoverData?.getAllRecipesForPlanner?.totalRecipe / limit) ||
          1,
      );
    } else {
      setRecipes(queuedData?.getQuedPlanner?.recipes || []);
      setPageLength(
        Math.ceil(queuedData?.getQuedPlanner?.totalRecipe / limit) || 1,
      );
    }
  }, [
    discoverData?.getAllRecipesForPlanner,
    limit,
    queuedData?.getQuedPlanner,
    toggler,
  ]);

  return { isLoading: discoverLoading || loading, recipes, pageLength, limit };
};

// FOR FILTERING BY RECIPE CATEGORY
const useRecipeCategory = () => {
  const { data } = useQuery(GET_BLEND_CATEGORY);

  const blendTypeRef = useRef<HTMLDivElement>(null);
  // Handling the Blendtype Combobox, When the search is focused/hovered it should be hidden or vice-versa
  const handleShow = () => {
    blendTypeRef?.current.classList.add(styles["blendType--show"]);
    blendTypeRef?.current.classList.remove(styles["blendType--hide"]);
  };
  const handleHide = () => {
    blendTypeRef?.current.classList.remove(styles["blendType--show"]);
    blendTypeRef?.current.classList.add(styles["blendType--hide"]);
  };

  const categories = useMemo(() => {
    return data?.getAllCategories
      ? [{ label: "All", value: "all" }, ...data?.getAllCategories]
      : [{ label: "All", value: "all" }];
  }, [data?.getAllCategories]);

  return {
    ref: blendTypeRef,
    categories,
    onShow: handleShow,
    onHide: handleHide,
  };
};

interface IAddRecipeToPlanHook {
  type: string;
  limit: number;
  query: string;
  page: number;
}

const useAddRecipeToMyPlan = (props: IAddRecipeToPlanHook) => {
  const { query, page, limit, type } = props;
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_QUEUED_PLANNER_RECIPES],
  });

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const addRecipeToPlanner = async (
    recipe: any,
    date: string,
    setShowCalenderId: any,
  ) => {
    await Publish({
      mutate: addRecipe,
      variables: {
        assignDate: date,
        recipeId: recipe?.recipeId?._id,
        userId,
      },
      state: addState,
      success: `Added Planner sucessfully`,
      onSuccess: (data) => {
        setShowCalenderId("");
      },
      onUpdate(cache) {
        const definition = {
          query: GET_QUEUED_PLANNER_RECIPES,
          variables: {
            currentDate: format(new Date(), "yyyy-MM-dd"),
            user: userId,
            searchTerm: query,
            page,
            limit,
            type,
          },
        };
        const { getQuedPlanner } = cache.readQuery<any>(definition);
        cache.writeQuery({
          ...definition,
          data: {
            getQuedPlanner: {
              recipes: [...getQuedPlanner.recipes, recipe],
            },
          },
        });
      },
    });
  };
  return addRecipeToPlanner;
};

export { useRecipeQueue, useRecipeCategory, useAddRecipeToMyPlan };
