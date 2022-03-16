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
// import { setSelectedIngredientsList } from "../../../../redux/edit_recipe/editRecipeStates";

interface recipeData {
  leftAllIngredientsList?: object[];
  recipeIngredients?: object[];
}
const Left_tray_recipe_edit = ({
  leftAllIngredientsList,
  recipeIngredients,
}: recipeData) => {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const [input, setinput] = useState("");
  const [searchElemList, setSearchElemList] = useState([]);
  const [searchElemListFilter, setSearchElemListFilter] = useState([]);
  const ingredients = filterRankingList;
  const categories = [
    { title: "All", val: "all" },
    { title: "Leafy", val: "leafy" },
    { title: "Fruity", val: "Fruity" },
    { title: "Nutty", val: "nutty" },
    { title: "Frozed", val: "frozed" },
  ];

  const dispatch = useAppDispatch();
  // const selectedIngredientsList = useAppSelector(
  //   (state) => state.editRecipeReducer.selectedIngredientsList
  // );

  // const handleIngredientClick = (ingredient) => {
  //   let blendz = [];
  //   let present = false;
  //   selectedIngredientsList?.forEach((blen) => {
  //     if (blen === ingredient) {
  //       present = true;
  //     }
  //   });
  //   if (!present) {
  //     blendz = [...selectedIngredientsList, ingredient];
  //   } else {
  //     blendz = selectedIngredientsList?.filter((blen) => {
  //       return blen !== ingredient;
  //     });
  //   }

  //   dispatch(setSelectedIngredientsList(blendz));
  // };

  const checkActive = (ingredient: string) => {
    let present = false;
    // selectedIngredientsList?.forEach((blen) => {
    //   //@ts-ignore
    //   if (blen.ingredientName === ingredient) {
    //     present = true;
    //   }
    // });
    return present;
  };

  const SearchResults = (value) => {
    setinput(value);
    const elements = searchElemList?.filter((item) => {
      return item.ingredientName.includes(value);
    });
    setSearchElemListFilter(elements);
  };

  const DropDown = (dpd) => {
    if (dpd.title !== "All") {
      const classElements = searchElemList?.filter((item) => {
        return item.category === dpd.title;
      });
      setSearchElemListFilter(classElements);
    } else {
      setSearchElemListFilter(searchElemList);
    }
  };

  useEffect(() => {
    if (!leftAllIngredientsList) return;
    setSearchElemList(leftAllIngredientsList);
    setSearchElemListFilter(leftAllIngredientsList);
  }, [leftAllIngredientsList]);

  // useEffect(() => {
  //   DropDown(dpd);
  // }, [dpd]);

  // console.log(recipeIngredients);

  // console.log(selectedIngredientsList);

  // useEffect(() => {
  //   if (!recipeData) return;

  //   let mode = "edit";
  //   if (mode === "edit") {
  //     console.log(recipeData);
  //     let modifiedPortions = [];

  //     recipeData.ingredients.map((item) => {
  //       let selectedPortion = item.portions.filter((elem) => elem.default === true);
  //       selectedPortion = selectedPortion[0];
  //       console.log({ selectedPortion });
  //       console.log(item);
  //       modifiedPortions = [
  //         ...modifiedPortions,
  //         {
  //           ...selectedPortion,
  //           measurement: selectedPortion.name,
  //           meausermentWeight: selectedPortion.gram,
  //           default:selectedPortion.defa
  //         },
  //       ];
  //     });

  //     const editingRecipe = {
  //       category: recipeData?.recipeBlendCategory?.name,
  //       description: recipeData?.description,
  //       ingredientName: recipeData?.name,
  //       images: recipeData?.image,
  //       featuredImage: null,
  //     };
  //     console.log(editingRecipe);
  //   }

  //   console.log("object");
  // }, [recipeData]);

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
              <DropdownTwoComponent value={dpd} list={categories} setValue={setDpd} />
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
                    {searchElemListFilter &&
                      searchElemListFilter?.map((item, i) => {
                        return (
                          <div
                            key={item._id + item.ingredientName}
                            className={styles.filter__menu__item}
                            // onClick={() => handleIngredientClick(item)}
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
                <CalciumSearchElem />
                {ingredients?.map(({ name, percent }, index) => {
                  return (
                    <Linearcomponent name={name} percent={percent} checkbox key={index} />
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Left_tray_recipe_edit;
