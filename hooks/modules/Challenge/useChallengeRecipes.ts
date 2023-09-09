import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { format } from "date-fns";
import {
  ADD_RECIPE_TO_PLANNER,
  GET_ALL_PLANNER_RECIPES,
  GET_PLANNER_BY_WEEK,
} from "../../../modules/plan/plan.graphql";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { GET_CATEGORY_FOR_COMBOBOX } from "../../../graphql/Recipe";

import Publish from "../../../helpers/Publish";
import { setDayRecipe } from "../../../redux/slices/Planner.slice";
import { useUser } from "../../../context/AuthProvider";

interface IDiscoverRecipe {
  type: string;
  query: string;
  page: number;
  setPage: any;
}

const useDiscoveryQueue = (props: IDiscoverRecipe) => {
  const { type, query, page, setPage } = props;
  const [recipes, setRecipes] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [limit] = useState(10);

  const userId = useUser().id;

  const [getRecipes, { loading }] = useLazyQuery(GET_ALL_PLANNER_RECIPES);

  // OBSERVING THE LAST RECIPE POSITION OF THE LIST TO TRY TO FETCH MORE RECIPES
  const observer = useRef<any>();
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
    [loading, hasMore, setPage],
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

  return { loading, recipes, observer: lastRecipeRef };
};

const useQueuedRecipe = (days: any[]) => {
  const recipes = useMemo(() => {
    const recipes = [];
    days?.forEach((day) => {
      day?.posts.forEach((post) => {
        const image = post.images.length > 0 ? post.images[0] : { url: "", hash: "" };
        recipes.push({
          _id: post?._id,
          name: post?.name,
          image,
          category: post?.recipeBlendCategory,
          ingredients: post?.ingredients || [],
        });
      });
    });
    return recipes;
  }, [days]);

  return recipes;
};

interface IAddRecipeToPlanHook {
  type: string;
  limit?: number;
  query: string;
  page: number;
  week: any;
  isWeekFromURL: boolean;
}
/* 
  - To add recipes to planner list. From the recipes list of the left we can select any recipe to the calendar
*/
const useAddRecipeToMyPlan = (props: IAddRecipeToPlanHook) => {
  const { week, isWeekFromURL } = props;

  const router = useRouter();
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER);

  const userId = useUser().id;

  const addRecipeToPlanner = async (recipe: any, date: string, setShowCalenderId: any) => {
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
        const defaultFetch = !isWeekFromURL && router.query.start && router.query.end;
        const GetPlanByWeek = {
          query: GET_PLANNER_BY_WEEK,
          variables: {
            userId: userId,
            startDate: !defaultFetch ? format(week.start, "yyyy-MM-dd") : router.query.start,
            endDate: !defaultFetch ? format(week.end, "yyyy-MM-dd") : router.query.end,
          },
        };
        const { getPlannerByDates } = cache.readQuery<any>(GetPlanByWeek);
        cache.writeQuery({
          ...GetPlanByWeek,
          data: {
            getPlannerByDates: {
              ...getPlannerByDates,
              planners: getPlannerByDates?.planners?.map((plan) => {
                if (plan.formatedDate === date) {
                  return {
                    ...plan,
                    recipes: [
                      ...plan.recipes,
                      {
                        __typename: recipe.__typename,
                        recipeId: recipe.recipeId,
                        defaultVersion: {
                          ingredients: recipe.defaultVersion.ingredients,
                        },
                      },
                    ],
                  };
                }
                return plan;
              }),
            },
          },
        });
      },
    });
  };
  return addRecipeToPlanner;
};

const useFindQueuedRecipe = ([toggler, setToggler]) => {
  const parentWrapper = useRef(null);
  const queuedRecipes = useRef([]);

  const dispatch = useAppDispatch();
  const activeRecipe = useAppSelector((state) => state.planner.selectedDayRecipe);

  const addToRecipesRef = (element: HTMLDivElement) => {
    if (!toggler && element && !queuedRecipes.current.includes(element)) {
      queuedRecipes.current.push(element);
    }
  };

  useEffect(() => {
    const element = parentWrapper.current;
    function handleQueueScroll() {
      if (activeRecipe !== "") {
        dispatch(setDayRecipe(""));
      }
    }
    element.addEventListener("scroll", handleQueueScroll);
    return () => {
      element.removeEventListener("scroll", handleQueueScroll);
    };
  }, [activeRecipe, dispatch]);

  useEffect(() => {
    if (!activeRecipe || toggler || queuedRecipes.current.length === 0) return;
    queuedRecipes.current.forEach((element: HTMLDivElement) => {
      if (element && activeRecipe === element?.dataset?.recipe) {
        const top = element.offsetTop - element.offsetHeight;
        if (top > 1000) {
          window.scrollTo({ top: parentWrapper.current.offsetTop });
        }
        parentWrapper.current.scrollTo({
          top: element.offsetTop - element.offsetHeight,
          behavior: "smooth",
        });
      }
    });
    return;
  }, [activeRecipe, toggler]);

  return { parentRef: parentWrapper, recipeRef: addToRecipesRef };
};

export { useDiscoveryQueue, useQueuedRecipe, useAddRecipeToMyPlan, useFindQueuedRecipe };
