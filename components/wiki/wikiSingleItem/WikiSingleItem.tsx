import { useLazyQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import GET_ALL_INGREDIENTS_BASED_ON_NURTITION from "../../../gqlLib/wiki/query/getAllIngredientsBasedOnNutrition";
import GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI from "../../../gqlLib/wiki/query/getBlendNutritionBasedIngredientsWiki";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { updateSidebarActiveMenuName } from "../../../redux/slices/utilitySlice";
import NutritionPanel from "../../recipe/share/nutritionPanel/NutritionPanel";
import notification from "../../utility/reactToastifyNotification";
import WikiCenterComponent from "../WikiCenter";
import WikiRightComponent from "../WikiRight";
import styles from "../wiki.module.scss";
import { useRouter } from "next/router";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";
import { GiGl } from "../../../type/nutrationType";
import { WikiDetailsIngredientType } from "../../../type/wikiDetailsType";
import useWindowSize from "../../utility/useWindowSize";
import ShowRelatedItems from "../../showRelatedItems";
import dummyData from "./dummyData";
import ErrorPage from "../../pages/404Page";
import { RecipeDetailsMiddle } from "../../../theme/skeletons/skeletonRecipeDetails";
import { useUser } from "../../../context/AuthProvider";
import RelatedWikiItem from "./realtedWikiItem/RelatedWikiItem";
import WikiCommentsTray from "components/sidetray/wikiCommentsTray";
import WikiShareModal from "../wikiShareModal";
import { useSelector } from "react-redux";
import { setIsOpenWikiShareModal } from "redux/slices/wikiSlice";
import Meta from "theme/meta";
export const placeHolderImage = "/images/no-image-available.webp";

interface Props {
  type?: string;
  wikiId?: string;
  measurementWeight?: string;
}

function WikiSingleItem() {
  const [defaultMeasureMentWeight, setDefaultMeasureMentWeight] = useState("");
  const [scrollPoint, setScrollPoint] = useState("");
  const [currentWikiId, setCurrentWikiId] = useState("");
  const [portions, setPortions] = useState<any[]>([]);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { params = [] } = router?.query;
  const type: string = params?.[0] || "Ingredient";
  const wikiId = params?.[1] || "";
  const params2 = params?.[2] || "0";
  const user = useUser();
  const isOpenWikiShareModal = useAppSelector((state) => state.wiki.isOpenWikiShareModal);
  const [getAllIngredientsBasedOnNutrition, ingredientsData] = useLazyQuery(GET_ALL_INGREDIENTS_BASED_ON_NURTITION, {
    // fetchPolicy: "network-only",
  });
  const [getBlendNutritionBasedIngredientsWiki, nutritionData] = useLazyQuery(
    GET_BLEND_NUTRITION_BASED_IN_INGREDIENTS_WIKI,
    // { fetchPolicy: "network-only" },
  );
  const { width } = useWindowSize();

  const [
    getNutrientsListAndGiGlByIngredients,
    { data: nutritionPanelData, loading: nutritionPanelDataLoading, error: nutritionPanelError },
  ] = useLazyQuery(GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS);

  const fetchNutritionPanelData = async (measureMentWeight: string, id?: string) => {
    try {
      await getNutrientsListAndGiGlByIngredients({
        variables: {
          ingredientsInfo: [
            {
              ingredientId: id || currentWikiId,
              value: parseInt(measureMentWeight || params2 || defaultMeasureMentWeight),
            },
          ],
          userId: user.id,
        },
      });
    } catch (error) {
      notification("error", "Failed to fetch nutrition panel data");
    }
  };

  const fetchData = async (id?: string, measureMentWeight?: string) => {
    try {
      if (type === "Nutrient") {
        await getAllIngredientsBasedOnNutrition({
          variables: {
            data: {
              nutritionID: id || wikiId,
              category: "All",
            },
            userId: user.id,
          },
        });
      }
      if (type === "Ingredient") {
        const { data } = await getBlendNutritionBasedIngredientsWiki({
          variables: {
            ingredientsInfo: [
              {
                ingredientId: id || wikiId,
                value: parseInt(measureMentWeight || params2),
              },
            ],
            userId: user.id,
          },
        });

        const res: WikiDetailsIngredientType = data?.getBlendNutritionBasedIngredientsWiki2;
        setPortions(res?.portions);
      }
    } catch (error) {
      console.log(error);
      notification("error", error?.message);
    }
  };

  useEffect(() => {
    if (wikiId) {
      fetchData(wikiId, params2);
      setCurrentWikiId(wikiId);
      setDefaultMeasureMentWeight(params2);
      if (type === "Ingredient") {
        fetchNutritionPanelData(params2, wikiId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiId]);

  useEffect(() => {
    const hash = window.location.hash;

    if (hash?.slice(0, 1) === "#") {
      setScrollPoint(hash?.slice(1));
    }
  }, []);

  useEffect(() => {
    dispatch(updateSidebarActiveMenuName("Wiki"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (ingredientsData?.error || nutritionData?.error) {
    return <ErrorPage errorMessage={`Type not found !!!`} />;
  }
  const dataObj = {
    Nutrient: ingredientsData?.data?.getAllIngredientsBasedOnNutrition2,
    Ingredient: nutritionData?.data?.getBlendNutritionBasedIngredientsWiki2,
  };

  const data = dataObj[type];
  const nutrients = nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.nutrients;
  const giGl: GiGl = nutritionPanelData?.getNutrientsListAndGiGlByIngredients?.giGl;

  return (
    <>
      <Meta
        title={data?.wikiTitle}
        description={data?.wikiDescription}
        ogImage={data?.wikiCoverImages?.[0]}
        url={window?.location?.href || ""}
      />
      <WikiCommentsTray showTagByDefaut={false} showPanle={"right"} />
      <div className={styles.singleWikiItemContainer}>
        {/* <div className={styles.left}>
          <RelatedWikiItem
            type={type}
            wikiList={data?.relatedWikis?.wikiList}
            total={data?.relatedWikis?.total}
            loading={ingredientsData?.loading || nutritionData?.loading}
            viewItems={width > 1280 ? "list" : "slider"}
          />
        </div> */}

        <div className={styles.center}>
          {ingredientsData?.loading || nutritionData?.loading ? (
            <RecipeDetailsMiddle />
          ) : (
            <WikiCenterComponent
              author={data?.author?.displayName || data?.author?.firstName || data?.author?.lastName || ""}
              body={data?.bodies}
              categroy={data?.category}
              coverImages={data?.wikiCoverImages}
              heading={`About ${data?.type}`}
              name={data?.wikiTitle}
              description={data?.wikiDescription}
              giGl={giGl}
              type={data?.type}
              wikiId={wikiId}
              commentsCount={data?.commentsCount}
              scrollPoint={scrollPoint}
              ingredientBookmarkList={data?.ingredientBookmarkList || []}
              nutrientBookmarkList={data?.nutrientBookmarkList || []}
              fetchNutritionPanelData={fetchNutritionPanelData}
              setDefaultMeasureMentWeight={setDefaultMeasureMentWeight}
              setCurrentWikiId={setCurrentWikiId}
              setPortions={setPortions}
              originalPortions={data?.portions}
            />
          )}
        </div>
        <div className={styles.right}>
          {type === "Ingredient" && (
            <NutritionPanel
              nutritionTrayData={nutrients ? JSON?.parse(nutrients) : {}}
              showUser={true}
              counter={1}
              nutritionDataLoading={nutritionPanelDataLoading}
              showServing={false}
              measurementDropDownState={{
                showDropDown: true,
                value: defaultMeasureMentWeight,
                onChange: (e) => {
                  setDefaultMeasureMentWeight(e?.target?.value);
                  fetchNutritionPanelData(e?.target?.value);
                },
                listElem: portions?.map((item) => ({
                  name: `1 ${item?.measurement} (${item?.meausermentWeight}g)`,
                  value: item?.meausermentWeight,
                })),
              }}
              isNutrientPanelHasMyFacts={true}
              wikiId={wikiId}
            />
          )}
          {type === "Nutrient" && (
            <WikiRightComponent
              ingredient={data?.ingredients}
              wikiId={currentWikiId}
              ingredientsDataLoading={ingredientsData?.loading}
              isIngredientHasMyFacts={true}
              mainWikiId={wikiId}
            />
          )}
        </div>
      </div>
      {/* {width < 1280 ? (
        <RelatedWikiItem
          type={type}
          wikiList={data?.relatedWikis?.wikiList}
          total={data?.relatedWikis?.total}
          loading={ingredientsData?.loading || nutritionData?.loading}
          viewItems="slider"
        />
      ) : // <ShowRelatedItems category="wiki" title={`Related ${type}`} itemsList={data?.relatedWikis?.wikiList} />
      null} */}

      <WikiShareModal
        heading="Share Wiki"
        title={data?.wikiTitle}
        image={data?.wikiCoverImages?.[0]}
        openModal={isOpenWikiShareModal}
        setOpenModal={(value) => dispatch(setIsOpenWikiShareModal(value))}
      />
    </>
  );
}

export default WikiSingleItem;
