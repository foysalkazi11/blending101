import React, { useState, useRef, useEffect } from "react";
import Acontainer from "../../../containers/A.container";
import { Container, Grid } from "@mui/material";
import styles from "./formulateRecipe.module.scss";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import list from "../fackData/racipeList";
import Carousel from "../../../theme/carousel/carousel.component";
import SmallcardComponent from "../../../theme/cards/smallCard/SmallCard.component";
import RecipeDetails from "../share/RecipeDetails";
import { DragDropContext } from "react-beautiful-dnd";
import CreateNewRecipe from "./CreateNewRecipe";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Slider from "react-slick";

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
      breakpoint: 1100,
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
  const [compareRecipeList, setcompareRecipeList] = useState(list.slice(0, 4));
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

  useEffect(() => {
    console.log(sliderRef.current);
  }, []);

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

  const copy = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const item = sourceClone[droppableSource.index];
    destClone.splice(droppableDestination.index, 0, item);
    return destClone;
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
    console.log(id);

    setNewRecipe((state) => ({
      ...state,
      ingredients: [
        /* @ts-ignore */
        ...state?.ingredients?.filter((item) => item?.id !== Number(id)),
      ],
    }));
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

  return (
    <Acontainer showLeftTray={false} logo={false} headerTitle="Formulate">
      <Container maxWidth="xl">
        {/* sub-nav */}
        <div className={styles.formulateContainer}>
          <div className={styles.formulateContainer__subNav}>
            <div className={styles.formulateContainer__subNav__discover}>
              <ArrowBackIcon
                className={styles.formulateContainer__subNav__discover__icon}
              />
              <p>Recipe Discovery</p>
            </div>

            <div className={styles.formulateContainer__subNav__compare}>
              <p> 6 compare</p>
              <HighlightOffIcon
                className={styles.formulateContainer__subNav__compare__icon}
              />
            </div>
          </div>

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
                />
              );
            })}
          </Carousel>
          <Grid container spacing={2}>
            <div className={styles.customeArrowContainer}>
              <div></div>

              <div className={styles.customeArrowContainer__arrows}>
                <div
                  className={styles.customeArrowContainer__arrows__prev}
                  onClick={() => sliderRef.current.slickPrev()}
                >
                  <ChevronLeftIcon />
                </div>

                <div
                  className={styles.customeArrowContainer__arrows__prev}
                  onClick={() => sliderRef.current.slickNext()}
                >
                  <ChevronRightIcon />
                </div>
              </div>
            </div>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid item xs={12} sm={6} md={4} xl={3}>
                <CreateNewRecipe
                  newRecipe={newRecipe}
                  setNewRecipe={setNewRecipe}
                  deleteItem={deleteItem}
                />
              </Grid>

              <Grid item xs={12} sm={6} md={8} xl={9}>
                <Slider {...compareRecipeResponsiveSetting} ref={sliderRef}>
                  {compareRecipeList?.map((recipe, index) => {
                    return (
                      <RecipeDetails
                        key={index}
                        recipe={recipe}
                        id={index}
                        addItem={addItem}
                        removeCompareRecipe={removeCompareRecipe}
                      />
                    );
                  })}
                </Slider>
              </Grid>
            </DragDropContext>
          </Grid>
        </div>
      </Container>
    </Acontainer>
  );
};

export default FormulateRecipe;
