import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef } from "react";
import GET_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/query/getWikiCompareList";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import SubNav from "../../recipe/share/subNav/SubNav";
import s from "./WikiCompare.module.scss";
import Carousel from "../../../theme/carousel/SlickSlider";
import { compareRecipeResponsiveSetting, responsiveSetting } from "../../recipe/compareRecipe/utility";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import { WikiCompareList } from "../../../type/wikiCompareList";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import notification from "../../utility/reactToastifyNotification";
import Slider from "react-slick";
import WikiIngredientDetails from "../wikiIngredientDetails/WikiIngredinetDetails";
import { setLoading } from "../../../redux/slices/utilitySlice";
import { setDbUser } from "../../../redux/slices/userSlice";
import { useRouter } from "next/router";
import EMPTY_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/emptyWikiCompareList";
import ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/mutation/addOrRemoveToWikiCompareList";
import WikiCommentsTray from "../../sidetray/wikiCommentsTray";
import { useUser } from "context/AuthProvider";
import { updateWikiCompareCount } from "redux/slices/wikiSlice";

const compareRecipeResponsiveSettings = {
  ...compareRecipeResponsiveSetting,
  dotsClass: s.button__bar,
};

const WikiCompare = () => {
  const wikiCompareCount = useAppSelector((state) => state?.wiki.wikiCompareCount);
  const user = useUser();
  const [wikiCompareList, setWikiCompareList] = useLocalStorage<WikiCompareList[]>("wikiCompareList", []);
  const {
    data: wikiCompareData,
    loading: wikiCompareDataLoading,
    error: wikiCompareDataError,
  } = useQuery(GET_WIKI_COMPARE_LIST, {
    variables: { userId: user.id },
    // fetchPolicy: "cache-and-network",
  });
  const [emptyWikiCompareList] = useMutation(EMPTY_WIKI_COMPARE_LIST);
  const [addOrRemoveToWikiCompareList] = useMutation(ADD_OR_REMOVE_TO_WIKI_COMPARE_LIST);
  const sliderRef = useRef(null);
  const dispatch = useAppDispatch();
  const router = useRouter();

  // find single wiki items
  const findCompareRecipe = (id: string) => {
    return wikiCompareList?.find((item) => item?._id === id);
  };

  // compare wiki items
  const handleCompare = (item) => {
    if (wikiCompareList?.length >= 8) {
      notification("warning", "Can't add more than 8 compare Ingredient");
    } else {
      const findRecipe = findCompareRecipe(item?._id);
      if (!findRecipe) {
        setWikiCompareList((state) => [...state, item]);
      } else {
        notification("warning", "already exist");
      }
    }
  };

  // remove compare wiki entity
  const removeCompareWikiEntity = (id: string, e?: any) => {
    e?.stopPropagation();
    setWikiCompareList((state) => [...state.filter((item) => item?._id !== id)]);
  };

  // add Or Remove from WikiCompare List
  const handleAddOrRemoveToWikiCompareList = async (ingredientId: string, isCompared?: boolean) => {
    try {
      await addOrRemoveToWikiCompareList({
        variables: { ingredientId, userId: user.id },
        update(cache) {
          const { getWikiCompareList } = cache.readQuery<any>({
            query: GET_WIKI_COMPARE_LIST,
            variables: { userId: user.id },
          });

          cache?.writeQuery({
            query: GET_WIKI_COMPARE_LIST,
            variables: { userId: user.id },
            data: {
              getWikiCompareList: getWikiCompareList?.filter((item) => item?._id !== ingredientId),
            },
          });
        },
      });

      dispatch(updateWikiCompareCount(wikiCompareCount - 1));

      const isInCompareList = findCompareRecipe(ingredientId);
      if (isInCompareList) {
        removeCompareWikiEntity(ingredientId);
      }

      notification("info", `Remove form wiki compare list successfully`);
    } catch (error) {
      notification("error", "Failed to remove from compare list");
    }
  };

  // remove all wiki compare list items
  const handleEmptyWikiCompareList = async () => {
    dispatch(setLoading(true));
    try {
      await emptyWikiCompareList({ variables: { userId: user.id } });
      dispatch(updateWikiCompareCount(0));
      setWikiCompareList([]);
      router?.push("/wiki");
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", "Failed to empty wiki compare list");
    }
  };

  const updateCompareList = (compareList: any[]) => {
    if (compareList?.length === 1) {
      setWikiCompareList([{ ...compareList[0] }]);
    }
    if (compareList?.length === 2) {
      setWikiCompareList([...compareList?.slice(0, 2)]);
    }
    if (compareList?.length >= 3) {
      setWikiCompareList([...compareList?.slice(0, 3)]);
    }
  };

  useEffect(() => {
    if (!wikiCompareDataLoading && wikiCompareData?.getWikiCompareList?.length) {
      if (!wikiCompareList?.length) {
        updateCompareList(wikiCompareData?.getWikiCompareList);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wikiCompareData]);

  return (
    <React.Fragment>
      <WikiCommentsTray showPanle="left" showTagByDefaut={false} />
      <div className={s.wikiCompareContainer}>
        {wikiCompareDataLoading ? (
          <SkeletonComparePage />
        ) : (
          <>
            <SubNav
              backAddress="/wiki"
              backIconText="Wiki Discovery"
              showButton={false}
              compareAmout={wikiCompareCount}
              closeCompare={handleEmptyWikiCompareList}
            />

            <Carousel moreSetting={responsiveSetting}>
              {wikiCompareData?.getWikiCompareList?.map((item: WikiCompareList, index) => {
                return (
                  <SmallcardComponent
                    key={index}
                    text={item.wikiTitle}
                    img={
                      item?.featuredImage || item?.image || "https://blending.s3.us-east-1.amazonaws.com/7826404.png"
                    }
                    fnc={handleCompare}
                    recipe={item}
                    findCompareRecipe={findCompareRecipe}
                    fucUnCheck={removeCompareWikiEntity}
                    compareLength={wikiCompareList?.length}
                    handleRemoveFromCompare={(id) => handleAddOrRemoveToWikiCompareList(id)}
                    id={item?._id}
                  />
                );
              })}
            </Carousel>
          </>
        )}
        <div className={s.wikiIngredientContainer}>
          <Slider {...compareRecipeResponsiveSettings} ref={sliderRef}>
            {wikiCompareList?.map((item, index) => {
              return (
                <WikiIngredientDetails
                  key={index}
                  ingredient={item}
                  removeCompareRecipe={removeCompareWikiEntity}
                  handleAddOrRemoveToWikiCompareList={handleAddOrRemoveToWikiCompareList}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </React.Fragment>
  );
};

export default WikiCompare;
