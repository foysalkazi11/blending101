import React from "react";
import CreateNewRecipe from "../../../recipe/share/createNewRecipe/CreateNewRecipe";
import RecipeDetails from "../../../recipe/share/recipeDetails/RecipeDetails";

const VersionDetailsIndex = (props) => {
  const {
    index = 0,
    newRecipe,
    setNewRecipe,
    handleUpdateData,
    singleVersionsEditMode,
    handleSubmitEditedVersion,
    handleEditMode,
    versionUpdateLoading,
    ...rest
  } = props;

  return (
    <>
      {singleVersionsEditMode === index ? (
        <CreateNewRecipe
          newRecipe={newRecipe}
          setNewRecipe={setNewRecipe}
          updateData={handleUpdateData}
          closeCreateNewRecipeInterface={() => handleEditMode(false, null)}
          disableCategory={true}
          disableImageUpload={true}
          handleCreateNewRecipe={(e) => handleSubmitEditedVersion()}
          recipeSaveLoading={versionUpdateLoading}
        />
      ) : (
        <RecipeDetails {...rest} />
      )}
    </>
  );
};

const SingleVersionRecipe = (versions: any[]) => {};

export default VersionDetailsIndex;
