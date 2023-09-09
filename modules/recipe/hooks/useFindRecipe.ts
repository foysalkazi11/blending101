import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setDayRecipe } from "redux/slices/Planner.slice";

const useFindRecipe = (toggler) => {
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

export default useFindRecipe;
