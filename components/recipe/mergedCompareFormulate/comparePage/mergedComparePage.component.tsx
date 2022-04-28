import React, { useEffect, useRef, useState } from "react";
import MergedCompareFormulate from "../mergedCompareFormulate/mergedCompareFormulate.component";
import { useRouter } from "next/router";
import SliderArrows from "../../share/sliderArrows/SliderArrows";
import { useAppSelector } from "../../../../redux/hooks";
import { useQuery } from "@apollo/client";
import GET_COMPARE_LIST from "../../../../gqlLib/compare/query/getCompareList";
import useLocalStorage from "../../../../customHooks/useLocalStorage";
import notification from "../../../utility/reactToastifyNotification";
import Slider from "react-slick";
import RecipeDetails from "../../share/recipeDetails/RecipeDetails";

const MergedComparePage = () => {
  // const { dbUser } = useAppSelector((state) => state?.user);
  // const { data, loading, error } = useQuery(GET_COMPARE_LIST, {
  //   variables: { userId: dbUser?._id },
  //   fetchPolicy: "network-only",
  // });
  // const [recipeList, setRecipeList] = useState([]);
  // const [compareRecipeList, setcompareRecipeList] = useLocalStorage(
  //   "compareList",
  //   []
  // );
  // const router = useRouter();

  // useEffect(() => {
  //   if (!loading) {
  //     setRecipeList([...data?.getCompareList]);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [data]);
  // console.log({ data });
  // console.log({ recipeList });

  const sliderRef = useRef(null);
  const router = useRouter();
  const [recipeList, setRecipeList] = useState([]);
  const [compareRecipeList, setcompareRecipeList] = useLocalStorage(
    "compareList",
    []
  );
  const { dbUser } = useAppSelector((state) => state?.user);
  const { data, loading, error } = useQuery(GET_COMPARE_LIST, {
    variables: { userId: dbUser?._id },
    fetchPolicy: "network-only",
  });

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
    console.log({ recipe });
    setcompareRecipeList((state) => [
      ...state.filter((item) => item?._id !== recipe?._id),
    ]);
  };

  return (
    <MergedCompareFormulate
      pageName="compare"
      crossClickFunc={() => router.push("/recipe/formulate")}
      backAddress={"/recipe_discovery"}
      backIconText={"Recipe Discovery"}
      apiRecipeList={recipeList}
      responsiveSetting={responsiveSetting}
      handleCompare={handleCompare}
      findCompareRecipe={findCompareRecipe}
      removeCompareRecipe={removeCompareRecipe}
      compareRecipeList={compareRecipeList}
    >
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
    </MergedCompareFormulate>
  );
};

export default MergedComparePage;
