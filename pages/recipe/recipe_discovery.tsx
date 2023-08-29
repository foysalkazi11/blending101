import React from "react";
import RecipeScreen from "../../components/recipe/recipeDiscovery";

function Recipe_Discovery() {
  return <RecipeScreen />;
}

Recipe_Discovery.meta = {
  icon: "/icons/juicer.svg",
  title: "Recipe Discovery",
  sidebar: true,
};

export default Recipe_Discovery;
