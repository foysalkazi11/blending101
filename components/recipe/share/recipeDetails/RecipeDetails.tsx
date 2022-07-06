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
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import useDraggableInPortal from "../../../../customHooks/useDraggableInPortal";
import { createPortal } from "react-dom";
import SingleIngredient from "../singleIngredient/SingleIngredient";
import { IoClose } from "react-icons/io5";
import IconWraper from "../../../../theme/iconWraper/IconWraper";

function Copyable(props) {
  const { items, addItem, droppableId } = props;
  const renderDraggable = useDraggableInPortal();

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items?.map((item, index) => {
            const ingredientName = item?.ingredientId?.ingredientName;
            const selectedPortionName = item?.selectedPortion?.name;
            const selectedPortionQuantity = item?.selectedPortion?.quantity;

            return (
              <Draggable
                draggableId={`${item?.ingredientId?._id}_${droppableId}`}
                index={index}
                key={`${item?.ingredientId?._id}`}
              >
                {renderDraggable((provided, snapshot) => (
                  <>
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                      <SingleIngredient
                        label={`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                        handleAdd={() => addItem(droppableId, index)}
                        dargProps={provided.dragHandleProps}
                      />
                    </div>

                    {snapshot.isDragging && (
                      <SingleIngredient
                        label={`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                        handleAdd={addItem}
                        dargProps={provided.dragHandleProps}
                      />
                    )}
                  </>
                ))}
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
  compareRecipeList = [],
  setcompareRecipeList = () => {},
  showMoreMenu = true,
  showOptionalEditIcon = false,
}: any) => {
  const [winReady, setwinReady] = useState(false);
  const [getBlendNutritionBasedonRecipeData, { loading, error, data }] =
    useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_DATA, {
      // fetchPolicy: "network-only",
    });

  const makeIngredients = (ing) => {
    let arr = [];
    ing?.forEach((ing) => {
      const ingredient = ing?.ingredientId?.ingredientName;
      arr?.push(ingredient);
    });
    return arr?.join(", ");
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
    <div className={styles.recipeDetailsFirstContainer}>
      <div className={styles.recipeDetailsContainer}>
        <div className={styles.cancleIcon}>
          <IconWraper
            defaultBg="gray"
            handleClick={(e) => removeCompareRecipe(recipe?._id, e)}
          >
            <IoClose />
          </IconWraper>
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
          compareRecipeList={compareRecipeList}
          setcompareRecipeList={setcompareRecipeList}
          isMatch={recipe?.isMatch}
          postfixTitle={recipe?.defaultVersion?.postfixTitle}
          showMoreMenu={showMoreMenu}
          showOptionalEditIcon={showOptionalEditIcon}
        />
        <div className={`${styles.dividerBox}`}>
          <SectionTitleWithIcon
            title="Ingredients"
            icon="/images/right-blender.svg"
          />
          <div className={`${styles.ingredientBox} y-scroll`}>
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
                  <p key={index} className={`${styles.singleIngredient}`}>
                    {`${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`}
                  </p>
                );
              })
            )}
          </div>
        </div>

        <div className={styles.dividerBox}>
          <SectionTitleWithIcon
            title="Nutrition"
            icon="/icons/chart-bar-light-green.svg"
          />

          <div className={`${styles.ingredientsDetails} `}>
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
    </div>
  );
};

export default RecipeDetails;
