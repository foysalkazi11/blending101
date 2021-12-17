/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import CalciumSearchElem from "../../../theme/calcium/calcium.component";
import DropdownTwoComponent from "../../../theme/dropDown/dropdownTwo.component";
import Linearcomponent from "../../../theme/linearProgress/LinearProgress.component";
import SwitchTwoComponent from "../../../theme/switch/switchTwo.component";
import styles from "./filter.module.scss";
import { filterRankingList } from "./filterRankingList";

export default function FilterbottomComponent(props) {
  const [toggle, setToggle] = useState(1);
  const [dpd, setDpd] = useState({title: 'All', val: 'all'});
  const ingredients = filterRankingList;

  const categories = [
    {title: 'All', val: 'all'},
    {title: 'Leafy', val: 'leafy'},
    {title: 'Fruity', val: 'Fruity'},
    {title: 'Nutty', val: 'nutty'},
    {title: 'Frozed', val: 'frozed'},
  ]

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
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/chard.png" alt="ingr" />
              </div>
              <p>Wholefood</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/kale.png" alt="ingr" />
              </div>
              <p>Smoothies</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/dandelion.png" alt="ingr" />
              </div>
              <p>Drinks</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/spinach.png" alt="ingr" />
              </div>
              <p>Soup</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/collard_greens.png" alt="ingr" />
              </div>
              <p>Dessert</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/kale.png" alt="ingr" />
              </div>
              <p>Frozen</p>
            </div>
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
