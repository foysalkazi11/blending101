import React from "react";
import MergedCompareFormulate from "../mergedCompareFormulate/mergedCompareFormulate.component";

const MergedFormulatePage = () => {
  return (
    <MergedCompareFormulate
      pageName="formulate"
      crossClickFunc={() => {}}
      backAddress={"/recipe/compare"}
      backIconText={"Recipe Compare"}
    >
      formulate
    </MergedCompareFormulate>
  );
};

export default MergedFormulatePage;
