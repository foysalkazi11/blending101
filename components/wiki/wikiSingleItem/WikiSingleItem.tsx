import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import AContainer from "../../../containers/A.container";
import GET_ALL_INGREDIENTS_BASED_ON_NURTITION from "../../../gqlLib/wiki/query/getAllIngredientsBasedOnNutrition";
import GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI from "../../../gqlLib/wiki/query/getBlendNutritionBasedIngredientsWiki";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setLoading } from "../../../redux/slices/utilitySlice";
import NutritionPanel from "../../recipe/share/nutritionPanel/NutritionPanel";
import notification from "../../utility/reactToastifyNotification";
import WikiCenterComponent from "../WikiCenter/WikiCenter.component";
import WikiRightComponent from "../WikiRight/WikiRight.component";
import styles from "../wiki.module.scss";
import { useRouter } from "next/router";
import RelatedWikiItem from "./realtedWikiItem/RelatedWikiItem";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import { GiGl } from "../../../type/nutrationType";

const placeHolderImage = ["/images/no-image-available.webp"];

interface Props {
  type?: string;
  wikiId?: string;
  measurementWeight?: string;
}

function WikiSingleItem() {
  const [defaultMeasureMentWeight, setDefaultMeasureMentWeight] =
    useState(null);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { params = [] } = router?.query;
  const type = params?.[0] || "Ingredient";
  const wikiId = params?.[1] || "";
  const measurementWeight = params?.[2] || "";
  const { dbUser } = useAppSelector((state) => state?.user);
  const [getAllIngredientsBasedOnNutrition, ingredientsData] = useLazyQuery(
    GET_ALL_INGREDIENTS_BASED_ON_NURTITION,
    { fetchPolicy: "network-only" },
  );
  const [getBlendNutritionBasedIngredientsWiki, nutritionData] = useLazyQuery(
    GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI,
    { fetchPolicy: "network-only" },
  );

  const [
    getNutrientsListAndGiGlByIngredients,
    {
      data: nutritionPanelData,
      loading: nutritionPanelDataLoading,
      error: nutritionPanelError,
    },
  ] = useLazyQuery(GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS);

  const fetchNutritionPanelData = async () => {
    try {
      await getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo: [
            {
              ingredientId: wikiId,
              value: parseInt(defaultMeasureMentWeight),
            },
          ],
          userId: dbUser?._id,
        },
      });
    } catch (error) {
      notification("error", "Failed to nutrition panel data");
    }
  };

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
            userId: dbUser?._id,
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
                value: parseInt(measurementWeight),
              },
            ],
            userId: dbUser?._id,
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
      setDefaultMeasureMentWeight(measurementWeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiId]);

  useEffect(() => {
    if (defaultMeasureMentWeight) {
      fetchNutritionPanelData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultMeasureMentWeight]);

  if (ingredientsData?.error || nutritionData?.error) {
    return <div>Error</div>;
  }
  const dataObj = {
    Nutrient: ingredientsData?.data?.getAllIngredientsBasedOnNutrition,
    Ingredient: nutritionData?.data?.getBlendNutritionBasedIngredientsWiki,
  };
  //@ts-ignore
  const data = dataObj[type];
  const nutrients =
    nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl =
    nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <AContainer
      showWikiCommentsTray={{
        show: true,
        showPanle: "right",
        showTagByDeafult: false,
      }}
    >
      <div className={styles.singleWikiItemContainer}>
        <RelatedWikiItem type={type} />

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
          giGl={giGl}
          type={data?.type}
          wikiId={wikiId}
          commentsCount={data?.commentsCount}
        />
        <>
          {type === "Ingredient" ? (
            <NutritionPanel
              nutritionTrayData={nutrients ? JSON?.parse(nutrients) : {}}
              showUser={true}
              counter={1}
              nutritionDataLoading={nutritionPanelDataLoading}
              showServing={false}
              measurementDropDownState={{
                showDropDown: true,
                value: defaultMeasureMentWeight,
                handleChange: (e) =>
                  setDefaultMeasureMentWeight(e?.target?.value),
                listElem: data?.portions?.map((item) => ({
                  name: item?.measurement,
                  value: item?.meausermentWeight,
                })),
              }}
            />
          ) : (
            <WikiRightComponent
              ingredient={data?.ingredients}
              wikiId={wikiId}
            />
          )}
        </>
      </div>
    </AContainer>
  );
}

export default WikiSingleItem;
