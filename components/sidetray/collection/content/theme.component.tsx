import { useQuery } from "@apollo/client";
import React from "react";
import GET_RECIPE_WIDGET from "../../../../gqlLib/recipes/queries/getRecipeWidget";
import Widget from "../../../../component/module/Widget/Widget.component";

export default function ThemeComponent(props) {
  const { data } = useQuery(GET_RECIPE_WIDGET);

  // const data = [
  //   { title: "Valentine", img: "/cards/valentine.png" },
  //   { title: "Children", img: "/cards/children.png" },
  //   { title: "Diabetes", img: "/cards/diabetes.png" },
  //   { title: "Weight Loss", img: "/cards/food.png" },
  //   { title: "Children", img: "/cards/children.png" },
  //   { title: "Diabetes", img: "/cards/diabetes.png" },
  // ];

  return <Widget widget={data?.getWidgetsForClient} type="GRID" />;
}
