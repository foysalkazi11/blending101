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
  // afterChange: (num) => console.log("afterChange", num),
  // beforeChange: (num1, num2) => console.log("befourChange", num1, num2),

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
                buttonText="Formulate"
                showButton={true}
                buttonClick={() => router.push("/recipe/formulate")}
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
            </>
          )}
        </div>
      </div>
    </AContainer>
  );
};

export default CompareRecipe;
