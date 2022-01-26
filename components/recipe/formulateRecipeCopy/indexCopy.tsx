/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useRef, useEffect } from "react";
import Acontainer from "../../../containers/A.container";
import styles from "./formulateRecipe.module.scss";
import list from "../fackData/racipeList";
import Carousel from "../../../theme/carousel/carousel.component";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import RecipeDetails from "../share/recipeDetails/RecipeDetails";
import { DragDropContext } from "react-beautiful-dnd";
import CreateNewRecipe from "./CreateNewRecipe";

import SubNav from "../share/subNav/SubNav";
import SliderArrows from "../share/sliderArrows/SliderArrows";
import { current } from "@reduxjs/toolkit";

const responsiveSetting = {
  slidesToShow: 7,
  slidesToScroll: 1,

  responsive: [
    {
      breakpoint: 1450,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1250,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1050,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 650,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
};

const compareRecipeResponsiveSetting = {
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: false,
  arrows: false,
  infinite: false,
  responsive: [
    {
      breakpoint: 1600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const FormulateRecipe = () => {
  const [recipeList, setRecipeList] = useState(list);
  const [compareRecipeList, setcompareRecipeList] = useState(list);
  // const [compareRecipeList, setcompareRecipeList] = useState(list.slice(0, 4));
  const sliderRef = useRef(null);
  const [newRecipe, setNewRecipe] = useState<{}>({
    id: 456,
    name: "",
    image: "",
    ingredients: [
      {
        id: 1,
        label: "1 Frozen Banana",
      },
      {
        id: 2,
        label: "1/2 half ripe Avocado (or 1/4 large)",
      },
    ],
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

  const findCompareRecipe = (id) => {
    /* @ts-ignore */
    const item = compareRecipeList?.find((item) => item?.id === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };
  const handleCompare = (recipe) => {
    if (compareRecipeList?.length >= 4) {
      const findRecipe = findCompareRecipe(recipe?.id);
      if (!findRecipe) {
        let copyCompareRecipe = [...compareRecipeList];
        copyCompareRecipe.pop();
        copyCompareRecipe.unshift(recipe);
        setcompareRecipeList(copyCompareRecipe);
      } else {
        console.log("alredy exist");
      }
    } else {
      setcompareRecipeList((state) => [...state, recipe]);
    }
  };

  const removeCompareRecipe = (recipe) => {
    setcompareRecipeList((state) => [
      ...state.filter((item) => item?.id !== recipe?.id),
    ]);
  };
  const removeAllCompareRecipe = () => {
    setcompareRecipeList([]);
  };

  const findItem = (id) => {
    /* @ts-ignore */
    const item = newRecipe?.ingredients?.find((item) => item?.id === id);
    if (item) {
      return true;
    } else {
      return false;
    }
  };

  const addItem = (value: object) => {
    /* @ts-ignore */
    const item = findItem(value?.id);
    if (!item) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [
          /* @ts-ignore */
          ...state?.ingredients,
          value,
        ],
      }));
    }
  };

  const deleteItem = (id: number) => {
    setNewRecipe((state) => ({
      ...state,
      ingredients: [
        /* @ts-ignore */
        ...state?.ingredients?.filter((item) => item?.id !== Number(id)),
      ],
    }));
  };

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, item);
    return destClone;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== "droppable") {
      if (destination.droppableId === "droppable") {
        const id =
          recipeList[parseInt(source?.droppableId)]?.ingredients[source?.index]
            ?.id;
        const item = findItem(id);

        if (!item) {
          setNewRecipe((state) => ({
            ...state,
            ingredients: [
              ...copy(
                recipeList[parseInt(source?.droppableId)]?.ingredients,
                /* @ts-ignore */
                state?.ingredients,
                source,
                destination
              ),
            ],
          }));
        } else {
          return;
        }
      } else {
        return;
      }
    } else {
      if (source.droppableId === destination.droppableId) {
        setNewRecipe((state) => ({
          ...state,
          ingredients: [
            /* @ts-ignore */
            ...reorder(state?.ingredients, source.index, destination.index),
          ],
        }));
      } else {
        return;
      }
    }
  };

  const sliderRelativeDiv = useRef<any>();
  const sliderAbsoluteDiv = useRef<any>();
  const recipeDivRef = useRef<any>();
  const [clickState, setClickState] = useState(0);

  const handleClick = (sign) => {
    let card = document.querySelector<HTMLElement>(".recipe__drag__card");
    if (!card) return;
    const absElement = sliderAbsoluteDiv.current;
    const cardWid = card?.offsetWidth || 0;
    const left = parseFloat(absElement.style.left) || 0;
    const value = sign === "<" ? left + cardWid : left - cardWid;


    if (sign === "<") {
      if (left <= 0) return;
      absElement.style.left = value + "px";
      setClickState(clickState-1)
    } else {
      absElement.style.left = value + "px";
      setClickState(clickState+1)
    }
  };

  return (
    <Acontainer showLeftTray={false} logo={false} headerTitle="Formulate">
      <div className={styles.formulate}>
        <div className={styles.formulateContainer}>
          <div className={styles.formulateContainer__subNavDiv}>
            <SubNav
              backAddress="/recipe/compare"
              backIconText="Recipe Compare"
              buttonText="Formulate"
              showButton={false}
              compareAmout={compareRecipeList.length}
              closeCompare={removeAllCompareRecipe}
            />
            <Carousel moreSetting={responsiveSetting}>
              {recipeList?.map((recipe, index) => {
                return (
                  <SmallcardComponent
                    key={index}
                    imgHeight={undefined}
                    text={recipe?.name}
                    img={recipe?.image}
                    fnc={handleCompare}
                    recipe={recipe}
                    findCompareRecipe={findCompareRecipe}
                    fucUnCheck={removeCompareRecipe}
                    conpareLength={compareRecipeList?.length}
                  />
                );
              })}
            </Carousel>
            <SliderArrows
              compareRecipeLength={compareRecipeList.length}
              prevFunc={() => handleClick("<")}
              nextFunc={() => handleClick(">")}
              clickCount={clickState}
            />
          </div>
          <div className={styles.formulateContainer__formulateDiv}>
            <div className={styles.dragContainer}>
              <DragDropContext onDragEnd={onDragEnd}>
                <div className={styles.dragContainer__area}>
                  <CreateNewRecipe
                    newRecipe={newRecipe}
                    setNewRecipe={setNewRecipe}
                    deleteItem={deleteItem}
                  />
                </div>
                <div
                  className={styles.dragContainer__sliderDiv}
                  ref={sliderRelativeDiv}
                >
                  <div
                    className={styles.dragContainer__sliderDiv__cardDiv}
                    ref={sliderAbsoluteDiv}
                  >
                    {compareRecipeList?.map((recipe, index) => {
                      return (
                        <div
                          ref={recipeDivRef}
                          className={
                            styles.recipeDiv + " " + "recipe__drag__card"
                          }
                          key={index + "FormulateRecipeCard"}
                        >
                          <RecipeDetails
                            recipe={recipe}
                            id={index}
                            addItem={addItem}
                            removeCompareRecipe={removeCompareRecipe}
                            dragAndDrop={true}
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </DragDropContext>
            </div>
          </div>
        </div>
      </div>
    </Acontainer>
  );
};

export default FormulateRecipe;
