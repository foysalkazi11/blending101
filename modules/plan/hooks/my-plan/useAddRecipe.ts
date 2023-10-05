import { useMutation } from "@apollo/client";
import { useUser } from "context/AuthProvider";
import { ADD_RECIPE_TO_PLANNER, GET_QUEUED_PLANNER_RECIPES } from "@/plan/plan.graphql";
import Publish from "helpers/Publish";

interface IAddRecipeToPlan {
  onSuccess?: () => void;
  onUpdate?: () => void;
}

const useAddRecipeToMyPlan = (args?: IAddRecipeToPlan) => {
  const [addRecipe, addState] = useMutation(ADD_RECIPE_TO_PLANNER, {
    refetchQueries: [GET_QUEUED_PLANNER_RECIPES],
  });
  const { id: userId } = useUser();

  const addRecipeToPlan = async (recipeId: string, date: string) => {
    await Publish({
      mutate: addRecipe,
      variables: {
        assignDate: date,
        recipeId: recipeId,
        userId,
      },
      state: addState,
      success: `Added Planner sucessfully`,
      onSuccess: args?.onSuccess,
      onUpdate: args?.onUpdate,
    });
  };
  return addRecipeToPlan;
};

export default useAddRecipeToMyPlan;
