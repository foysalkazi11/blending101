import React, { ReactNode, useRef, useState } from "react";
import styles from "./mergedCompareFormulate.module.scss";
import AContainer from "../../../../containers/A.container";
import SubNav from "../../share/subNav/SubNav";
import { useRouter } from "next/router";
import list from "../../fackData/racipeList";
import Carousel from "../../../../theme/carousel/carousel.component";
import SmallcardComponent from "../../../../theme/cards/smallCard/SmallCard.component";
import SliderArrows from "../../share/sliderArrows/SliderArrows";

interface MergedCompareFormulateInterface {
  pageName: "formulate" | "compare";
  children?: ReactNode;
  backAddress?:string;
  backIconText?:string;
  crossClickFunc?: () => void;
}
const MergedCompareFormulate = ({
  pageName,
  children,
  backAddress,
  backIconText,
  crossClickFunc
}: MergedCompareFormulateInterface) => {
  pageName = pageName || "compare";

  const router = useRouter();
  const sliderRef = useRef(null);
  const [recipeList, setRecipeList] = useState(list);
  const [compareRecipeList, setcompareRecipeList] = useState(list.slice(0, 4));
  const responsiveSetting = {
    slidesToShow: 7,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1550,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1150,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
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
  const findCompareRecipe = (id) => {
    const item = compareRecipeList?.find((item) => item?.id === id);
    if (item) {
      return true;
    } else {
      return false;
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
        <SubNav
          backAddress={backAddress}
          backIconText={backIconText}
          buttonText="Formulate"
          showButton={pageName === "compare" ? true : false}
          buttonClick={() => router.push("/recipe/formulate")}
          compareAmout={compareRecipeList.length}
          closeCompare={ crossClickFunc}
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
        {children}
      </div>
    </AContainer>
  );
};

export default MergedCompareFormulate;
