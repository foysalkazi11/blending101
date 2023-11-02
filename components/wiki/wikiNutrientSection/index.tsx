import React from "react";
import WikiNutritionPanel from "../wikiNutritionPanel/WikiNutritionPanel";
import WikiThemeContainer from "../wikiTheme/wikiThemContainer";
import generateDummyArray from "../../../helperFunc/array/generateDummyArray";
import { WikiType } from "type/wikiListType";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: WikiType, isExist: boolean, extraInfo?: any) => void;
  scrollAreaMaxHeight?: number;
}

const WikiNutrientSection = ({ checkActive, handleItemClick = () => {}, scrollAreaMaxHeight }: Props) => {
  return (
    <>
      <WikiNutritionPanel
        checkActiveNutrition={checkActive}
        handleNutritionClick={handleItemClick}
        showHeader={false}
        scrollAreaMaxHeight={scrollAreaMaxHeight}
      />

      {/* <WikiThemeContainer
          data={generateDummyArray(10, {
            title: "Apple",
            image: "/images/img1.png",
          })}
          scrollAreaMaxHeight={scrollAreaMaxHeight + 110}
        /> */}
    </>
  );
};

export default WikiNutrientSection;
