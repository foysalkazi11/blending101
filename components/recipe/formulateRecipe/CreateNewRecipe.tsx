/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import styles from "./CreateNewRecipe.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import SectionTitleWithIcon from "../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../../../theme/recipe/recipeItem/RecipeItem.component";
import Accordion from "../../../theme/accordion/accordion.component";
import ButtonComponent from "../../../theme/button/button.component";

const CreateNewRecipe = ({ newRecipe, setNewRecipe, deleteItem }: any) => {
  const { id, name, image, ingredients, nutrition } = newRecipe;
  const [winReady, setWinReady] = useState(false);
  const [inputVlaue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputVlaue) {
      setNewRecipe((state) => ({
        ...state,
        ingredients: [
          /* @ts-ignore */
          ...state?.ingredients,
          { label: inputVlaue, id: Date.now() },
        ],
      }));
    }
  };

  useEffect(() => {
    setWinReady(true);
  }, []);

  return (
    <div className={styles.createNewRecipeContainer}>
      <div className={styles.firstContainer}>
        <div className={styles.firstContainer__firstSection}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <div className={styles.fileUpload}>
                <input type="file" accept="image/*" />

                <img src="/images/black-add.svg" alt="addIcon" />
              </div>
            </Grid>
            <Grid item xs={8} className={styles.addRecipeTitle}>
              <input type="text" placeholder="Add Recipe Title" />
            </Grid>
          </Grid>
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
                    // isDraggingOver={snapshot.isDraggingOver}
                  >
                    {ingredients?.map((item: any, index) => (
                      <Draggable
                        key={item?.id}
                        draggableId={`${item?.id}`}
                        index={index}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {/* @ts-ignore */}

                            <RecipeItem
                              item={item}
                              plusIcon={false}
                              deleteIcon={true}
                              handleDelete={deleteItem}
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
          <table>
            <tr>
              <th>Calories</th>
              <th>00</th>
              <th></th>
            </tr>
            <tr>
              <td></td>
              <td> Value </td>
              <td> Daily% </td>
            </tr>
          </table>
        </div>

        <div className={styles.ingredientsDetails}>
          {nutrition?.map((item, index) => {
            const { section, amount } = item;
            return (
              <Accordion key={index} title={section}>
                <table>
                  {amount?.map((items, index) => {
                    const { label, value, daily } = items;
                    return (
                      <tr key={index}>
                        <td>{label}</td>
                        <td> {value} </td>
                        <td> {daily} </td>
                      </tr>
                    );
                  })}
                </table>
              </Accordion>
            );
          })}
        </div>
      </div>
      <div className={styles.saveButton}>
        <ButtonComponent
          type="primary"
          value="Save"
          style={{ height: "37px", width: "160px", fontSize: "12px" }}
        />
      </div>
    </div>
  );
};

export default CreateNewRecipe;
