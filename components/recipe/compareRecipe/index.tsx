import React, { useState, useRef, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import SubNav from "../share/subNav/SubNav";
import styles from "./compareRecipe.module.scss";
import { useRouter } from "next/router";
import list from "../fackData/racipeList";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import Carousel from "../../../theme/carousel/carousel.component";
import Slider from "react-slick";
import RecipeDetails from "../share/recipeDetails/RecipeDetails";
import SliderArrows from "../share/sliderArrows/SliderArrows";
import { useQuery } from "@apollo/client";
import GET_COMPARE_LIST from "../../../gqlLib/compare/query/getCompareList";
import { useAppSelector } from "../../../redux/hooks";
import SkeletonComparePage from "../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";
import notification from "../../utility/reactToastifyNotification";
import useLocalStorage from "../../../customHooks/useLocalStorage";
import { DragDropContext } from "react-beautiful-dnd";
import CreateNewRecipe from "../share/createNewRecipe/CreateNewRecipe";
import {
  responsiveSetting,
  compareRecipeResponsiveSetting,
  formulateRecipeResponsiveSetting,
} from "./utility";
import useWindowSize from "../../utility/useWindowSize";

const CompareRecipe = () => {
  const [isFormulatePage, setIsFormulatePage] = useState(false);
  const router = useRouter();
  const [recipeList, setRecipeList] = useState([]);
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage(
    "compareList",
    []
  );
  const sliderRef = useRef(null);
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data, loading, error } = useQuery(GET_COMPARE_LIST, {
    variables: { userId: dbUser?._id },
    fetchPolicy: "network-only",
  });
  const windowSize = useWindowSize();
  const [newRecipe, setNewRecipe] = useState<{}>({
    id: 456,
    name: "",
    image: "",
    ingredients: [],
    nutrition: [
      {
        section: "Energy",
        amount: [],
      },
      {
        section: "Vitamins",
        amount: [],
      },
      {
        section: "Minerals",
        amount: [],
      },
      {
        section: "Phythonutrients",
        amount: [],
      },
    ],
  });

  console.log(recipeList);

  useEffect(() => {
    if (!loading) {
      setRecipeList([...data?.getCompareList]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const findCompareRecipe = (id: string) => {
    const item = compareRecipeList?.find((item) => item?._id === id);
    return item ? true : false;
  };

  const handleCompare = (recipe) => {
    if (compareRecipeList?.length >= 4) {
      const findRecipe = findCompareRecipe(recipe?._id);
      if (!findRecipe) {
        let copyCompareRecipe = [...compareRecipeList];
        copyCompareRecipe.pop();
        copyCompareRecipe.unshift(recipe);
        setcompareRecipeList(copyCompareRecipe);
      } else {
        notification("info", "alredy exist");
      }
    } else {
      setcompareRecipeList((state) => [...state, recipe]);
    }
  };

  const removeCompareRecipe = (recipe) => {
    setcompareRecipeList((state) => [
      ...state.filter((item) => item?._id !== recipe?._id),
    ]);
  };

  const responsiveGridTemplateColumn = () => {
    const length = compareRecipeList?.length;
    switch (length) {
      case 1:
        return "50% 50%";
      case 2:
        return "33.33% 66.66%";

      default:
        return "25% 75%";
    }
  };

  return (
    <AContainer showLeftTray={false} logo={false} headerTitle="Compare Recipe">
      <div className={styles.mainContentDiv}>
        <div className={styles.CompareContainer}>
          {loading ? (
            <SkeletonComparePage />
          ) : (
            <>
              <SubNav
                backAddress="/recipe_discovery"
                backIconText="Recipe Discovery"
                buttonText={isFormulatePage ? "Compare" : "Formulate"}
                showButton={true}
                buttonClick={() => setIsFormulatePage((pre) => !pre)}
                compareAmout={dbUser?.compareLength}
                closeCompare={() => setcompareRecipeList([])}
              />
              <Carousel moreSetting={responsiveSetting}>
                {recipeList?.map((recipe, index) => {
                  return (
                    <SmallcardComponent
                      key={index}
                      imgHeight={undefined}
                      text={recipe?.name}
                      //@ts-ignore
                      img={recipe?.image[0]?.image}
                      fnc={handleCompare}
                      recipe={recipe}
                      findCompareRecipe={findCompareRecipe}
                      fucUnCheck={removeCompareRecipe}
                      conpareLength={compareRecipeList.length}
                    />
                  );
                })}
              </Carousel>
              {windowSize?.width > 768 ? (
                <SliderArrows
                  compareRecipeLength={compareRecipeList.length}
                  prevFunc={() => sliderRef.current?.slickPrev()}
                  nextFunc={() => sliderRef.current?.slickNext()}
                />
              ) : null}

              {isFormulatePage ? (
                <DragDropContext onDragEnd={() => {}}>
                  <div
                    className={styles.comparePageContainer}
                    // style={{
                    //   gridTemplateColumns: responsiveGridTemplateColumn(),
                    // }}
                  >
                    <div>
                      <CreateNewRecipe
                        newRecipe={newRecipe}
                        setNewRecipe={setNewRecipe}
                        deleteItem={() => {}}
                      />
                    </div>

                    <div>
                      {windowSize?.width <= 768 ? (
                        <div style={{ marginTop: "16px" }}>
                          <SliderArrows
                            compareRecipeLength={compareRecipeList.length}
                            prevFunc={() => sliderRef.current?.slickPrev()}
                            nextFunc={() => sliderRef.current?.slickNext()}
                          />
                        </div>
                      ) : null}
                      <Slider
                        {...formulateRecipeResponsiveSetting(
                          compareRecipeList?.length
                        )}
                        ref={sliderRef}
                      >
                        {compareRecipeList?.map((recipe, index) => {
                          return (
                            <RecipeDetails
                              key={index}
                              recipe={recipe}
                              removeCompareRecipe={removeCompareRecipe}
                              dragAndDrop={true}
                            />
                          );
                        })}
                      </Slider>
                    </div>
                  </div>
                </DragDropContext>
              ) : (
                <Slider {...compareRecipeResponsiveSetting} ref={sliderRef}>
                  {compareRecipeList?.map((recipe, index) => {
                    return (
                      <RecipeDetails
                        key={index}
                        recipe={recipe}
                        removeCompareRecipe={removeCompareRecipe}
                      />
                    );
                  })}
                </Slider>
              )}
            </>
          )}
        </div>
      </div>
    </AContainer>
  );
};

export default CompareRecipe;
