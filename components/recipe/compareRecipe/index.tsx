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
  reorder,
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
  const [newRecipe, setNewRecipe] = useState({
    name: null,
    image: null,
    userId: dbUser?._id,
    description: null,
    ingredients: [],
    recipeBlendCategory: "61cafc34e1f3e015e7936587",
  });

  console.log(recipeList);

  useEffect(() => {
    if (!loading) {
      setRecipeList([...data?.getCompareList]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const findCompareRecipe = (id: string) => {
    return compareRecipeList?.find((item) => item?._id === id);
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

  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, item);
    return destClone;
  };

  const addIngredient = (id: string, index: number) => {
    const findRecipe = findCompareRecipe(id);
    const findIngredient = findRecipe?.ingredients[index];
    const ingredientId = findIngredient?.ingredientId?._id;
    const selectedPortionName = findIngredient?.selectedPortion?.name;
    const selectedPortionGram = findIngredient?.selectedPortion?.gram;
    const ingredientName = findIngredient?.ingredientId?.ingredientName;
    const selectedPortionQuantity = findIngredient?.selectedPortion?.quantity;

    const item = findItem(ingredientId);

    if (!item) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [
          ...state?.ingredients,
          {
            ingredientId: ingredientId,
            selectedPortionName: selectedPortionName,
            weightInGram: selectedPortionGram,
            label: `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`,
          },
        ],
      }));
    } else {
      return;
    }
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        addIngredient(source?.droppableId, source?.index);
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewRecipe((state) => ({
          ...state,
          ingredients: [
            ...reorder(state?.ingredients, source.index, destination.index),
          ],
        }));
      } else {
        return;
      }
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
                <DragDropContext onDragEnd={onDragEnd}>
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
                              id={recipe?._id}
                              addItem={addIngredient}
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
