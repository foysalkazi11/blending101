/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "../../../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../../../public/icons/remove_black_36dp.svg";
import ButtonComponent from "../../../../../theme/button/buttonA/button.component";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import ModeEditOutlineOutlinedIcon from "../../../../../public/icons/mode_edit_black_36dp.svg";
import {
  setRecipeInstruction,
  setSelectedIngredientsList,
  setServingCounter,
} from "../../../../../redux/edit_recipe/editRecipeStates";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

type IngredientListPorps = {
  recipeInstructions?: string[];
};

const IngredientList = ({ recipeInstructions }: IngredientListPorps) => {
  const [selectedElementId, setSelectedElementId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [isFetching, setIsFetching] = useState(null);

  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList
  );
  const removeIngredient = (id) => {
    let updated_list = selectedIngredientsList?.filter((elem) => {
      return id !== elem._id;
    });
    dispatch(setSelectedIngredientsList(updated_list));
  };
  const howToState = useAppSelector((state) => state.editRecipeReducer.recipeInstruction);
  const servingCounter = useAppSelector(
    (state) => state.editRecipeReducer.servingCounter
  );

  const adjusterFunc = (task) => {
    task === "+" && dispatch(setServingCounter(servingCounter + 1));
    task === "-" && servingCounter > 1 && dispatch(setServingCounter(servingCounter - 1));
  };

  useEffect(() => {
    let howList = [];
    recipeInstructions?.forEach((elem, index) => {
      console.log(elem);
      howList = [...howList, { id: Date.now() + index + elem, step: elem }];
    });
    dispatch(setRecipeInstruction(howList));
  }, [recipeInstructions]);

  const HowToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }

      if (selectedElementId) {
        let elemIndex = howToState.findIndex((elem) => elem.id === selectedElementId);
        howList = [...howToState];
        howList[elemIndex] = { id: selectedElementId, step: inputValue };
      } else {
        howList = [
          ...howToState,
          {
            id: Date.now() + Math.floor(Math.random() * 100),
            step: event.target.value,
          },
        ];
      }
      dispatch(setRecipeInstruction(howList));
      setSelectedElementId(null);
      setInputValue("");
    }
  };

  const editStep = (id) => {
    document.getElementById("myTextField").focus();
    setSelectedElementId(id);
    let newEditStep = howToState.find((elem) => {
      return elem.id === id;
    });
    setInputValue(newEditStep.step);
  };

  const removeStep = (id) => {
    let updated_list = howToState?.filter((elem) => {
      return id !== elem.id;
    });
    dispatch(setRecipeInstruction(updated_list));
  };

  const inputTagValueHandler = (e) => {
    let tempValue = e.target.value;
    setInputValue(tempValue);
  };

  const handleOnDragEnd = (result) => {
    if (!result) return;
    const items = [...selectedIngredientsList];
    const [reOrderedItem] = items?.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);
    dispatch(setSelectedIngredientsList(items));
  };
  return (
    <div className={styles.mainCard}>
      <div className={styles.ingredients__main__card}>
        <div className={styles.headingDiv}>
          <div className={styles.basket__icon}>
            <Image
              src={"/icons/basket.svg"}
              alt="icon"
              width={"17px"}
              height={"15px"}
              className={styles.original_arrow}
            />
          </div>
          <h5>Ingredients</h5>
        </div>
        <div className={styles.blending__ingredients}>
          <div className={styles.servings}>
            <div className={styles.servings__adjuster}>
              <span className={styles.servings__adjuster__name}>Servings :</span>
              <div
                className={styles.servings__adjuster__icondiv}
                onClick={() => {
                  adjusterFunc("-");
                }}
              >
                <RemoveSharpIcon />
              </div>
              <span className={styles.servings__adjuster__score}>{servingCounter}</span>
              <div
                className={styles.servings__adjuster__icondiv}
                onClick={() => {
                  adjusterFunc("+");
                }}
              >
                <AddSharpIcon />
              </div>
            </div>
            <div className={styles.servings__size}>
              <span className={styles.servings__adjuster__name}>Servings Size :</span>
              <span className={styles.servings__size__score}>
                {servingCounter * 16}&nbsp;oz
              </span>
            </div>
            <div className={styles.servings__units}>
              <div className={styles.servings__units__active}>
                <span className={styles.servings__units__country}>Us</span>
                <span className={styles.servings__units__scale}>Metric</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ingredients}>
          <DragDropContext onDragEnd={(result) => handleOnDragEnd(result)}>
            <Droppable droppableId="draggableIngredientList">
              {(provided) => (
                <ul {...provided.droppableProps} ref={provided.innerRef}>
                  {selectedIngredientsList?.map((elem, index) => {
                    return (
                      <Draggable
                        key={elem.ingredientName + elem._id}
                        draggableId={elem.ingredientName + elem._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            className={styles.ingredients__li}
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div
                              className={styles.ingredients__drag}
                              {...provided.dragHandleProps}
                            >
                              <DragIndicatorIcon className={styles.ingredients__drag} />
                            </div>
                            {elem.featuredImage !== null ? (
                              <div className={styles.ingredients__icons}>
                                <Image
                                  src={elem.featuredImage}
                                  alt="Picture will load soon"
                                  objectFit="contain"
                                  layout="fill"
                                />
                              </div>
                            ) : (
                              <div className={styles.ingredients__icons}>
                                <Image
                                  src={"/food/Dandelion.png"}
                                  alt="Picture will load soon"
                                  objectFit="contain"
                                  layout="fill"
                                />
                              </div>
                            )}
                            {/* to create ingredients lists  */}
                            <div className={styles.ingredients__text}>
                              <span>
                                {elem.portions[0].meausermentWeight ===
                                "Quantity not specified"
                                  ? 1
                                  : // @ts-ignore
                                    Math.ceil(
                                      // @ts-ignore
                                      parseFloat(
                                        // @ts-ignore
                                        (100 / elem?.portions[0].meausermentWeight) *
                                          servingCounter
                                      ).toFixed(1)
                                    )}
                                &nbsp;
                              </span>
                              <span>
                                {elem.portions[0].measurement === "Quantity not specified"
                                  ? ""
                                  : elem.portions[0].measurement}
                                &nbsp;
                              </span>
                              <span className={styles.ingredients__text__highlighted}>
                                {elem.ingredientName}
                              </span>
                            </div>
                            <span
                              className={styles.ingredients__edit}
                              // onClick={() => editIngredient(elem.id)}
                            ></span>
                            <div
                              className={styles.ingredients__bin}
                              onClick={() => removeIngredient(elem._id)}
                            >
                              <Image
                                src={"/icons/noun_Delete_1447966.svg"}
                                alt=""
                                layout="fill"
                                objectFit="contain"
                              />
                            </div>
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className={styles.ingredients__searchBar}>
            <span>
              <input
                onKeyDown={(e) => {
                  // IngredientSubmitHandler(e);
                }}
                value={""}
                onChange={(e) => {
                  // inputTagValueHandlerIngredient(e);
                }}
                type="text"
                name="recipe elements"
                id=""
                placeholder="Enter a single ingredient or paste several ingredients"
              />
            </span>
          </div>
        </div>
      </div>
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
          <ol>
            {howToState?.map((elem) => {
              return (
                <li className={styles.how__to__steps__li} key={elem.id}>
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
                    <div className={styles.how__to__steps__li__bin__imgDiv}>
                      <Image
                        src={"/icons/noun_Delete_1447966.svg"}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </span>
                </li>
              );
            })}
          </ol>

          <div className={styles.how__to__searchBar}>
            <span>
              <input
                onKeyDown={(e) => {
                  HowToSubmitHandler(e);
                }}
                value={inputValue}
                onChange={(e) => {
                  inputTagValueHandler(e);
                }}
                type="text"
                name="recipe elements"
                id="myTextField"
                placeholder="Type Your Instructions here..."
              />
            </span>
          </div>
        </div>
      </div>
      {/* isFetching */}
      <div className={styles.save__Recipe}>
        {isFetching ? (
          <div className={styles.save__Recipe__button}>
            <ButtonComponent
              type={"primary"}
              style={{}}
              fullWidth={true}
              value="Saving... ."
            />
          </div>
        ) : (
          <div
            className={styles.save__Recipe__button}
            // onClick={() => RecipeApiMutation()}
          >
            <ButtonComponent
              type={"primary"}
              style={{}}
              fullWidth={true}
              value="Save Recipe"
            />
          </div>
        )}
      </div>
    </div>
  );
};
export default IngredientList;
