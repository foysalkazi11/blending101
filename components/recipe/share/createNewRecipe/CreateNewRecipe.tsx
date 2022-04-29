/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./CreateNewRecipe.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../../../../theme/recipe/recipeItem/RecipeItem.component";
import Accordion from "../../../../theme/accordion/accordion.component";
import ButtonComponent from "../../../../theme/button/button.component";
import SingleIngredient from "../singleIngredient/SingleIngredient";
import { useLazyQuery } from "@apollo/client";
import GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX from "../../../../gqlLib/recipes/queries/getBlendNutritionBasedOnRecipeXxx";
import NutrationPanelSkeleton from "../../../../theme/skeletons/nutrationPanelSkeleton/NutrationPanelSkeleton";
import UpdatedRecursiveAccordian from "../../../customRecursiveAccordian/updatedRecursiveAccordian.component";

const CreateNewRecipe = ({ newRecipe, setNewRecipe, deleteItem }: any) => {
  const [winReady, setWinReady] = useState(false);
  const [inputVlaue, setInputValue] = useState("");
  const [getBlendNutritionBasedOnRecipeXxx, { data, loading, error }] =
    useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX, {
      fetchPolicy: "network-only",
    });

  const removeIngredient = (id) => {
    setNewRecipe((state) => ({
      ...state,
      ingredients: [
        ...state?.ingredients?.filter((item) => item?.ingredientId !== id),
      ],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputVlaue) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [...state?.ingredients],
      }));
    }
    setInputValue("");
  };

  useEffect(() => {
    getBlendNutritionBasedOnRecipeXxx({
      variables: {
        ingredientsInfo: [
          ...newRecipe?.ingredients?.map((item) => ({
            ingredientId: item?.ingredientId,
            value: item?.weightInGram,
          })),
        ],
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newRecipe?.ingredients]);

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <div className={styles.createNewRecipeContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.firstContainer__firstSection}>
          <div className={styles.addRecipeTitle}>
            <input type="text" placeholder="Add Recipe Title" />
          </div>
          <div
            style={{
              display: "flex",
            }}
          >
            <div className={styles.fileUpload}>
              <input type="file" accept="image/*" />

              <img src="/images/black-add.svg" alt="addIcon" />
            </div>

            <div className={styles.dropDown}>
              <select id="cars" name="categories">
                <option value="smoothie">Smoothie</option>
                <option value="avocado">Avocado</option>
                <option value="creamy">Creamy</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.datacard__body__belt}>
          <div className={styles.datacard__body__belt__child}>
            Net Carbs <span>00</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Rx Score <span>00</span>
          </div>
          <div className={styles.datacard__body__belt__child}>
            Calorie <span>00</span>
          </div>
        </div>
      </div>
      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Ingredients"
          icon="/images/right-blender.svg"
        />

        <div className={styles.addRecipeIngredients}>
          <form onSubmit={handleSubmit}>
            <input
              value={inputVlaue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Enter, past, and or drag ingredients"
            />
          </form>

          <div className={styles.addRecipeIngredients__dargAndDrop}>
            {winReady ? (
              <Droppable droppableId="droppable">
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    style={{
                      backgroundColor: snapshot.isDraggingOver
                        ? "#f6f6f6"
                        : "#f6f6f6",
                      minHeight: "200px",
                      transition: "all .500s",
                      borderRadius: "5px",
                      padding: "10px 10px 10px 0",
                    }}
                    // isDraggingOver={snapshot.isDraggingOver}
                  >
                    {newRecipe?.ingredients?.map((item, index) => (
                      <Draggable
                        key={item?.ingredientId}
                        draggableId={`${item?.ingredientId}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            style={{ left: "0px", top: "0px" }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                          >
                            <SingleIngredient
                              label={item?.label}
                              showPlusIcon={false}
                              dargProps={provided.dragHandleProps}
                              showCloseIcon={true}
                              handleClose={() =>
                                removeIngredient(item?.ingredientId)
                              }
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ) : null}
          </div>
        </div>
      </div>

      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Nutrition"
          icon="/icons/chart-bar-light-green.svg"
        />
        <div className={styles.nutritionHeader}>
          <p>Amount Per Serving Calories</p>
          {/* <div className={styles.calories__heading}>
            <div>Calories</div>
            <div>00</div>
          </div> */}
        </div>

        <div className={styles.ingredientsDetails}>
          {loading ? (
            <NutrationPanelSkeleton />
          ) : data?.getBlendNutritionBasedOnRecipexxx ? (
            <UpdatedRecursiveAccordian
              dataObject={
                data?.getBlendNutritionBasedOnRecipexxx &&
                JSON?.parse(data?.getBlendNutritionBasedOnRecipexxx)
              }
              showUser={false}
              counter={1}
            />
          ) : null}
        </div>
      </div>
      {/* <div className={styles.saveButton}>
        <ButtonComponent
          type="primary"
          value="Save"
          style={{ height: "37px", width: "160px", fontSize: "12px" }}
        />
      </div> */}
    </div>

    // testing
  );
};

export default CreateNewRecipe;
