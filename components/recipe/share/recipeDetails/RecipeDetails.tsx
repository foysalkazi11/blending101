import React, { useState, useEffect } from "react";
import DatacardComponent from "../../../../theme/cards/dataCard/dataCard.component";
import SectionTitleWithIcon from "../../../../theme/recipe/sectionTitleWithIcon/SectionTitleWithIcon.component";
import RecipeItem from "../../../../theme/recipe/recipeItem/RecipeItem.component";
import styles from "./RecipeDetails.module.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Accordion from "../../../../theme/accordion/accordion.component";
import CancelIcon from "../../../../public/icons/cancel_black_36dp.svg";
import uniqueId from "../../../utility/uniqueId";

function Copyable(props) {
  const { items, addItem, droppableId } = props;

  // logic for removing elements having duplicate label values =>start
  let newList = Array.from(
    new Set(
      items.map((elem, index) => {
        return elem.label;
      })
    )
  );
  let processedList = [];
  items.map((item, index) => {
    if (newList.includes(item.label)) {
      let itemIndex = newList.indexOf(item.label);
      newList.splice(itemIndex, 1);
      processedList = [...processedList, item];
    }
  });
  // logic for removing elements having duplicate label values =>end

  return (
    <Droppable droppableId={droppableId} isDropDisabled={true}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {processedList.map((item, index) => {
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
  const { name, image, ingredients, nutrition } = recipe;

  useEffect(() => {
    setwinReady(true);
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
        title={name}
        ingredients={""}
        category={""}
        ratings={4.9}
        noOfRatings={0}
        carbs={0}
        score={0}
        calorie={0}
        noOfComments={0}
        image={image}
      />
      <div className={styles.dividerBox}>
        <SectionTitleWithIcon
          title="Ingredients"
          icon="/images/right-blender.svg"
        />

        {dragAndDrop ? (
          winReady ? (
            <Copyable
              items={ingredients}
              addItem={addItem}
              droppableId={`${id}`}
            />
          ) : null
        ) : (
          ingredients?.map((item, index) => {
            return (
              <p
                key={index}
                style={{
                  fontSize: "14px",
                  color: "#ababab",
                  marginBottom: "15px",
                }}
              >
                {item?.label}
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

          <div className={styles.table_row}>
            <div>Calories</div>
            <div>93</div>
          </div>
          <table></table>
        </div>

        <div className={styles.ingredientsDetails}>
          {nutrition?.map((item, index) => {
            const { section, amount } = item;
            return (
              <Accordion key={index} title={section}>
                <table>
                  <tr className={styles.table_row_calorie}>
                    <td></td>
                    <td> VALUE </td>
                    <td> DAILY% </td>
                  </tr>
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
    </div>
  );
};

export default RecipeDetails;
