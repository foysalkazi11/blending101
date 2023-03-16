import { useMutation } from "@apollo/client";
import notification from "../components/utility/reactToastifyNotification";
import ADD_VERSION from "../gqlLib/versions/mutation/addVersion";
import { VersionAddDataType } from "../type/versionAddDataType";

const useToAddARecipeVersion = () => {
  const [addVersion, { ...rest }] = useMutation(ADD_VERSION);

  const handleToAddRecipeVersion = async (
    versionAddData: VersionAddDataType,
  ) => {
    const {
      description = "",
      postfixTitle = "",
      recipeId,
      ingredients = [],
      recipeInstructions = [],
      servingSize = 0,
      userId,
    } = versionAddData;
    if (!postfixTitle) {
      notification("info", `Please enter a title`);
      return;
    }

    try {
      const { data } = await addVersion({
        variables: {
          data: {
            recipeId,
            postfixTitle: postfixTitle,
            description: description,
            userId,
            ingredients,
            recipeInstructions,
            servingSize,
          },
        },
      });
      return data?.addVersion;
    } catch (error) {
      notification("error", `Recipe version create failed`);
    }
  };

  return { handleToAddRecipeVersion, ...rest };
};

export default useToAddARecipeVersion;
