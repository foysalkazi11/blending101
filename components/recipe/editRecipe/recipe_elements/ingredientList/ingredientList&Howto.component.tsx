import React, { useEffect, useState } from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "../../../../../public/icons/add_black_36dp.svg";
import RemoveSharpIcon from "../../../../../public/icons/remove_black_36dp.svg";
import ButtonComponent from "../../../../../theme/button/buttonA/button.component";
import {
  setServings,
  setIngredientsToList,
  setHowToSteps,
} from "../../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import DragIndicatorIcon from "../../../../../public/icons/drag_indicator_black_36dp.svg";
import ModeEditOutlineOutlinedIcon from "../../../../../public/icons/mode_edit_black_36dp.svg";
import { ingredientLeafy } from "../../leftTray/left_tray_recipe_edit_list";

const IngredientList = () => {
  const dispatch = useAppDispatch();

  //variables for all states ==>start
  const quantity_number = useAppSelector(
    (state) => state.quantityAdjuster.quantityNum
  );
  const servings_number = useAppSelector(
    (state) => state.quantityAdjuster.servingsNum
  );

  const ingredients_list = useAppSelector(
    (state) => state.quantityAdjuster.ingredientsList
  );

  // const ingredientsList = useAppSelector((state) => state.sideTray.ingredients);

  const howToState = useAppSelector(
    (state) => state.quantityAdjuster.howtoState
  );

  // variables for all states ==>ending
  // =========================================================================
  // sets value of top card in recipe editd page equal to ingredients page
  useEffect(() => {
    dispatch(setServings(quantity_number));
  }, [dispatch, quantity_number]);

  const adjusterFunc = (task) => {
    if (servings_number <= 0 && task == "-") {
      dispatch(setServings(0));
    } else {
      task === "+"
        ? dispatch(setServings(servings_number + 1))
        : dispatch(setServings(servings_number - 1));
    }
  };
  // =========================================================================
  // ingredients list related code below
  const [inputValueIngredient, setInputValueIngredient] = useState("");
  const inputTagValueHandlerIngredient = (e) => {
    let tempValue = e.target.value;
    setInputValueIngredient(tempValue);
  };
  let ingredientTempList = [...ingredients_list];
  const IngredientSubmitHandler = (event) => {
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }
      // search output fetches all elements present in left tray
      let SearchOutput = ingredientLeafy.find((elem) => {
        return elem.title === inputValueIngredient;
      });
      // search input fetches all elements that will be pushed inside ingredients list + all elements that will be
      let SearchOutputIngredientList = ingredients_list.find((elem) => {
        return elem.title === inputValueIngredient;
      });
      // to check if searched input already exists in ingredient list
      if (SearchOutput && !SearchOutputIngredientList) {
        ingredientTempList = [...ingredientTempList, SearchOutput];
      }

      console.log(SearchOutput, "Searching Output");

      console.log(ingredientTempList, "temp list for active elements");
      dispatch(setIngredientsToList(ingredientTempList));
      setInputValueIngredient("");
    }
  };

  const editIngredient = (id) => {
    let newEditStep = ingredients_list.find((elem) => {
      return elem.id === id;
    });
    setEditMode(true);
    setInputValue(newEditStep.title);
    setSelectedElementId(id);
  };

  const removeIngredient = (id) => {
    let updated_list = ingredients_list.filter((elem) => {
      return id !== elem.id;
    });
    dispatch(setIngredientsToList(updated_list));
  };

  // ingredients list related code ending
  // =========================================================================
  // [how to] list related code begin

  const HowToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      if (!event.target.value || /^\s*$/.test(event.target.value)) {
        return;
      }

      if (editMode === true) {
        dispatch(
          setHowToSteps(
            howToState.map((elem) => {
              if (elem.id === selectedElementId) {
                return { ...elem, step: inputValue };
              }
              return elem;
            })
          )
        );

        setEditMode(false);
        setInputValue("");
        setSelectedElementId(null);
      } else {
        howList = [
          ...howToState,
          { id: new Date().getTime().toString(), step: inputValue },
        ];
        dispatch(setHowToSteps(howList));
        // if want instruction to vanish after pressing enter just uncomment below line
        setInputValue("");
      }
    }
  };

  const removeStep = (id) => {
    let updated_list = howToState.filter((elem) => {
      return id !== elem.id;
    });
    // updated_list.splice(index_value, 1);
    dispatch(setHowToSteps(updated_list));
  };

  // const [editState, seteditState] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedElementId, setSelectedElementId] = useState(null);

  const editStep = (id) => {
    let newEditStep = howToState.find((elem) => {
      document.getElementById("myTextField").focus();

      return elem.id === id;
    });
    setEditMode(true);
    setInputValue(newEditStep.step);
    setSelectedElementId(id);
  };

  // howTo list related code end

  //how to input state below

  const [inputValue, setInputValue] = useState("");
  const inputTagValueHandler = (e) => {
    let tempValue = e.target.value;
    setInputValue(tempValue);
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
              <span className={styles.servings__adjuster__name}>
                Servings :
              </span>
              <div
                className={styles.servings__adjuster__icondiv}
                onClick={() => {
                  adjusterFunc("-");
                }}
              >
                <RemoveSharpIcon />
              </div>
              <span className={styles.servings__adjuster__score}>
                {servings_number}
              </span>
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
              <span className={styles.servings__adjuster__name}>
                Servings Size :
              </span>
              <span className={styles.servings__size__score}>
                {servings_number * 16}&nbsp;oz
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
          <ul>
            {ingredients_list.map((elem) => {
              return (
                <li key={elem.id} className={styles.ingredients__li}>
                  <div className={styles.ingredients__drag}>
                    <DragIndicatorIcon className={styles.ingredients__drag} />
                  </div>
                  {elem.img ? (
                    <div className={styles.ingredients__icons}>
                      <Image
                        src={elem.img}
                        alt="Picture will load soon"
                        objectFit="contain"
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <div className={styles.ingredients__icons}></div>
                  )}
                  {/* to create ingredients lists  */}
                  <div className={styles.ingredients__text}>
                    <span>{elem.servings * servings_number} &nbsp;</span>
                    <span>{elem.measuring_scale} &nbsp;</span>
                    <span className={styles.ingredients__text__highlighted}>
                      {elem.title} &nbsp;
                    </span>
                    <span>{elem.extra_sentence} &nbsp;</span>
                  </div>
                  <span
                    className={styles.ingredients__edit}
                    onClick={() => editIngredient(elem.id)}
                  >
                    {/* <ModeEditOutlineOutlinedIcon /> */}
                  </span>
                  <div
                    className={styles.ingredients__bin}
                    onClick={() => removeIngredient(elem.id)}
                  >
                    <Image
                      src={"/icons/noun_Delete_1447966.svg"}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
          <div className={styles.ingredients__searchBar}>
            <span>
              <input
                onKeyDown={(e) => {
                  IngredientSubmitHandler(e);
                }}
                value={inputValueIngredient}
                onChange={(e) => {
                  inputTagValueHandlerIngredient(e);
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
            {howToState.map((elem) => {
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
      <div className={styles.save__Recipe}>
        <div className={styles.save__Recipe__button}>
          <ButtonComponent
            type={"primary"}
            style={{}}
            fullWidth={true}
            value="Save Recipe"
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
