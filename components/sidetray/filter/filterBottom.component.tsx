/* eslint-disable @next/next/no-img-element */
import CheckCircle from "../../../public/icons/check_circle_black_24dp.svg";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setIngredients } from "../../../redux/slices/sideTraySlice";
import CalciumSearchElem from "../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../theme/switch/switchTwo.component";
import styles from "./filter.module.scss";
import { filterRankingList, ingredientLeafy } from "./filterRankingList";

export default function FilterbottomComponent(props) {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({ title: "All", val: "all" });
  const ingredients = filterRankingList;
  const dispatch = useAppDispatch();
  const ingredientsList = useAppSelector((state) => state.sideTray.ingredients);

  const handleIngredientClick = (ingredient) => {
    let blendz = [];
    let present = false;
    ingredientsList.forEach((blen) => {
      if (blen === ingredient) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...ingredientsList, ingredient];
    } else {
      blendz = ingredientsList.filter((blen) => {
        return blen !== ingredient;
      });
    }
    dispatch(setIngredients(blendz));
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
    ingredientsList.forEach((blen) => {
      //@ts-ignore
      if (blen.title === ingredient) {
        present = true;
      }
    });
    return present;
  };

  return (
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
  );
}
