import React, { useEffect, useState } from "react";
import styles from "./wiki.module.scss";
import WikiRightComponent from "./WikiRight/WikiRight.component";
import WikiCenterComponent from "./WikiCenter/WikiCenter.component";
import AContainer from "../../containers/A.container";
import { useRouter } from "next/router";
import { useLazyQuery } from "@apollo/client";
import GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI from "../../gqlLib/wiki/query/getBlendNutritionBasedIngredientsWiki";
import GET_ALL_INGREDIENTS_BASED_ON_NURTITION from "../../gqlLib/wiki/query/getAllIngredientsBasedOnNutrition";
import { useAppDispatch } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import notification from "../utility/reactToastifyNotification";
import RightSide from "../recipe/recipeDetails/rightSide/RightSide";

function WikiComponent() {
  const router = useRouter();
  const { params = [] } = router?.query;
  const type = params?.[0] || "";
  const wikiId = params?.[1] || "";
  const meausermentWeight = params?.[2] || "";
  const dispatch = useAppDispatch();

  const [counter, setCounter] = useState(1);
  const [nutritionState, setNutritionState] = useState(null);
  const [singleElement, setsingleElement] = useState(false);
  const counterHandler = (value) => {
    setCounter(Number(value));
  };
  const adjusterFunc = (task) => {
    task === "+" && setCounter(Number(counter) + 1);
    task === "-" && counter > 1 && setCounter(Number(counter) - 1);
  };

  const [getAllIngredientsBasedOnNutrition, ingredientsData] = useLazyQuery(
    GET_ALL_INGREDIENTS_BASED_ON_NURTITION,
    { fetchPolicy: "network-only" }
  );
  const [getBlendNutritionBasedIngredientsWiki, nutritionData] = useLazyQuery(
    GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI,
    { fetchPolicy: "network-only" }
  );

  const fetchData = async () => {
    dispatch(setLoading(true));
    try {
      if (type === "Nutrient") {
        await getAllIngredientsBasedOnNutrition({
          variables: {
            data: {
              nutritionID: wikiId,
              category: "All",
            },
          },
        });
        dispatch(setLoading(false));
      }
      if (type === "Ingredient") {
        await getBlendNutritionBasedIngredientsWiki({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: wikiId,
                value: Number(meausermentWeight),
              },
            ],
          },
        });
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (wikiId) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiId]);

  if (ingredientsData?.error || nutritionData?.error) {
    return <div>Error</div>;
  }
  const dataObj = {
    Nutrient: ingredientsData?.data?.getAllIngredientsBasedOnNutrition,
    Ingredient: nutritionData?.data?.getBlendNutritionBasedIngredientsWiki,
  };
  //@ts-ignore
  const data = dataObj[type];

  return (
    <AContainer>
      <div className={styles.mainwiki}>
        <WikiCenterComponent
          author={data?.publishedBy}
          body={data?.bodies[0]}
          categroy={data?.category}
          coverImages={data?.wikiCoverImages}
          heading={`About ${data?.type}`}
          name={data?.wikiTitle}
        />
        {type === "Ingredient" ? (
          <RightSide
            nutritionData={data?.nutrients && JSON.parse(data?.nutrients)}
            counter={counter}
            counterHandler={counterHandler}
            nutritionState={nutritionState}
            setsingleElement={setsingleElement}
            singleElement={singleElement}
            adjusterFunc={adjusterFunc}
          />
        ) : (
          <WikiRightComponent
            ingredient={[
              { name: "Ginger", percent: 109, units: "kj" },
              { name: "Turmeric", percent: 95, units: "kj" },
              { name: "Chia Seeds", percent: 90, units: "kj" },
              { name: "Broth", percent: 80, units: "kj" },
              { name: "Sweet Potatoes", percent: 75, units: "kj" },
              { name: "Winter Squash", percent: 60, units: "kj" },
              { name: "Mint", percent: 55, units: "kj" },
              { name: "Pineapple", percent: 40, units: "kj" },
              { name: "Coconut Oil", percent: 35, units: "kj" },
            ]}
            nutrition={[
              { name: "Vitamin A", percent: 100, units: "kj" },
              { name: "Vitexin", percent: 90, units: "kj" },
              { name: "Vitamin D", percent: 87, units: "kj" },
              { name: "Iron", percent: 69, units: "kj" },
              { name: "Betaxanthins", percent: 50, units: "kj" },
              { name: "Calcium", percent: 35, units: "kj" },
              { name: "Quercetiin", percent: 20, units: "kj" },
            ]}
          />
        )}
      </div>
    </AContainer>
  );
}

export default WikiComponent;
