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
  slidesToShow: 4,
  slidesToScroll: 1,
  swipeToSlide: false,
  arrows: false,
  infinite: false,
  afterChange: (num) => console.log("afterChange", num),
  beforeChange: (num1, num2) => console.log("befourChange", num1, num2),

  responsive: [
    {
      breakpoint: 1500,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const CompareRecipe = () => {
  const router = useRouter();
  const [recipeList, setRecipeList] = useState(list);
  const [compareRecipeList, setcompareRecipeList] = useState(list.slice(0, 4));
  const sliderRef = useRef(null);

  useEffect(() => {
    console.log(sliderRef.current);
  }, [sliderRef]);

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

  return (
    <AContainer showLeftTray={false} logo={false} headerTitle="Compare Recipe">
      <div className={styles.mainContentDiv}>
        <div className={styles.CompareContainer}>
          <SubNav
            backAddress="/recipe_discovery"
            backIconText="Recipe Discovery"
            buttonText="Formulate"
            showButton={true}
            buttonClick={() => router.push("/recipe/formulate")}
            compareAmout={compareRecipeList.length}
            closeCompare={() => setcompareRecipeList([])}
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
                  conpareLength={compareRecipeList.length}
                />
              );
            })}
          </Carousel>
          <SliderArrows
            compareRecipeLength={compareRecipeList.length}
            prevFunc={() => sliderRef.current?.slickPrev()}
            nextFunc={() => sliderRef.current?.slickNext()}
          />

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
        </div>
      </div>
    </AContainer>
  );
};

export default CompareRecipe;
