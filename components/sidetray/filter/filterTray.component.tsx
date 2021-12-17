import React from "react";
import FilterTrayWrapper from "../filter.wrapper";
import LeftTrayWrapper from "../leftTray.wrapper";
import styles from "./filter.module.scss";
import FilterbottomComponent from "./filterBottom.component";

export default function Filtertray({filter}) {
  return (
    <FilterTrayWrapper filter={filter} id={'filter123'}>
      <div className={styles.filter}>
        <div className={styles.filter__top}>
          <h3>Blend Type</h3>
          <div className={styles.filter__menu}>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/wholefood.png" alt="ingr" />
              </div>
              <p>Smoothies</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/soup.svg" alt="ingr" />
              </div>
              <p>Wholefood</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/frozen.png" alt="ingr" />
              </div>
              <p>Frozen</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/food/fresh.png" alt="ingr" />
              </div>
              <p>Drinks</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/other/nutritio.svg" alt="ingr" />
              </div>
              <p>Dessert</p>
            </div>
            <div className={styles.filter__menu__item}>
              <div className={styles.filter__menu__item__image}>
                <img src="/other/heart.svg" alt="ingr" />
              </div>
              <p>Frozen</p>
            </div>
          </div>
        </div>
        <div className={styles.filter__top} style={{ marginTop: "15px" }}>
          <h3>Ingredients</h3>
          <FilterbottomComponent />
        </div>
      </div>
    </FilterTrayWrapper>
  );
}
