/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useRef } from "react";
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
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS from "../../../../gqlLib/ingredient/query/filterIngredientByCategroyAndClass";
import { setAllIngredients } from "../../../../redux/slices/ingredientsSlice";
import Image from "next/image";

const CreateNewRecipe = ({ newRecipe, setNewRecipe, deleteItem }: any) => {
  const [winReady, setWinReady] = useState(false);
  const [inputVlaue, setInputValue] = useState("");
  const { allIngredients } = useAppSelector((state) => state?.ingredients);
  const [searchIngredientData, setSearchIngredientData] = useState<any[]>([]);

  const [getBlendNutritionBasedOnRecipeXxx, { data, loading, error }] =
    useLazyQuery(GET_BLEND_NUTRITION_BASED_ON_RECIPE_XXX, {
      fetchPolicy: "network-only",
    });

  const [filterIngredientByCategroyAndClass] = useLazyQuery(
    FILTER_INGREDIENT_BY_CATEGROY_AND_CLASS
  );

  const dispatch = useAppDispatch();
  const isMounted = useRef(false);

  const findItem = (id) => {
    return newRecipe?.ingredients?.find((item) => item?.ingredientId === id);
  };

  const fetchFilterIngredientByCategroyAndClass = async () => {
    try {
      const { data } = await filterIngredientByCategroyAndClass({
        variables: {
          data: {
            ingredientCategory: "All",
            IngredientClass: 1,
          },
        },
      });

      dispatch(setAllIngredients(data?.filterIngredientByCategoryAndClass));
    } catch (error) {
      console.log(error?.message);
    }
  };

  const removeIngredient = (id) => {
    setNewRecipe((state) => ({
      ...state,
      ingredients: [
        ...state?.ingredients?.filter((item) => item?.ingredientId !== id),
      ],
    }));
  };

  const selectIngredientOnClick = (ele) => {
    const item = findItem(ele?._id);

    if (!item) {
      let obj = {};
      ele?.portions?.forEach((item) => {
        if (item?.default) {
          obj["ingredientId"] = ele?._id;
          obj["selectedPortionName"] = item?.measurement;
          obj["weightInGram"] = Number(item?.meausermentWeight);
          obj["label"] = `${Math.ceil(
            //@ts-ignore
            parseFloat(100 / Number(item?.meausermentWeight)).toFixed(1)
          )} ${item?.measurement} ${ele?.ingredientName}`;
        }
      });
      setNewRecipe((state) => ({
        ...state,
        ingredients: [...state?.ingredients, obj],
      }));
      setInputValue("");
    } else {
      setInputValue("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (isMounted.current) {
      if (inputVlaue === "") {
        setSearchIngredientData([]);
      } else {
        const filter = allIngredients?.filter((item) =>
          //@ts-ignore
          item?.ingredientName
            ?.toLowerCase()
            ?.includes(inputVlaue?.toLowerCase())
        );
        setSearchIngredientData(filter);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputVlaue]);

  useEffect(() => {
    if (!allIngredients?.length) {
      fetchFilterIngredientByCategroyAndClass();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

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
          <div
            className={styles.suggested}
            style={
              searchIngredientData.length === 0
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <ul className={styles.suggested__ul}>
              {searchIngredientData?.map((elem) => {
                return (
                  <li
                    key={elem?._id}
                    className={styles.suggested__li}
                    onClick={() => {
                      selectIngredientOnClick(elem);
                    }}
                  >
                    {/* <div className={styles.suggested__div}>
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
                    </div> */}
                    {elem.ingredientName}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className={styles.dargAndDropArea}>
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
