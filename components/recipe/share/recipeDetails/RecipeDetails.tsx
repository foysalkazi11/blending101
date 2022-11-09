import React, { useState, useEffect } from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import styles from "./RecipeDetails.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import uniqueId from "../../../utility/uniqueId";
import NutrationPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";
import useDraggableInPortal from "../../../../customHooks/useDraggableInPortal";
import SingleIngredient from "../singleIngredient/SingleIngredient";
import { IoClose } from "react-icons/io5";
import IconWraper from "../../../../theme/iconWarper/IconWarper";
import { useQuery } from "@apollo/client";
import GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS from "../../../../gqlLib/nutrition/query/getNutrientsListAndGiGlByIngredients";

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
  setOpenCollectionModal = () => {},
  setCopyImage = () => {},
  customMenu = null,
  showMoreMenuAtHover = false,
}: any) => {
  const [winReady, setwinReady] = useState(false);

  const { loading: nutritionDataLoading, data: nutritionData } = useQuery(
    GET_NUTRIENT_lIST_ADN_GI_GL_BY_INGREDIENTS,
    {
      variables: {
        ingredientsInfo: [
          ...recipe?.ingredients?.map((item) => ({
            ingredientId: item.ingredientId._id,
            value: item?.selectedPortion?.gram,
          })),
        ],
      },
    },
  );

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
          image={recipe.image[0]?.image || ""}
          recipeId={recipe?._id}
          notes={recipe?.notes}
          addedToCompare={recipe?.addedToCompare}
          compareRecipeList={compareRecipeList}
          setcompareRecipeList={setcompareRecipeList}
          isCollectionIds={recipe?.userCollections}
          setOpenCollectionModal={setOpenCollectionModal}
          isMatch={recipe?.isMatch}
          postfixTitle={recipe?.defaultVersion?.postfixTitle}
          showMoreMenu={showMoreMenu}
          showOptionalEditIcon={showOptionalEditIcon}
          isImageOverlay={dragAndDrop}
          imageOverlayFunc={(image) => setCopyImage(image)}
          customMenu={customMenu}
          showMoreMenuAtHover={showMoreMenuAtHover}
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
              nutritionDataLoading ? (
                <NutrationPanelSkeleton />
              ) : (
                <UpdatedRecursiveAccordian
                  dataObject={
                    nutritionData?.getNutrientsListAndGiGlByIngredients
                      ?.nutrients &&
                    JSON?.parse(
                      nutritionData?.getNutrientsListAndGiGlByIngredients
                        ?.nutrients,
                    )
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
