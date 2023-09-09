import { MOVE_PLANNER, GET_PLANNER_BY_WEEK } from "@/plan/plan.graphql";
import { useMutation } from "@apollo/client";
import Publish from "helpers/Publish";

const useMoveRecipe = () => {
  const [moveRecipes, moveState] = useMutation(MOVE_PLANNER, {
    refetchQueries: [GET_PLANNER_BY_WEEK],
  });
  const moveHandler = async (plannerId: string, date: string, recipeId: string) => {
    await Publish({
      mutate: moveRecipes,
      variables: {
        data: {
          plannerId,
          assignDate: date,
          recipeId,
        },
      },
      state: moveState,
      success: `Moved Planner sucessfully`,
    });
  };
  return moveHandler;
};

export default useMoveRecipe;
