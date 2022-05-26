/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import CheckCircle from "../../../../public/icons/check_circle_black_36dp.svg";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../../theme/switch/switchTwo.component";
import styles from "./left_tray_recipe_edit.module.scss";
import Image from "next/image";
import { setSelectedIngredientsList } from "../../../../redux/edit_recipe/editRecipeStates";
import CircularRotatingLoader from "../../../../theme/loader/circularRotatingLoader.component";
import useGetAllIngredientsDataBasedOnNutrition from "../../../../customHooks/useGetAllIngredientsDataBasedOnNutrition";
import SkeletonIngredients from "../../../../theme/skeletons/skeletonIngredients/SkeletonIngredients";
import IngredientPanelSkeleton from "../../../../theme/skeletons/ingredientPanelSleketon/IngredientPanelSkeleton";

const categories = [
  { title: "All", val: "All" },
  { title: "Leafy", val: "Leafy" },
  { title: "Berry", val: "Berry" },
  { title: "Herbal", val: "Herbal" },
  { title: "Fruity", val: "Fruity" },
  { title: "Balancer", val: "Balancer" },
  { title: "Fatty", val: "Fatty" },
  { title: "Seasoning", val: "Seasoning" },
  { title: "Flavor", val: "Flavor" },
  { title: "Rooty", val: "Rooty" },
  { title: "Flowering", val: "Flowering" },
  { title: "Liquid", val: "Liquid" },
  { title: "Tube-Squash", val: "Tube-Squash" },
];

interface ingredientState {
  name: string;
  value: number;
  units: string;
  ingredientId: string;
}

interface recipeData {
  allIngredients?: any;
  recipeIngredients?: object[];
}
const Left_tray_recipe_edit = ({
  allIngredients,
  recipeIngredients,
}: recipeData) => {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const [input, setinput] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [ascendingDescending, setascendingDescending] = useState(false);
  const [list, setList] = useState([]);
  const [rankingDropDownState, setRankingDropDownState] = useState(null);
  const [arrayOrderState, setArrayOrderState] = useState([]);
  const dispatch = useAppDispatch();
  const selectedIngredientsList = useAppSelector(
    (state) => state.editRecipeReducer.selectedIngredientsList
  );
  const { data: IngredientData, loading: nutritionLoading } =
    useGetAllIngredientsDataBasedOnNutrition(
      rankingDropDownState?.id,
      dpd?.val,
      toggle === 2 ? true : false
    );

  useEffect(() => {
    setIngredientList(allIngredients);
  }, [allIngredients]);

  useEffect(() => {
    DropDown(dpd);
  }, [dpd]);

  const handleAddIngredient = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const checked = e?.target?.checked;
    if (checked) {
      const findIngredient = ingredientList?.find((item) => item?._id === id);
      if (findIngredient) {
        dispatch(
          setSelectedIngredientsList([
            ...selectedIngredientsList,
            findIngredient,
          ])
        );
      }
    } else {
      dispatch(
        setSelectedIngredientsList([
          ...selectedIngredientsList?.filter((ing) => ing?._id !== id),
        ])
      );
    }
  };

  const handleIngredientClick = (ingredient) => {
    console.log(ingredient);

    let blendz = [];
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen?._id === ingredient?._id) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...selectedIngredientsList, ingredient];
    } else {
      blendz = selectedIngredientsList?.filter((blen) => {
        return blen?._id !== ingredient?._id;
      });
    }

    dispatch(setSelectedIngredientsList(blendz));
  };

  const checkActive = (id: string) => {
    let present = false;
    selectedIngredientsList?.forEach((blen) => {
      if (blen?._id === id) {
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

  const recipeRankingsHighestValue = () => {
    let highestValue = 1;
    ingredientList?.forEach((elem) => {
      let defaultMeasurement = elem?.portions?.filter((itm) => {
        return itm?.default === true;
      });
      if (
        Number(highestValue) < Number(defaultMeasurement[0]?.meausermentWeight)
      ) {
        highestValue = Number(defaultMeasurement[0]?.meausermentWeight);
      }
    });

    return { highestValue };
  };

  const orderAdjusterForList = (order) => {
    let tempArray = [...ingredientList];
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
  };
  useEffect(() => {
    if (!IngredientData?.getAllIngredientsDataBasedOnNutrition) return;
    let tempArray = ascendingDescending
      ? [...IngredientData?.getAllIngredientsDataBasedOnNutrition]
      : [...IngredientData?.getAllIngredientsDataBasedOnNutrition]?.reverse();
    setArrayOrderState(tempArray);
  }, [ascendingDescending, IngredientData]);

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
                              <img
                                src={
                                  item.featuredImage || "/food/Dandelion.png"
                                }
                                alt={""}
                              />

                              {checkActive(item?._id) && (
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
                {nutritionLoading ? (
                  <IngredientPanelSkeleton />
                ) : arrayOrderState?.length ? (
                  arrayOrderState?.map(
                    (
                      { name, value, units, ingredientId }: ingredientState,
                      index
                    ) => {
                      return (
                        <Linearcomponent
                          name={name}
                          percent={Number(value?.toFixed(2))}
                          key={index}
                          units={units}
                          //@ts-ignore
                          highestValue={
                            ascendingDescending
                              ? arrayOrderState[0]?.value
                              : arrayOrderState[arrayOrderState?.length - 1]
                                  ?.value
                          }
                          checkbox={true}
                          checkedState={checkActive(ingredientId)}
                          handleOnChange={(e) =>
                            handleAddIngredient(e, ingredientId)
                          }
                        />
                      );
                    }
                  )
                ) : (
                  <div className={styles.noResult}>
                    <p>No Ingredients</p>
                  </div>
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
