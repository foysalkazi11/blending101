import React, { useState, useEffect } from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../../../../theme/recipe/recipeItem/RecipeItem.component";
import styles from "./RecipeDetails.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import CancelIcon from "../../../../public/icons/cancel_black_36dp.svg";
import uniqueId from "../../../utility/uniqueId";
import { useLazyQuery } from "@apollo/client";
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_DATA from "../../../../gqlLib/compare/query/getBlendNutritionBasedOnRecipeData";
import NutrationPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";

function Copyable(props) {
  const { items, addItem, droppableId } = props;

  // logic for removing elements having duplicate label values =>start
  // let newList = Array.from(
  //   new Set(
  //     items.map((elem, index) => {
  //       return elem.label;
  //     })
  //   )
  // );
  // let processedList = [];
  // items.map((item, index) => {
  //   if (newList.includes(item.label)) {
  //     let itemIndex = newList.indexOf(item.label);
  //     newList.splice(itemIndex, 1);
  //     processedList = [...processedList, item];
  //   }
  // });
  // logic for removing elements having duplicate label values =>end

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items?.map((item, index) => {
            return (
              <Draggable draggableId={`${item.id}`} index={index} key={item.id}>
                {(provided, snapshot) => (
                  <>
                    <div
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                    >
                      <RecipeItem item={item} handleClick={addItem} />
                    </div>
                    {snapshot.isDragging && (
                      <RecipeItem item={item} handleClick={addItem} />
                    )}
                  </>
                )}
              </Draggable>
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

const RecipeDetails = ({
  recipe = {},
  id = uniqueId(),
  addItem = () => {},
  removeCompareRecipe = () => {},
  dragAndDrop = false,
}: any) => {
  const [winReady, setwinReady] = useState(false);
  const [getBlendNutritionBasedonRecipeData, { loading, error, data }] =
    useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_DATA, {
      fetchPolicy: "network-only",
    });
  console.log(data);

  const makeIngredients = (ing) => {
    let arr = [];
    ing?.forEach((ing) => {
      const ingredient = ing?.ingredientId?.ingredientName;
      arr?.push(ingredient);
    });
    return arr?.join(" ");
  };

  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    if (recipe?._id) {
      getBlendNutritionBasedonRecipeData({
        variables: { recipeId: recipe?._id },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.recipeDetailsContainer}>
      <div
        className={styles.cancleIcon}
        onClick={() => removeCompareRecipe(recipe)}
      >
        <CancelIcon />
      </div>
      <DatacardComponent
        title={recipe?.name}
        ingredients={makeIngredients(recipe?.ingredients)}
        category={recipe?.recipeBlendCategory?.name}
        ratings={recipe?.averageRating}
        noOfRatings={recipe?.numberOfRating}
        carbs={recipe?.carbs}
        score={recipe?.score}
        calorie={recipe?.calorie}
        noOfComments={recipe?.numberOfRating}
        image={recipe.image[0]?.image}
        recipeId={recipe?._id}
        notes={recipe?.notes}
        addedToCompare={recipe?.addedToCompare}
      />
      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Ingredients"
          icon="/images/right-blender.svg"
        />

        {dragAndDrop ? (
          winReady ? (
            <Copyable
              items={recipe?.ingredients}
              addItem={addItem}
              droppableId={`${id}`}
            />
          ) : null
        ) : (
          recipe?.ingredients?.map((item, index) => {
            const ingredientName = item?.ingredientId?.ingredientName;
            const selectedPortionName = item?.selectedPortion?.name;
            const selectedPortionQuantity = item?.selectedPortion?.quantity;
            return (
              <p key={index} className={styles.singleIngredient}>
                {`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
              </p>
            );
          })
        )}
      </div>

      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Nutrition"
          icon="/icons/chart-bar-light-green.svg"
        />
        <div className={styles.nutritionHeader}>
          <p>Amount Per Serving Calories</p>

          {/* <div className={styles.table_row}>
            <div>Calories</div>
            <div>93</div>
          </div>
          <table></table> */}
        </div>

        <div className={styles.ingredientsDetails}>
          {winReady ? (
            loading ? (
              <NutrationPanelSkeleton />
            ) : (
              <UpdatedRecursiveAccordian
                dataObject={
                  data?.getBlendNutritionBasedOnRecipeData &&
                  JSON?.parse(data?.getBlendNutritionBasedOnRecipeData)
                }
                showUser={false}
                counter={1}
              />
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default RecipeDetails;
