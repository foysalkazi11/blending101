import React, { Fragment, useMemo, useState } from "react";
import Image from "next/image";
import { BiBarChart } from "react-icons/bi";
import { BsCartPlus } from "react-icons/bs";
import { MdOutlineDelete, MdOutlineEdit, MdOutlineInfo } from "react-icons/md";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";

import AddSharpIcon from "../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../public/icons/remove_black_36dp.svg";
import DragIndicatorIcon from "../../../public/icons/drag_indicator_black_36dp.svg";

import classes from "../../../components/recipe/editRecipe/recipe_elements/ingredientList/ingredientList&Howto.module.scss";
import styles from "./Ingredient.module.scss";
import Combobox from "../../organisms/Forms/Combobox.component";
import Textfield from "../../organisms/Forms/Textfield.component";
import IconButton from "../../atoms/Button/IconButton.component";
import { FaPen, FaPlus, FaSave, FaTimes } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Icon from "../../atoms/Icon/Icon.component";
import ButtonComponent from "../../../theme/button/button.component";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setRecipeIngredients } from "../../../redux/edit_recipe/editRecipeStates";

const IngredientSection = (props) => {
  const {
    allIngredients,
    adjusterFunc,
    servingCounter,
    calculatedIngOz,
    handleOnDragEnd,
    ingredients,
    nutritionState,
    setNutritionState,
    setIngredientId,
    removeIngredient,
  } = props;
  const [showAddIngredient, setShowAddIngredient] = useState(false);
  const [editIngredientId, setEditIngredientId] = useState("");

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const onReset = () => {
    setShowAddIngredient(false);
    setEditIngredientId("");
    methods.reset(defaultValues);
  };
  return (
    <div className={classes.ingredients__main__card}>
      <div className={classes.headingDiv}>
        <div className={classes.basket__icon}>
          <Image
            src={"/icons/basket.svg"}
            alt="icon"
            width={"17px"}
            height={"15px"}
          />
        </div>
        <h5>Ingredients</h5>
      </div>
      <div className={classes.blending__ingredients}>
        <div className={classes.servings}>
          <div className={classes.servings__adjuster}>
            <span className={classes.servings__adjuster__name}>Servings :</span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingCounter - 1);
              }}
            >
              <RemoveSharpIcon />
            </div>
            <span className={classes.servings__adjuster__score}>
              {servingCounter}
            </span>
            <div
              className={classes.servings__adjuster__icondiv}
              onClick={() => {
                adjusterFunc(servingCounter + 1);
              }}
            >
              <AddSharpIcon />
            </div>
          </div>
          <div className={classes.servings__size}>
            <span className={classes.servings__adjuster__name}>Volume :</span>
            <span className={classes.servings__size__score}>
              {calculatedIngOz}&nbsp;oz
            </span>
          </div>
          <div className={classes.servings__units}>
            <div>
              <span className={classes.servings__units__country}>Us</span>
              <span className={classes.servings__units__scale}>Metric</span>
            </div>
          </div>
        </div>
      </div>
      {showAddIngredient ? (
        <AddToCartForm
          allIngredients={allIngredients}
          methods={methods}
          onReset={onReset}
        />
      ) : (
        <div className={styles.ingredient__add}>
          <ButtonComponent
            value="Add Ingredient"
            type="transparentHover"
            onClick={() => {
              onReset();
              setShowAddIngredient(true);
            }}
          />
        </div>
      )}
      <div className={classes.ingredients}>
        <DragDropContext
          onDragEnd={(result) => handleOnDragEnd(result, "ingredients")}
        >
          <Droppable droppableId="draggableIngredientList">
            {(provided) => (
              <ul {...provided.droppableProps} ref={provided.innerRef}>
                {ingredients ? (
                  ingredients?.map((elem, index) => {
                    // const orgIngredient = orgIngredients.find(
                    //   (ing) => ing.ingredientId._id === elem?._id,
                    // );
                    // if (!orgIngredient) return;
                    return (
                      <Draggable
                        key={elem.ingredientName + elem?._id}
                        draggableId={elem.ingredientName + elem?._id}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            {...provided.draggableProps}
                            ref={provided.innerRef}
                          >
                            <div className={classes.ingredients__item}>
                              <div
                                className={classes.ingredients__drag}
                                {...provided.dragHandleProps}
                              >
                                <DragIndicatorIcon
                                  className={classes.ingredients__drag}
                                />
                              </div>
                              <div className={classes.ingredients__icons}>
                                {elem.featuredImage || elem.images?.length ? (
                                  <Image
                                    src={elem.featuredImage || elem.images[0]}
                                    alt="Picture will load soon"
                                    objectFit="contain"
                                    layout="fill"
                                  />
                                ) : (
                                  <Image
                                    src={"/food/Dandelion.png"}
                                    alt="Picture will load soon"
                                    objectFit="contain"
                                    layout="fill"
                                  />
                                )}
                              </div>
                              {/* to create ingredients lists  */}
                              <div className={classes.ingredients__text}>
                                <span>
                                  {elem.selectedPortion?.quantity || 1}
                                  &nbsp;
                                </span>
                                <span>
                                  {/* {elem.portions[0].measurement ===
                                  "Quantity not specified"
                                    ? ""
                                    : elem.portions[0].measurement} */}
                                  {/* {elem.units ||
                                    orgIngredient.selectedPortion?.name ||
                                    elem?.portions[0]?.measurement ||
                                    "cup"} */}
                                  {elem.selectedPortion?.name ||
                                    elem?.portions[0]?.measurement ||
                                    "cup"}
                                  &nbsp;
                                </span>
                                {
                                  //@ts-ignore
                                  elem._id === nutritionState?._id ? (
                                    <span
                                      className={
                                        classes.ingredients__text__highlighted
                                      }
                                      onClick={() => {
                                        window.scrollBy(0, 0);
                                        setNutritionState({});
                                      }}
                                      style={{ color: "#fe5d1f" }}
                                    >
                                      {elem.ingredientName}
                                    </span>
                                  ) : (
                                    <span
                                      className={
                                        classes.ingredients__text__highlighted
                                      }
                                      onClick={() => {
                                        window.scrollBy(0, 0);
                                        setNutritionState(elem);
                                      }}
                                    >
                                      {elem.ingredientName}
                                    </span>
                                  )
                                }
                              </div>

                              <div
                                className={classes.ingredients__iconTray}
                                style={
                                  // @ts-ignore
                                  elem._id === nutritionState?._id
                                    ? { display: "flex" }
                                    : {}
                                }
                              >
                                <MdOutlineInfo
                                  className={
                                    classes.ingredients__iconTray__icons
                                  }
                                  onClick={() => setIngredientId(elem._id)}
                                />

                                {
                                  //@ts-ignore
                                  elem._id === nutritionState?._id ? (
                                    <BiBarChart
                                      style={{ color: "#fe5d1f" }}
                                      className={
                                        classes.ingredients__iconTray__icons
                                      }
                                      onClick={() => {
                                        window.scrollBy(0, 0);
                                        setNutritionState({});
                                      }}
                                    />
                                  ) : (
                                    <BiBarChart
                                      className={
                                        classes.ingredients__iconTray__icons
                                      }
                                      onClick={() => {
                                        window.scrollBy(0, 0);
                                        setNutritionState(elem);
                                      }}
                                    />
                                  )
                                }
                                <MdOutlineEdit
                                  className={
                                    classes.ingredients__iconTray__icons
                                  }
                                  onClick={() => {
                                    setEditIngredientId(elem?._id);
                                    setShowAddIngredient(false);
                                    methods.reset({
                                      ingredientId: elem?._id,
                                      units: elem?.units,
                                      quantity: elem?.quantity,
                                      preparation: elem?.preparation,
                                    });
                                  }}
                                />
                                <MdOutlineDelete
                                  className={
                                    classes.ingredients__iconTray__icons
                                  }
                                  onClick={() => removeIngredient(elem?._id)}
                                />
                              </div>
                            </div>
                            {editIngredientId === elem._id && (
                              <AddToCartForm
                                isEditMode
                                methods={methods}
                                allIngredients={allIngredients}
                                onReset={onReset}
                              />
                            )}
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
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

const defaultValues = {
  ingredientId: "",
  units: "",
  quantity: "",
  preparation: "",
};

const AddToCartForm = (props) => {
  const { methods, isEditMode, allIngredients, onReset } = props;

  const dispatch = useAppDispatch();

  const ingredientList = useMemo(() => {
    return allIngredients.map((ingredient) => ({
      value: ingredient._id,
      label: ingredient.ingredientName,
    }));
  }, [allIngredients]);

  const ingredientId = useWatch({
    control: methods.control,
    name: "ingredientId",
  });

  const [ingredient, units] = useMemo(() => {
    const ingredient = allIngredients.find((elem) => elem._id === ingredientId);
    const units = ingredient
      ? ingredient.portions.map((portion) => portion.measurement)
      : [];
    return [ingredient, units];
  }, [allIngredients, ingredientId]);

  const onSubmit = (data) => {
    const portion = ingredient?.portions.find(
      (portion) => portion?.measurement === data.units,
    );
    const weightInGram =
      parseInt(portion?.meausermentWeight) * parseInt(data.quantity);
    const value = {
      ...ingredient,
      weightInGram,
      selectedPortion: {
        name: data?.units,
        quantity: data?.quantity,
        gram: weightInGram,
      },
    };
    dispatch(setRecipeIngredients(value));
    onReset();
  };

  return (
    <div
      className={`${styles.addToCart} ${
        isEditMode ? styles["addToCart--edit"] : styles["addToCart--top"]
      }`}
    >
      <div className={styles.addToCart__form}>
        <FormProvider {...methods}>
          <div className="row ai-center">
            <div className="col-4">
              <Combobox
                placeholder="Ingredient"
                name="ingredientId"
                options={ingredientList}
              />
            </div>
            <div className="col-3">
              <Combobox
                placeholder="Units"
                name="units"
                options={units}
                disabled={!ingredientId}
              />
            </div>
            <div className="col-2">
              <Textfield
                name="quantity"
                placeholder="Quantity"
                disabled={!ingredientId}
              />
            </div>
            <div className="col-3">
              <Textfield
                name="preparation"
                placeholder="Preparation Time"
                disabled={!ingredientId}
              />
            </div>
          </div>
        </FormProvider>
      </div>
      <div className={styles.addToCart__buttons}>
        <IconButton
          variant="white"
          size="small"
          className="mr-10"
          disabled={!ingredientId}
          onClick={methods.handleSubmit(onSubmit)}
        >
          <FaSave />
        </IconButton>
        <IconButton variant="white" size="small" onClick={onReset}>
          <FaTimes />
        </IconButton>
      </div>
    </div>
  );
};

export default IngredientSection;
