import React, { useEffect, useState } from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import ButtonComponent from "../../../../../theme/button/buttonA/button.component";
import {
  setServings,
  setIngredientsToList,
  setIngredientsSentence,
  setHowToSteps,
} from "../../../../../redux/edit_recipe/quantity";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { List_of_ingredients } from "./ingredientList";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

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

  const ingredientsSentence = useAppSelector(
    (state) => state.quantityAdjuster.ingredientSentence
  );

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

  const IngredientSubmitHandler = (event) => {
    let ingredientTempList = [...List_of_ingredients];
    if (event.key === "Enter") {
      console.log(ingredientTempList);
      ingredientTempList = [
        ...ingredientTempList,
        {
          sentence: event.target.value.sentence,
          imageUrl: event.target.value.imageUrl,
          checked: event.target.checked,
        },
      ];

      dispatch(setIngredientsToList(ingredientTempList));
      console.log(ingredients_list);
    }
  };
  // ingredients list related code ending
  // =========================================================================
  // [how to] list related code begin
  const HowToSubmitHandler = (event) => {
    let howList = [];
    if (event.key === "Enter") {
      howList = [...howToState, { step: event.target.value }];
      dispatch(setHowToSteps(howList));
      console.log(howList);
      // if want instruction to vanish after pressing enter just uncomment below line
      event.target.value = "";
    }
  };

  const removeStep = (index_value: number) => {
    let updated_list = [...howToState];
    updated_list.splice(index_value, 1);
    dispatch(setHowToSteps(updated_list));
  };

  // howTo list related code end

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
            {ingredients_list.map((elem, index) => {
              return (
                <li key={index} className={styles.ingredients__li}>
                  <div className={styles.ingredients__drag}>
                    <DragIndicatorIcon className={styles.ingredients__drag} />
                  </div>
                  {elem.imageUrl ? (
                    <div className={styles.ingredients__icons}>
                      <Image
                        src={elem.imageUrl}
                        alt="Picture will load soon"
                        objectFit="contain"
                        layout="fill"
                      />
                    </div>
                  ) : (
                    <div className={styles.ingredients__icons}></div>
                  )}
                  {/* to create ingredients lists  */}
                  {elem.checked == false ? (
                    <div className={styles.ingredients__text}>
                      <span>{elem.sentence}</span>
                    </div>
                  ) : (
                    <div className={styles.ingredients__text}>
                      <span className={styles.ingredients__text__highlighted}>
                        {elem.sentence}
                      </span>
                    </div>
                  )}
                  <div className={styles.ingredients__bin}>
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
            {howToState.map((elem, index) => {
              return (
                <li className={styles.how__to__steps__li} key={index}>
                  {elem.step}
                  <span
                    className={styles.bin}
                    onClick={() => removeStep(index)}
                  >
                    <Image
                      src={"/icons/noun_Delete_1447966.svg"}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
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
                type="text"
                name="recipe elements"
                id=""
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
