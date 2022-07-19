import { useLazyQuery } from "@apollo/client";
import React, { useEffect } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_INGREDIENTS_BASED_ON_NURTITION from "../../../gqlLib/wiki/query/getAllIngredientsBasedOnNutrition";
import GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI from "../../../gqlLib/wiki/query/getBlendNutritionBasedIngredientsWiki";
import { useAppDispatch } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import NutritionPanel from "../../recipe/share/nutritionPanel/NutritionPanel";
import notification from "../../utility/reactToastifyNotification";
import WikiCenterComponent from "../WikiCenter/WikiCenter.component";
import WikiRightComponent from "../WikiRight/WikiRight.component";
import styles from "../wiki.module.scss";

const placeHolderImage = ["/images/no-image-available.webp"];

interface Props {
  type?: string;
  wikiId?: string;
  measurementWeight?: string;
}

function WikiSingleItem({
  measurementWeight = "",
  type = "",
  wikiId = "",
}: Props) {
  const dispatch = useAppDispatch();

  const [getAllIngredientsBasedOnNutrition, ingredientsData] = useLazyQuery(
    GET_ALL_INGREDIENTS_BASED_ON_NURTITION,
    { fetchPolicy: "network-only" },
  );
  const [getBlendNutritionBasedIngredientsWiki, nutritionData] = useLazyQuery(
    GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI,
    { fetchPolicy: "network-only" },
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
                value: Number(measurementWeight),
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
    <div className={styles.mainwiki}>
      <WikiCenterComponent
        author={data?.publishedBy}
        body={data?.bodies[0]}
        categroy={data?.category}
        coverImages={
          data?.wikiCoverImages.length
            ? data?.wikiCoverImages
            : placeHolderImage
        }
        heading={`About ${data?.type}`}
        name={data?.wikiTitle}
      />
      <div style={{ margin: "0 10px" }}>
        {type === "Ingredient" ? (
          <NutritionPanel
            nutritionTrayData={
              data?.nutrients ? JSON?.parse(data?.nutrients) : {}
            }
            showUser={false}
            counter={1}
            nutritionDataLoading={data?.loading}
            showServing={false}
          />
        ) : (
          <WikiRightComponent ingredient={data?.ingredients} wikiId={wikiId} />
        )}
      </div>
    </div>
  );
}

export default WikiSingleItem;
