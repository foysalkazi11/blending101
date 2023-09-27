import React from "react";
import FilterBottomComponent from "../../sidetray/filter/ingredients/Ingredients.component";
import { useQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import WikiThemeContainer from "../wikiTheme/wikiThemContainer";
import generateDummyArray from "../../../helperFunc/array/generateDummyArray";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: boolean, extraInfo?: any) => void;
  scrollAreaMaxHeight?: number;
  toggle?: number;
}

const WikiIngredientSection = ({ checkActive, handleItemClick = () => {}, scrollAreaMaxHeight, toggle = 0 }: Props) => {
  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } = useQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS,
    {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    },
  );

  return (
    <>
      <FilterBottomComponent
        checkActiveIngredient={checkActive}
        handleIngredientClick={handleItemClick}
        scrollAreaMaxHeight={scrollAreaMaxHeight}
        ingredientCategoryData={ingredientCategoryData?.filterIngredientByCategoryAndClass}
        ingredientCategoryLoading={ingredientCategoryLoading}
        toggleMenuType="borderBottomSecondary"
        showHeader={false}
      />

      {/* {toggle === 1 && (
        <WikiThemeContainer
          data={generateDummyArray(10, {
            title: "Apple",
            image: "/images/img1.png",
          })}
          scrollAreaMaxHeight={scrollAreaMaxHeight + 170}
        />
      )} */}
    </>
  );
};

export default WikiIngredientSection;
