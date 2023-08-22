import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import classes from "./ingredientList&Howto.module.scss";
import { FaSave, FaTimes } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketShoppingSimple,
  faChartSimple,
  faCircleInfo,
  faPen,
  faTimes,
  faTrash,
} from "@fortawesome/pro-light-svg-icons";
import { useMutation } from "@apollo/client";

import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import SEARCH_IN_SCRAPPED_RECIPE_FROM_USER from "../../../../../gqlLib/parsing/mutation/searchInScrappedRecipeFromUser";
import {
  setRecipeIngredients,
  setSelectedIngredientsList,
} from "../../../../../redux/edit_recipe/editRecipeStates";
import notification from "../../../../utility/reactToastifyNotification";
import CircularRotatingLoader from "../../../../../theme/loader/circularRotatingLoader.component";
import Textfield from "../../../../../component/organisms/Forms/Textfield.component";
import Combobox from "../../../../../component/organisms/Forms/Combobox.component";
import IconButton from "../../../../../component/atoms/Button/IconButton.component";
import Tooltip from "../../../../../theme/toolTip/CustomToolTip";
import { NextImageWithFallback } from "../../../../../theme/imageWithFallback";

const defaultValues = {
  ingredientId: "",
  units: "",
  quantity: "",
  preparation: "",
  parsingText: "",
  parsingTextEdit: "",
};

const AddIngredientByParsing = (props) => {
  const {
    allIngredients,
    handleOnDragEnd,
    ingredients,
    nutritionState,
    setNutritionState,
    setIngredientId,
    removeIngredient,
  } = props;
  const [editIngredientId, setEditIngredientId] = useState("");

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const onReset = () => {
    setEditIngredientId("");
    methods.reset(defaultValues);
  };
  return (
    <>
      <ParseIngredient
        methods={methods}
        onReset={() => methods.reset(defaultValues)}
        inputName="parsingText"
      />

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
                      <>
                        {editIngredientId === elem._id ? (
                          <ParseIngredient
                            isEditMode
                            methods={methods}
                            onReset={onReset}
                            inputName="parsingTextEdit"
                            index={index}
                          />
                        ) : (
                          <Draggable
                            key={elem?.ingredientName + elem?._id || index}
                            draggableId={`${
                              elem?.ingredientName + elem?._id || index
                            }`}
                            index={index}
                          >
                            {(provided) => (
                              <li
                                {...provided.draggableProps}
                                ref={provided.innerRef}
                                // className={`${
                                //   (elem?.ingredientStatus === "partial_ok" ||
                                //     elem?.ingredientStatus === "not_ok") &&
                                //   classes.ingredients__partial_ok
                                // }`}
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

                                  <SingleIngredient
                                    {...{
                                      elem,
                                      setNutritionState,
                                      setIngredientId,
                                      setEditIngredientId,
                                      methods,
                                      removeIngredient,
                                      editIngredientId,
                                      onReset,
                                      allIngredients,
                                      nutritionState,
                                    }}
                                  />
                                </div>
                              </li>
                            )}
                          </Draggable>
                        )}
                      </>
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
    </>
  );
};

const ParseIngredient = (props) => {
  const {
    methods,
    onReset,
    isEditMode,
    inputName = "parsingText",
    index,
  } = props;
  const dispatch = useDispatch();
  const { selectedIngredientsList } = useAppSelector(
    (state) => state?.editRecipeReducer,
  );
  const [handleSearchInScrappedRecipeFromUser, { loading }] = useMutation(
    SEARCH_IN_SCRAPPED_RECIPE_FROM_USER,
  );

  // Enter key was pressed
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      methods.handleSubmit(onSubmit)();
    }
  };

  // add new ingredient to ingredient list
  const addNewIngredientToIngredientList = (ing) => {
    let isIngredientExistIndex = 0;
    const isIngredientExist = selectedIngredientsList?.find((item, index) => {
      if (item?._id === ing?._id) {
        isIngredientExistIndex = index;
        return item?._id === ing?._id;
      }
    });
    if (isIngredientExist && isIngredientExistIndex) {
      const items = [...selectedIngredientsList];
      items.splice(isIngredientExistIndex, 1, ing);
      dispatch(setSelectedIngredientsList(items));
    } else {
      dispatch(setSelectedIngredientsList([ing, ...selectedIngredientsList]));
    }
  };

  // submit data
  const onSubmit = async (data) => {
    const { parsingText = "", parsingTextEdit = "" } = data;
    const recipeIngredients = isEditMode ? parsingTextEdit : parsingText;
    if (!recipeIngredients) {
      notification("warning", "Please enter text");
      return;
    }
    try {
      const { data } = await handleSearchInScrappedRecipeFromUser({
        variables: { recipeIngredients, isClient: true },
      });

      const { blendIngredients, errorIngredients, notFoundIndexes } =
        data?.searchInScrappedRecipeFromUser;

      if (notFoundIndexes?.length) {
        let partialError = errorIngredients[notFoundIndexes?.length - 1 || 0];
        partialError = {
          ...partialError,
          errorIngredientId: partialError?.ingredientId,
          ingredientStatus: "partial_ok",
          _id: partialError?.qaId,
          ingredientName: partialError?.errorString,
        };

        if (isEditMode && index !== undefined) {
          const items = [...selectedIngredientsList];
          items.splice(index, 1, partialError);
          dispatch(setSelectedIngredientsList(items));
        } else {
          addNewIngredientToIngredientList(partialError);
        }

        onReset();
        notification("warning", "data not found at database");
        return;
      }

      if (blendIngredients.length) {
        const [
          {
            ingredientId,
            selectedPortionName,
            weightInGram,
            db_name,
            featuredImage,
            quantity,
          },
        ] = blendIngredients;

        const value = {
          weightInGram,
          selectedPortion: {
            name: selectedPortionName,
            quantity: quantity,
            gram: parseInt(weightInGram),
          },
          ingredientId: {
            _id: ingredientId,
            ingredientName: db_name,
            featuredImage: featuredImage || "",
            images: featuredImage || "",
          },
          _id: ingredientId,
          ingredientName: db_name,
          featuredImage: featuredImage,
          ingredientStatus: "ok",
        };

        if (isEditMode && index !== undefined) {
          const items = [...selectedIngredientsList];
          items.splice(index, 1, value);
          dispatch(setSelectedIngredientsList(items));
        } else {
          addNewIngredientToIngredientList(value);
        }
        onReset();
      }
    } catch (error) {
      notification("error", "No data found");
      const obj = {
        errorString: recipeIngredients,
        ingredientStatus: "not_ok",
        _id: recipeIngredients + index,
        ingredientName: recipeIngredients,
      };
      if (isEditMode && index !== undefined) {
        const items = [...selectedIngredientsList];
        items.splice(index, 1, obj);
        dispatch(setSelectedIngredientsList(items));
      } else {
        addNewIngredientToIngredientList(obj);
      }
      onReset();
    }
  };

  useEffect(() => {
    if (isEditMode) {
      const field: HTMLInputElement = document.querySelector(
        `input[name=${inputName}]`,
      );
      if (field) field.focus();
    }
  }, [inputName, isEditMode]);
  return (
    <div
      className={`${classes.addToCart} ${
        isEditMode ? classes["addToCart--edit"] : classes["addToCart--top"]
      }`}
    >
      <FormProvider {...methods}>
        <div className={`${classes.inputWrapper} d-flex ai-center jc-center`}>
          <Textfield
            name={inputName}
            placeholder={isEditMode ? "Edit ingredient" : "Add ingredient"}
            onKeyDown={(e) => handleKeyPress(e)}
          />
          {loading ? (
            <CircularRotatingLoader
              color="gray"
              style={{ margin: "auto 1rem" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faTimes}
              className={`${classes.icon} ml-10 mr-10 pointer`}
              onClick={onReset}
            />
          )}
        </div>
      </FormProvider>
    </div>
  );
};

const SingleIngredient = ({
  elem,
  setNutritionState,
  setIngredientId,
  setEditIngredientId,
  methods,
  removeIngredient,
  editIngredientId,
  onReset,
  allIngredients,
  nutritionState,
}) => {
  const windowScrollToZero = (elem = {}) => {
    window.scrollBy(0, 0);
    setNutritionState(elem);
  };

  const editIngredient = (elem) => {
    setEditIngredientId(elem?._id);
    let resetIngredient;
    if (elem.hasOwnProperty("selectedPortion")) {
      //! Preparation needs to be handled here
      resetIngredient = {
        units: elem?.selectedPortion?.name,
        quantity: elem?.selectedPortion?.quantity,
        preparation: 0,
        parsingTextEdit: `${Math?.round(elem.selectedPortion?.quantity || 1)} ${
          elem.selectedPortion?.name ||
          elem?.portions?.[0]?.measurement ||
          "cup"
        } ${elem.ingredientName}`,
      };
    } else {
      const value = elem?.portions?.find((item) => item.default);

      resetIngredient = {
        ...resetIngredient,
        units: value?.measurement || elem?.portions?.[0]?.measurement || "cup",
        quantity: 1,
        preparation: 0,
        parsingTextEdit: elem?.errorString,
      };
    }

    methods.reset({
      ingredientId: elem?._id,
      ...resetIngredient,
    });
  };
  return (
    <>
      <div className={`${classes.ingredients__icons}`}>
        {elem?.ingredientStatus === "ok" ? (
          elem?.featuredImage || elem?.images?.[0] ? (
            <NextImageWithFallback
              src={
                elem?.featuredImage ||
                elem?.images?.[0] ||
                "/food/Dandelion.png"
              }
              fallbackSrc="/images/basket.svg"
              alt="Picture will load soon"
              style={{ objectFit: "contain" }}
              fill
            />
          ) : (
            <FontAwesomeIcon icon={faBasketShoppingSimple} />
          )
        ) : (
          <FontAwesomeIcon icon={faBasketShoppingSimple} />
        )}
      </div>
      {/* to create ingredients lists  */}
      {elem?.ingredientStatus === "ok" ? (
        <>
          <div className={classes.ingredients__text}>
            <span>
              {parseInt(elem.selectedPortion?.quantity || 1)
                .toFixed(2)
                .replace(/\.?0+$/, "")}
              &nbsp;
            </span>
            <span>
              {elem.selectedPortion?.name ||
                elem?.portions?.[0]?.measurement ||
                "cup"}
              &nbsp;
            </span>
            <span
              className={`${classes.ingredients__text__highlighted} ${
                elem._id === nutritionState?._id && "activeColorPrimary"
              }`}
              onClick={() =>
                windowScrollToZero(elem._id === nutritionState?._id ? {} : elem)
              }
            >
              {elem?.ingredientName}
            </span>
            {elem.comment && <span>{`, ${elem.comment}`}</span>}
          </div>
        </>
      ) : (
        <span
          className={`${classes.ingredients__text} ${
            elem?.ingredientStatus === "not_ok" &&
            classes["ingredients__text--not_ok"]
          } ${
            elem?.ingredientStatus === "partial_ok" &&
            classes["ingredients__text--partial_ok"]
          }`}
        >
          {elem?.errorString}
          &nbsp;
        </span>
      )}

      <div className={`${classes.ingredients__iconTray}`}>
        {elem?.ingredientStatus === "ok" && (
          <>
            <Tooltip direction="top" content="Wiki">
              <FontAwesomeIcon
                icon={faCircleInfo}
                className={classes.ingredients__iconTray__icons}
                onClick={() => setIngredientId(elem._id)}
              />
            </Tooltip>
            <Tooltip direction="top" content="Nutation">
              <FontAwesomeIcon
                icon={faChartSimple}
                className={`${classes.ingredients__iconTray__icons} ${
                  elem._id === nutritionState?._id && "activeColorPrimary"
                }`}
                onClick={() =>
                  windowScrollToZero(
                    elem._id === nutritionState?._id ? {} : elem,
                  )
                }
              />
            </Tooltip>
          </>
        )}
        <Tooltip direction="top" content="Edit">
          <FontAwesomeIcon
            icon={faPen}
            className={`${classes.ingredients__iconTray__icons}
            `}
            onClick={() => editIngredient(elem)}
          />
        </Tooltip>
        <Tooltip direction="top" content="Remove">
          <FontAwesomeIcon
            icon={faTrash}
            className={`${classes.ingredients__iconTray__icons} 
            `}
            onClick={() => removeIngredient(elem?._id)}
          />
        </Tooltip>
      </div>
    </>
  );
};

export default AddIngredientByParsing;

// const AddToCartForm = (props) => {
//   const { methods, isEditMode, allIngredients, onReset } = props;

//   const dispatch = useAppDispatch();

//   const ingredientList = useMemo(() => {
//     return allIngredients.map((ingredient) => ({
//       value: ingredient._id,
//       label: ingredient.ingredientName,
//     }));
//   }, [allIngredients]);

//   const ingredientId = useWatch({
//     control: methods.control,
//     name: "ingredientId",
//   });

//   const [ingredient, units] = useMemo(() => {
//     const ingredient = allIngredients.find((elem) => elem._id === ingredientId);
//     const units = ingredient
//       ? ingredient.portions.map((portion) => portion.measurement)
//       : [];
//     return [ingredient, units];
//   }, [allIngredients, ingredientId]);

//   const onSubmit = (data) => {
//     const portion = ingredient?.portions.find(
//       (portion) => portion?.measurement === data.units,
//     );
//     const weightInGram =
//       parseInt(portion?.meausermentWeight) * parseInt(data.quantity);
//     const value = {
//       ...ingredient,
//       weightInGram,
//       selectedPortion: {
//         name: data?.units,
//         quantity: data?.quantity,
//         gram: parseInt(portion?.meausermentWeight),
//       },
//       ingredientId: {
//         _id: ingredient?._id,
//         ingredientName: ingredient?.ingredientName,
//         featuredImage: ingredient?.featuredImage,
//         images: ingredient?.images,
//       },
//       ingredientStatus: "ok",
//     };
//     //setSelectedIngredientsList
//     dispatch(setRecipeIngredients(value));
//     onReset();
//   };

//   return (
//     <div
//       className={`${classes.addToCart} ${
//         isEditMode ? classes["addToCart--edit"] : classes["addToCart--top"]
//       }`}
//     >
//       <div className={classes.addToCart__form}>
//         <FormProvider {...methods}>
//           <div className="row ai-center">
//             <div className="col-4">
//               <Combobox
//                 placeholder="Ingredient"
//                 name="ingredientId"
//                 options={ingredientList}
//               />
//             </div>
//             <div className="col-3">
//               <Combobox
//                 placeholder="Units"
//                 name="units"
//                 options={units}
//                 disabled={!ingredientId}
//               />
//             </div>
//             <div className="col-2">
//               <Textfield
//                 name="quantity"
//                 placeholder="Quantity"
//                 disabled={!ingredientId}
//               />
//             </div>
//             <div className="col-3">
//               <Textfield
//                 name="preparation"
//                 placeholder="Preparation Time"
//                 disabled={!ingredientId}
//               />
//             </div>
//           </div>
//         </FormProvider>
//       </div>
//       <div className={classes.addToCart__buttons}>
//         <IconButton
//           variant="white"
//           size="small"
//           className="mr-10"
//           disabled={!ingredientId}
//           onClick={methods.handleSubmit(onSubmit)}
//         >
//           <FaSave />
//         </IconButton>
//         <IconButton variant="white" size="small" onClick={onReset}>
//           <FaTimes />
//         </IconButton>
//       </div>
//     </div>
//   );
// };
