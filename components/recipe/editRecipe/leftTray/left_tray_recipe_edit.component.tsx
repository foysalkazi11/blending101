import { CheckCircle } from "@mui/icons-material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { setIngredients } from "../../../../redux/slices/sideTraySlice";
import {
  setServings,
  setIngredientsToList,
  setHowToSteps,
} from "../../../../redux/edit_recipe/quantity";
import CalciumSearchElem from "../../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../../theme/switch/switchTwo.component";
import FilterbottomComponent from "../../../sidetray/filter/filterBottom.component";
import { blendTypes } from "../../../sidetray/filter/filterRankingList";
import styles from "./left_tray_recipe_edit.module.scss";
import {
  filterRankingList,
  ingredientLeafy,
} from "./left_tray_recipe_edit_list";
import SearchIcon from "@mui/icons-material/Search";
import Image from "next/image";

const Left_tray_recipe_edit = () => {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const ingredients = filterRankingList;

  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector((state) => state.sideTray.ingredients);


  const ingredients_list = useAppSelector(
    (state) => state.quantityAdjuster.ingredientsList
  );
  console.log("Ingredients", ingredients_list);

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    ingredients_list.forEach((blen) => {
      if (blen === ingredient) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...ingredients_list, ingredient];
    } else {
      blendz = ingredients_list.filter((blen) => {
        return blen !== ingredient;
      });
    }
    dispatch(setIngredientsToList(blendz));
  };

  const categories = [
    { title: "All", val: "all" },
    { title: "Leafy", val: "leafy" },
    { title: "Fruity", val: "Fruity" },
    { title: "Nutty", val: "nutty" },
    { title: "Frozed", val: "frozed" },
  ];

  const checkActive = (ingredient: string) => {
    let present = false;
    ingredients_list.forEach((blen) => {
      //@ts-ignore
      if (blen.title === ingredient) {
        present = true;
      }
    });
    return present;
  };
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
                  />
                  <div className={styles.searchBar__input_field__icon}>
                    <div>
                      <Image
                        src={"/icons/search-icon.svg"}
                        alt="Picture will load soon"
                        height={"100%"}
                        width={"100%"}
                        // sizes={width !== undefined ? `${Math.round(width)}px` : "100vw"}
                        layout="responsive"
                        objectFit="fill"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.pictures}>
                  <div className={styles.filter__menu}>
                    {ingredientLeafy &&
                      ingredientLeafy.map((item, i) => (
                        <div
                          key={item.title + i}
                          className={styles.filter__menu__item}
                          onClick={() => handleIngredientClick(item)}
                        >
                          <div className={styles.filter__menu__item__image}>
                            <img src={item.img} alt={item.title} />
                            {checkActive(item.title) && (
                              <div className={styles.tick}>
                                <CheckCircle className={styles.ticked} />
                              </div>
                            )}
                          </div>
                          <p>{item.title}</p>
                        </div>
                      ))}
                  </div>
                </div>
              </>
            )}
            {toggle === 2 && (
              <div className={styles.rankings}>
                <CalciumSearchElem />
                {ingredients.map(({ name, percent }, index) => {
                  return (
                    <Linearcomponent
                      name={name}
                      percent={percent}
                      checkbox
                      key={index}
                    />
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
