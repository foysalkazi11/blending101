import React, { useState } from "react";
import styles from "./InstructionForMakingRecipe.module.scss";
import Image from "next/image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DragIndicatorIcon from "../../../../public/icons/drag_indicator_black_36dp.svg";
import ModeEditOutlineOutlinedIcon from "../../../../public/icons/mode_edit_black_36dp.svg";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";

interface Props {
  recipeInstructions?: { [key: string]: any }[];
  setRecipeInstruction?: (arg: { [key: string]: any }[]) => void;
}

const InstructionsForMakingRecipe = ({
  recipeInstructions = [],
  setRecipeInstruction = () => {},
}: Props) => {
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const handleOnDragEnd = (result, type) => {
    if (!result) return;

    if (type === "steps") {
      const items = [...recipeInstructions];
      const [reOrderedItem] = items?.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reOrderedItem);
      setRecipeInstruction(items);
    }
  };

  const editStep = (id) => {
    document.getElementById("myTextField").focus();
    setSelectedElementId(id);
    let newEditStep = recipeInstructions.find((elem) => {
      return elem.id === id;
    });
    setInputValue(newEditStep.step);
  };

  const removeStep = (id) => {
    let updated_list = recipeInstructions?.filter((elem) => {
      return id !== elem.id;
    });
    setRecipeInstruction(updated_list);
  };

  const inputValueHandler = (e) => {
    let tempValue = e.target.value;
    setInputValue(tempValue);
  };

  const howToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }

      if (selectedElementId) {
        let elemIndex = recipeInstructions.findIndex(
          (elem) => elem.id === selectedElementId,
        );
        howList = [...recipeInstructions];
        howList[elemIndex] = { id: selectedElementId, step: inputValue };
      } else {
        howList = [
          ...recipeInstructions,
          {
            id: Date.now() + Math.floor(Math.random() * 1000),
            step: event.target.value,
          },
        ];
      }
      setRecipeInstruction(howList);
      setSelectedElementId(null);
      setInputValue("");
    }
  };

  return (
    <div className={styles.how__to}>
      <h4 className={styles.how__to__heading}>
        <div className={styles.how__to__icon}>
          <Image
            src={"/icons/chef.svg"}
            alt="Picture will load soon"
            objectFit="contain"
            layout="fill"
          />
        </div>
        <span className={styles.how__to__headingText}>How to</span>
      </h4>
      <div className={styles.how__to__steps}>
        <DragDropContext
          onDragEnd={(result) => {
            handleOnDragEnd(result, "steps");
          }}
        >
          <Droppable droppableId="draggableIngredientList">
            {(provided) => (
              <ol {...provided.droppableProps} ref={provided.innerRef}>
                {recipeInstructions ? (
                  recipeInstructions?.map((elem, index) => {
                    return (
                      <Draggable
                        key={elem.id}
                        draggableId={`${elem?.id}`}
                        index={elem?.id}
                      >
                        {(provided) => (
                          <li
                            className={styles.how__to__steps__li}
                            key={elem.id}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                          >
                            <div className={styles.how__to__steps__drag}>
                              <DragIndicatorIcon
                                className={styles.how__to__steps__drag}
                              />
                            </div>
                            {elem.step}
                            <span
                              className={styles.how__to__steps__li__edit}
                              onClick={() => editStep(elem.id)}
                            >
                              <ModeEditOutlineOutlinedIcon />
                            </span>
                            <span
                              className={styles.how__to__steps__li__bin}
                              onClick={() => removeStep(elem.id)}
                            >
                              <div
                                className={
                                  styles.how__to__steps__li__bin__imgDiv
                                }
                              >
                                <Image
                                  src={"/icons/noun_Delete_1447966.svg"}
                                  alt=""
                                  layout="fill"
                                  objectFit="contain"
                                />
                              </div>
                            </span>
                          </li>
                        )}
                      </Draggable>
                    );
                  })
                ) : (
                  <div style={{ margin: "30px 0px" }}>
                    <CircularRotatingLoader />
                  </div>
                )}
                <div style={{ listStyle: "none" }}>{provided.placeholder}</div>
              </ol>
            )}
          </Droppable>
        </DragDropContext>

        <div className={styles.how__to__searchBar}>
          <span>
            <input
              onKeyDown={howToSubmitHandler}
              value={inputValue}
              onChange={inputValueHandler}
              type="text"
              name="recipe elements"
              id="myTextField"
              placeholder="Type Your Instructions here..."
            />
          </span>
        </div>
      </div>
    </div>
  );
};

export default InstructionsForMakingRecipe;
