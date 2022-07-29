import { useQuery } from "@apollo/client";
import React, { useRef } from "react";
import AContainer from "../../../containers/A.container";
import GET_WIKI_COMPARE_LIST from "../../../gqlLib/wiki/query/getWikiCompareList";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import SubNav from "../../recipe/share/subNav/SubNav";
import s from "./WikiCompare.module.scss";
import Carousel from "../../../theme/carousel/carousel.component";
import {
  compareRecipeResponsiveSetting,
  responsiveSetting,
} from "../../recipe/compareRecipe/utility";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import { WikiCompareList } from "../../../type/wikiCompareList";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import notification from "../../utility/reactToastifyNotification";
import Slider from "react-slick";
import WikiIngredientDetails from "../wikiIngredientDetails/WikiIngredinetDetails";

const WikiCompare = () => {
  const { dbUser } = useAppSelector((state) => state?.user);
  const {
    data: wikiCompareData,
    loading: wikiCompareDataLoading,
    error: wikiCompareDataError,
  } = useQuery(GET_WIKI_COMPARE_LIST, { variables: { userId: dbUser?._id } });
  const [wikiCompareList, setWikiCompareList] = useLocalStorage<
    WikiCompareList[]
  >("wikiCompareList", []);
  const sliderRef = useRef(null);

  const findCompareRecipe = (id: string) => {
    return wikiCompareList?.find((item) => item?._id === id);
  };

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

  const removeCompareRecipe = (id, e) => {
    e?.stopPropagation();
    setWikiCompareList((state) => [
      ...state.filter((item) => item?._id !== id),
    ]);
  };

  return (
    <AContainer headerTitle="Compare Ingredient">
      <div className={s.wikiCompareContainer}>
        {wikiCompareDataLoading ? (
          <SkeletonComparePage />
        ) : (
          <>
            <SubNav
              backAddress="/wiki"
              backIconText="Wiki Discovery"
              buttonText={"Compare"}
              showButton={false}
              buttonClick={() => {}}
              compareAmout={dbUser?.wikiCompareCount}
              closeCompare={() => {}}
            />

            <Carousel moreSetting={responsiveSetting}>
              {wikiCompareData?.getWikiCompareList?.map(
                (item: WikiCompareList, index) => {
                  return (
                    <SmallcardComponent
                      key={index}
                      text={item.wikiTitle}
                      img={
                        item?.featuredImage ||
                        item?.image ||
                        "https://blending.s3.us-east-1.amazonaws.com/7826404.png"
                      }
                      fnc={handleCompare}
                      recipe={item}
                      findCompareRecipe={findCompareRecipe}
                      fucUnCheck={removeCompareRecipe}
                      compareLength={wikiCompareList?.length}
                    />
                  );
                },
              )}
            </Carousel>
          </>
        )}
        <div className={s.wikiIngredientContainer}>
          <Slider {...compareRecipeResponsiveSetting} ref={sliderRef}>
            {wikiCompareList?.map((item, index) => {
              return (
                <WikiIngredientDetails
                  key={index}
                  ingredient={item}
                  removeCompareRecipe={removeCompareRecipe}
                />
              );
            })}
          </Slider>
        </div>
      </div>
    </AContainer>
  );
};

export default WikiCompare;
