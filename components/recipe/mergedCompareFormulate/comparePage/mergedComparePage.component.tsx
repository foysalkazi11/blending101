import React from "react";
import MergedCompareFormulate from "../mergedCompareFormulate/mergedCompareFormulate.component";
import { useRouter } from "next/router";
import SliderArrows from "../../share/sliderArrows/SliderArrows";

const MergedComparePage = () => {
  const router = useRouter();
  return (
    <MergedCompareFormulate
      pageName="compare"
      crossClickFunc={() => router.push("/recipe/formulate")}
      backAddress={"/recipe_discovery"}
      backIconText={"Recipe Discovery"}
    >
      compare
    </MergedCompareFormulate>
  );
};

export default MergedComparePage;
