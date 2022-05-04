/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CheckCircle from "../../../../public/icons/check_circle_black_36dp.svg";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIngredientsToList } from "../../../../redux/edit_recipe/quantity";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../../theme/switch/switchTwo.component";
import styles from "./left_tray_recipe_edit.module.scss";
import { filterRankingList } from "./left_tray_recipe_edit_list";
import Image from "next/image";
import { useLazyQuery } from "@apollo/client";
import { INGREDIENTS_BY_CATEGORY_AND_CLASS } from "../../../../gqlLib/recipes/queries/getEditRecipe";
import { setSelectedIngredientsList } from "../../../../redux/edit_recipe/editRecipeStates";

interface recipeData {
  allIngredients?: any;
  recipeIngredients?: object[];
}
const Left_tray_recipe_edit = ({
  allIngredients,
  recipeIngredients,
}: recipeData) => {
  // Variables - START ===========================================>

  const ingredients = filterRankingList;
  const categories = [
    { title: "All", val: "all" },
    { title: "Leafy", val: "leafy" },
    { title: "Fruity", val: "Fruity" },
    { title: "Nutty", val: "nutty" },
    { title: "Frozed", val: "frozed" },
  ];

  // Variables - END +++++++++++++++++++++++++++++++++++++++++++++<

  // LocalStates - START =========================================>

  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const [input, setinput] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [ascendingDescending, setascendingDescending] = useState(false);
  const [list, setList] = useState([]);
  const [rankingDropDownState, setRankingDropDownState] = useState(null);
  // LocalStates - END +++++++++++++++++++++++++++++++++++++++++++<

  // ReduxStates -START ==========================================>

  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList
  );

  // ReduxStates - End +++++++++++++++++++++++++++++++++++++++++++<

  // useEffect START =============================================>
  useEffect(() => {
    setIngredientList(allIngredients);
  }, [allIngredients]);

  useEffect(() => {
    DropDown(dpd);
  }, [dpd]);

  // console.log(ingredientList);
  // console.log(selectedIngredientsList);
  // console.log(dpd);
  // useEffect END +++++++++++++++++++++++++++++++++++++++++++++++<

  // Controllers - START =========================================>

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen === ingredient) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...selectedIngredientsList, ingredient];
    } else {
      blendz = selectedIngredientsList?.filter((blen) => {
        return blen !== ingredient;
      });
    }

    dispatch(setSelectedIngredientsList(blendz));
  };

  const checkActive = (ingredient: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen.ingredientName === ingredient) {
        present = true;
      }
    });
    return present;
  };

  const SearchResults = (value) => {
    setinput(value);
    const elements = allIngredients?.filter((item) => {
      return item.ingredientName.includes(value);
    });
    setIngredientList(elements);
  };

  const DropDown = (dpd) => {
    if (dpd.title !== "All") {
      const classElements = allIngredients?.filter((item) => {
        return item.category === dpd.title;
      });
      setIngredientList(classElements);
    } else {
      setIngredientList(allIngredients);
    }
  };
  // Controllers - END +++++++++++++++++++++++++++++++++++++++++++<

  // code for rankings

  const recipeRankingsHighestValue = () => {
    let highestValue = 1;
    ingredientList?.forEach((elem) => {
      let defaultMeasurement = elem?.portions?.filter((itm) => {
        return itm?.default === true;
      });
      if (Number(highestValue) < Number(defaultMeasurement[0]?.meausermentWeight)) {
        highestValue = Number(defaultMeasurement[0]?.meausermentWeight);
      }
    });

    return { highestValue };
  };

  const orderAdjusterForList = (order) => {
    let tempArray = [...ingredientList];
    let { highestValue } = recipeRankingsHighestValue();

    console.log({ tempArray });
    tempArray?.sort(
      (a, b) =>
        Number(
          a?.portions?.filter((itm) => {
            return itm?.default === true;
          })[0]?.meausermentWeight
        ) -
        Number(
          b?.portions?.filter((itm) => {
            return itm?.default === true;
          })[0]?.meausermentWeight
        )
    );

    if (order === "asc") return tempArray;
    else {
      return tempArray.reverse();
    }

    // tempArray?.map((elem)=>{

    // })

    console.log({ tempArray });
    console.log({ highestValue });
  };

  // useEffect(() => {
  //   if (!ingredientList) return;
  //   orderAdjusterForList();
  // }, [ingredientList]);

  return (
    <div className={styles.left_main_container}>
      <div className={styles.filter}>
        <div className={styles.filter__top} style={{ marginTop: "15px" }}>
          <h3>Ingredients</h3>
          {/* <FilterbottomComponent /> */}
          <div className={styles.filter__bottom}>
            <SwitchTwoComponent
              value={toggle}
              setValue={setToggle}
              titleOne="Pictures"
              titleTwo="Rankings"
            />
            <div className={styles.dropdown}>
              <DropdownTwoComponent
                value={dpd}
                list={categories}
                setValue={setDpd}
              />
            </div>
            {toggle === 1 && (
              <>
                <div className={styles.searchBar}>
                  <input
                    type="text"
                    className={styles.searchBar__input_field}
                    placeholder="Search.."
                    value={input}
                    onChange={(e) => SearchResults(e.target.value)}
                  />
                  <div className={styles.searchBar__input_field__icon}>
                    <div>
                      <Image
                        src={"/icons/search-icon.svg"}
                        alt="Picture will load soon"
                        height={"100%"}
                        width={"100%"}
                        layout="responsive"
                        objectFit="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.pictures}>
                  <div className={styles.filter__menu}>
                    {ingredientList &&
                      ingredientList?.map((item, i) => {
                        return (
                          <div
                            key={item._id + item.ingredientName}
                            className={styles.filter__menu__item}
                            onClick={() => handleIngredientClick(item)}
                          >
                            <div className={styles.filter__menu__item__image}>
                              {item?.featuredImage !== null ? (
                                <img src={item.featuredImage} alt={""} />
                              ) : (
                                <img src="/food/Dandelion.png" alt={""} />
                              )}
                              {checkActive(item?.ingredientName) && (
                                <div className={styles.tick}>
                                  <CheckCircle className={styles.ticked} />
                                </div>
                              )}
                            </div>
                            <p>{item?.ingredientName}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </>
            )}
            {toggle === 2 && (
              <div className={styles.rankings}>
                <CalciumSearchElem
                  ascendingDescending={ascendingDescending}
                  setascendingDescending={setascendingDescending}
                  list={list}
                  setList={setList}
                  dropDownState={rankingDropDownState}
                  setDropDownState={setRankingDropDownState}
                />
                {orderAdjusterForList(ascendingDescending ? "asc" : "")?.map(
                  (elem, index) => {
                    const { highestValue } = recipeRankingsHighestValue();
                    const defaultMeasurement = elem?.portions?.filter((itm) => {
                      return itm.default === true;
                    });

                    return (
                      highestValue && (
                        <Linearcomponent
                          element={elem}
                          name={elem.ingredientName}
                          percent={defaultMeasurement[0]?.meausermentWeight}
                          checkbox
                          checkedState={checkActive(elem?.ingredientName)}
                          key={index}
                          highestValue={Number(highestValue)}
                          units={"%"}
                        />
                      )
                    );
                  }
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left_tray_recipe_edit;
