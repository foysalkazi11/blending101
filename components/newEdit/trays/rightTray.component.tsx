import { useQuery } from "@apollo/client";
import React from "react";
import { GET_RECIPE_NUTRITION } from "../../../gqlLib/recipes/queries/getEditRecipe";

function RightTrayEdit({ ingredients }) {
//   const {data} = useQuery(GET_RECIPE_NUTRITION());
  console.log(ingredients);
  return <div>RightTrayEdit</div>;
}

export default RightTrayEdit;
