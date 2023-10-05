import { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "redux/hooks";
import { setDayRecipe } from "redux/slices/Planner.slice";
import { UserRecipe } from "../recipe.types";

const useFindRecipe = (toggler) => {
  const parentWrapper = useRef(null);
  const queuedRecipes = useRef<HTMLElement[]>([]);

  const dispatch = useAppDispatch();
  const activeRecipe = useAppSelector((state) => state.planner.selectedDayRecipe);

  // Adding all the recipes to a immutable state
  const addRecipesToList = (element: HTMLDivElement) => {
    if (!toggler && element && !queuedRecipes.current.includes(element)) {
      queuedRecipes.current.push(element);
    }
  };

  // Resetting the selected day when scrolling, So that recipe position get resetted
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
  // Finding the recipe position of the selected day & ayto scroll to that position
  useEffect(() => {
    if (!activeRecipe || toggler || queuedRecipes.current.length === 0) return;
    queuedRecipes.current.forEach((element: HTMLDivElement) => {
      if (element && activeRecipe === element?.dataset?.recipe) {
        console.log(element?.dataset?.recipe);

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

  return { parentRef: parentWrapper, queueRef: addRecipesToList };
};

export default useFindRecipe;
