import React, { useState, useEffect } from "react";
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
import { CompareRecipeType } from "../../../../type/compareRecipeType";
import joniIngredients from "../../../../helperFunc/joinIngredients";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import { ReferenceOfRecipeUpdateFuncType } from "../../../../type/recipeType";
import { VersionDataType } from "../../../../type/recipeDetailsType";
import { AccessPermission } from "../../../../type/recipeCardType";
import useGetBlendNutritionBasedOnRecipexxx from "../../../../customHooks/useGetBlendNutritionBasedOnRecipexxx";

function Copyable(props) {
  const { items, addItem, droppableId } = props;
  const renderDraggable = useDraggableInPortal();

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {items?.map((item, index) => {
            const isIngredientStatusOk = item?.ingredientStatus === "ok";
            const ingredientName = item?.ingredientId?.ingredientName;
            const selectedPortionName = item?.selectedPortion?.name;
            const selectedPortionQuantity = item?.selectedPortion?.quantity;
            let label = "";
            if (isIngredientStatusOk) {
              label = `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
            } else {
              label = item?.errorString;
            }

            return (
              <Draggable
                draggableId={`${
                  item?.ingredientId?._id || item?.qaId
                }_${droppableId}`}
                index={index}
                key={`${item?.ingredientId?._id || item?.qaId}`}
              >
                {renderDraggable((provided, snapshot) => (
                  <>
                    <div {...provided.draggableProps} ref={provided.innerRef}>
                      <SingleIngredient
                        label={label}
                        handleAdd={() => addItem(droppableId, index)}
                        dargProps={provided.dragHandleProps}
                        isErrorIngredient={!isIngredientStatusOk}
                      />
                    </div>

                    {snapshot.isDragging && (
                      <SingleIngredient
                        label={label}
                        handleAdd={() => addItem(droppableId, index)}
                        dargProps={provided.dragHandleProps}
                        isErrorIngredient={!isIngredientStatusOk}
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

interface RecipeDetailsProps {
  recipe: CompareRecipeType;
  id?: string;
  addItem?: (id: string, index: number) => void;
  removeCompareRecipe: (id: string, e: React.SyntheticEvent) => void;
  dragAndDrop?: boolean;
  compareRecipeList: CompareRecipeType[];
  setcompareRecipeList: React.Dispatch<
    React.SetStateAction<CompareRecipeType[]>
  >;
  showMoreMenu?: boolean;
  showOptionalEditIcon?: boolean;
  setOpenCollectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setCopyImage?: React.Dispatch<React.SetStateAction<string>>;
  customMenu?: any;
  showMoreMenuAtHover?: boolean;
  updateCompareList: ReferenceOfRecipeUpdateFuncType;
  handleToOpenVersionTray?: (
    recipeId: string,
    version?: VersionDataType,
  ) => void;
  updateDataAfterChangeDefaultVersion?: (versionId: string) => void;
  showTopCancelButton?: boolean;
  viewPermissions?: AccessPermission[];
  interactionPermissions?: AccessPermission[];
}

const RecipeDetails = ({
  recipe = {} as CompareRecipeType,
  id = uniqueId(),
  addItem = () => {},
  removeCompareRecipe,
  dragAndDrop = false,
  compareRecipeList = [],
  setcompareRecipeList = () => {},
  showMoreMenu = true,
  showOptionalEditIcon = false,
  setOpenCollectionModal = () => {},
  setCopyImage = () => {},
  customMenu = null,
  showMoreMenuAtHover = false,
  updateCompareList = () => {},
  handleToOpenVersionTray,
  updateDataAfterChangeDefaultVersion = () => {},
  showTopCancelButton = true,
  viewPermissions = [
    "title",
    "moreMenu",
    "brand",
    "version",
    "compare",
    "collection",
    "comments&Notes",
  ],
  interactionPermissions = ["all"],
}: RecipeDetailsProps) => {
  const [winReady, setwinReady] = useState(false);
  if (recipe?.isTemp) {
    viewPermissions = ["collection"];
    interactionPermissions = ["brand", "collection"];
  }
  const {
    handleFetchIngrdients,
    loading: nutritionDataLoading,
    data: nutritionData,
  } = useGetBlendNutritionBasedOnRecipexxx();

  useEffect(() => {
    setwinReady(true);
  }, []);

  useEffect(() => {
    handleFetchIngrdients(
      recipe?.defaultVersion?.ingredients?.filter(
        (ing) => ing?.ingredientStatus === "ok",
      ),
      {},
      () => {},
      true,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipe?.defaultVersion?.ingredients]);

  return (
    <div className={styles.recipeDetailsFirstContainer}>
      <div className={styles.recipeDetailsContainer}>
        {showTopCancelButton && (
          <div className={styles.cancleIcon}>
            <IconWraper
              defaultBg="gray"
              handleClick={(e) => removeCompareRecipe(recipe?.recipeId?._id, e)}
            >
              <IoClose />
            </IconWraper>
          </div>
        )}

        <DatacardComponent
          title={recipe?.recipeId?.name}
          ingredients={joniIngredients(recipe?.defaultVersion?.ingredients)}
          category={recipe?.recipeId?.recipeBlendCategory?.name}
          ratings={recipe?.recipeId?.averageRating}
          noOfRatings={recipe?.recipeId?.numberOfRating}
          noOfComments={recipe?.recipeId?.numberOfRating}
          image={
            recipe?.defaultVersion?.selectedImage ||
            recipe?.recipeId?.image?.find((img) => img?.default)?.image ||
            recipe?.recipeId?.image?.[0]?.image ||
            ""
          }
          recipeId={recipe?.recipeId?._id}
          notes={recipe?.notes}
          addedToCompare={recipe?.addedToCompare}
          isCollectionIds={recipe?.userCollections}
          setOpenCollectionModal={setOpenCollectionModal}
          isMatch={recipe?.isMatch}
          postfixTitle={recipe?.defaultVersion?.postfixTitle}
          showMoreMenu={showMoreMenu}
          showOptionalEditIcon={showOptionalEditIcon}
          isImageOverlay={dragAndDrop}
          imageOverlayFunc={setCopyImage}
          customMenu={customMenu}
          showMoreMenuAtHover={showMoreMenuAtHover}
          description={recipe?.defaultVersion?.description}
          recipeVersion={recipe?.versionCount > 1 ? recipe?.versionCount : 0}
          defaultVersionId={recipe?.defaultVersion?._id}
          updateDataFunc={updateCompareList}
          userId={recipe?.recipeId?.userId}
          versionHandler={handleToOpenVersionTray}
          updateDataAfterChangeDefaultVersion={
            updateDataAfterChangeDefaultVersion
          }
          isVersionSharable={recipe?.defaultVersion?.isVersionSharable}
          defaultVersion={recipe?.defaultVersion}
          brand={recipe?.recipeId?.brand}
          calorie={recipe?.defaultVersion?.calorie?.value}
          carbs={recipe?.defaultVersion?.gigl?.netCarbs}
          personalRating={recipe?.personalRating}
          viewPermissions={viewPermissions}
          interactionPermissions={interactionPermissions}
          origin={recipe?.recipeId?.url}
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
                  items={recipe?.defaultVersion?.ingredients}
                  addItem={addItem}
                  droppableId={`${id}`}
                />
              ) : null
            ) : (
              recipe?.defaultVersion?.ingredients?.map((item, index) => {
                const isIngredientStatusOk = item?.ingredientStatus === "ok";

                const ingredientName = item?.ingredientId?.ingredientName;
                const selectedPortionName = item?.selectedPortion?.name;
                const selectedPortionQuantity = item?.selectedPortion?.quantity;
                let label = "";
                if (isIngredientStatusOk) {
                  label = `${selectedPortionQuantity} ${selectedPortionName} ${ingredientName}`;
                } else {
                  label = item?.errorString;
                }

                return (
                  <p
                    key={index}
                    className={`${styles.singleIngredient} ${
                      !isIngredientStatusOk && styles.errorIngredientText
                    }`}
                  >
                    {label}
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
