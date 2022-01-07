import React from 'react';
import dynamic from "next/dynamic";
const RecipeScreen = dynamic(() => import("../theme/recipeDiscovery/recipeDiscovery.component"), {
  ssr: false,
});

export default function recipe_details() {
    return (
        <div>
            <RecipeScreen/>
        </div>
    )
};
