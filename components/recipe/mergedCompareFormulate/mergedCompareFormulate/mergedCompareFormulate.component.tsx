import React, { ReactNode, useRef, useState } from "react";
import styles from "./mergedCompareFormulate.module.scss";
import AContainer from "../../../../containers/A.container";
import SubNav from "../../share/subNav/SubNav";
import { useRouter } from "next/router";
import list from "../../fackData/racipeList";
import Carousel from "../../../../theme/carousel/carousel.component";
import SmallcardComponent from "../../../../theme/cards/smallCard/SmallCard.component";
import SliderArrows from "../../share/sliderArrows/SliderArrows";
import SkeletonComparePage from "../../../../theme/skeletons/skeletonComparePage/SkeletonComparePage";

interface MergedCompareFormulateInterface {
  pageName: "formulate" | "compare";
  children?: ReactNode;
  backAddress?: string;
  backIconText?: string;
  apiRecipeList?: object[];
  responsiveSetting?: object;
  compareRecipeList?: object[];
  crossClickFunc?: () => void;
  handleCompare?: any;
  findCompareRecipe?: any;
  removeCompareRecipe?: any;
}
const MergedCompareFormulate = ({
  pageName,
  children,
  backAddress,
  backIconText,
  apiRecipeList,
  compareRecipeList,
  responsiveSetting,
  crossClickFunc,
  handleCompare,
  findCompareRecipe,
  removeCompareRecipe,
}: MergedCompareFormulateInterface) => {
  pageName = pageName || "compare";
  const router = useRouter();
  return (
    <AContainer showLeftTray={false} logo={false} headerTitle="Compare Recipe">
      <div className={styles.mainContentDiv}>
        {apiRecipeList ? (
          <>
            <SubNav
              backAddress={backAddress}
              backIconText={backIconText}
              buttonText="Formulate"
              showButton={pageName === "compare" ? true : false}
              buttonClick={() => router.push("/recipe/formulate")}
              compareAmout={compareRecipeList.length}
              closeCompare={crossClickFunc}
            />

            <Carousel moreSetting={responsiveSetting}>
              {apiRecipeList?.map((recipe, index) => {
                return (
                  <SmallcardComponent
                    key={index}
                    imgHeight={undefined}
                    //@ts-ignore
                    text={recipe?.name}
                    //@ts-ignore
                    img={recipe?.image[0]?.image}
                    fnc={handleCompare}
                    recipe={recipe}
                    findCompareRecipe={findCompareRecipe}
                    fucUnCheck={removeCompareRecipe}
                    conpareLength={compareRecipeList?.length}
                  />
                );
              })}
            </Carousel>
            {children}
          </>
        ) : (
          <SkeletonComparePage />
        )}
      </div>
    </AContainer>
  );
};

export default MergedCompareFormulate;
