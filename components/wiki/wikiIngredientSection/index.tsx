import React, { useState } from "react";
import FilterbottomComponent from "../../sidetray/filter/ingredients/Ingredients.component";
import { useQuery } from "@apollo/client";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFerrisWheel, faList } from "@fortawesome/pro-light-svg-icons";
import WikiThemeContainer from "../wikiTheme/wikiThemContainer";
import generateDummyArray from "../../../helperFunc/array/generateDummyArray";

interface Props {
  checkActive: (id: string) => boolean;
  handleItemClick: (item: any, isExist: any) => void;
  scrollAreaMaxHeight?: number;
}

const WikiIngredientSection = ({
  checkActive,
  handleItemClick,
  scrollAreaMaxHeight,
}: Props) => {
  const [toggle, setToggle] = useState(0);

  const { data: ingredientCategoryData, loading: ingredientCategoryLoading } =
    useQuery(FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS, {
      variables: {
        data: {
          ingredientCategory: "All",
          IngredientClass: 1,
        },
      },
    });

  return (
    <>
      <ToggleMenu
        setToggle={setToggle}
        toggle={toggle}
        toggleMenuList={[
          <div key={"key0"} className="d-flex ai-center">
            <FontAwesomeIcon icon={faList} style={{ marginRight: "5px" }} />
            <p>List</p>
          </div>,
          <div key={"key1"} className="d-flex ai-center">
            <FontAwesomeIcon
              icon={faFerrisWheel}
              style={{ marginRight: "5px" }}
            />
            <p>Themes</p>
          </div>,
        ]}
        variant={"outlineSecondary"}
      />
      {toggle === 0 && (
        <FilterbottomComponent
          checkActiveIngredient={checkActive}
          handleIngredientClick={handleItemClick}
          scrollAreaMaxHeight={scrollAreaMaxHeight}
          ingredientCategoryData={
            ingredientCategoryData?.filterIngredientByCategoryAndClass
          }
          ingredientCategoryLoading={ingredientCategoryLoading}
          toggleMenuType="borderBottomSecondary"
          showHeader={false}
        />
      )}
      {toggle === 1 && (
        <WikiThemeContainer
          data={generateDummyArray(10, {
            title: "Apple",
            image: "/images/img1.png",
          })}
          scrollAreaMaxHeight={scrollAreaMaxHeight + 170}
        />
      )}
    </>
  );
};

export default WikiIngredientSection;
