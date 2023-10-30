import React from "react";
import FilterBottomComponent from "../../sidetray/filter/ingredients/Ingredients.component";
import { useQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS_FOR_WIKI from "gqlLib/ingredient/query/filterIngredientByCategoryAndClassForWiki";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: boolean, extraInfo?: any) => void;
  scrollAreaMaxHeight?: number;
  toggle?: number;
}

const WikiIngredientSection = ({ checkActive, handleItemClick = () => {}, scrollAreaMaxHeight, toggle = 0 }: Props) => {
  const { data: ingredientCategoryDataForWiki, loading: ingredientCategoryLoadingForWiki } = useQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS_FOR_WIKI,
    {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 0,
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
        ingredientCategoryData={ingredientCategoryDataForWiki?.filterIngredientByCategoryAndClassForWiki}
        ingredientCategoryLoading={ingredientCategoryLoadingForWiki}
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
