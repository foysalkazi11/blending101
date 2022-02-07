/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBlendTye } from "../../../redux/slices/sideTraySlice";
import CheckCircle from "../../../public/icons/check_circle_black_24dp.svg";
import FilterTrayWrapper from "../filter.wrapper";
import styles from "./filter.module.scss";
import FilterbottomComponent from "./filterBottom.component";
import { blendTypes } from "./filterRankingList";
import { FaEye } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";

export default function Filtertray({ filter }) {
  const dispatch = useAppDispatch();
  const blends = useAppSelector((state) => state.sideTray.blends);
  const [toggle, setToggle] = useState(1);
  const reff = useRef<any>();

  const handleBlendClick = (blend) => {
    let blendz = [];
    let present = false;
    blends.forEach((blen) => {
      if (blen === blend) {
        present = true;
      }
    });
    if (!present) {
      blendz = [...blends, blend];
    } else {
      blendz = blends.filter((blen) => {
        return blen !== blend;
      });
    }
    dispatch(setBlendTye(blendz));
  };

  const checkActive = (blend) => {
    let present = false;
    blends.forEach((blen) => {
      //@ts-ignore
      if (blen.title === blend) {
        present = true;
      }
    });
    return present;
  };

  const handleToggle = (no: number) => {
    if (no === 1) {
      reff.current.style.left = "0";
    } else {
      reff.current.style.left = "50%";
    }
    setToggle(no);
  };

  return (
    <FilterTrayWrapper filter={filter} id={"filter123"}>
      <div className={styles.main}>
        <div className={styles.main__top}>
          <div className={styles.main__top__menu}>
            <div className={styles.active} ref={reff}></div>
            <div
              className={
                toggle === 2
                  ? styles.main__top__menu__child
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(1)}
            >
              <FaEye className={styles.tag} /> Visual
            </div>
            <div
              className={
                toggle === 1
                  ? styles.main__top__menu__child
                  : styles.main__top__menu__child + " " + styles.active__menu
              }
              onClick={() => handleToggle(2)}
            >
              <BsTagsFill className={styles.tag} /> Tags
            </div>
          </div>
        </div>
      </div>

      {toggle === 1 ? (
        <div className={styles.filter}>
          <div className={styles.filter__top}>
            <h3>Blend Type</h3>
            <div className={styles.filter__menu}>
              {blendTypes &&
                blendTypes.map((blend, i) => (
                  <div
                    key={blend.title + i}
                    className={styles.filter__menu__item}
                    onClick={() => handleBlendClick(blend)}
                  >
                    <div className={styles.filter__menu__item__image}>
                      <img src={blend.img} alt={blend.title} />
                      {checkActive(blend.title) && (
                        <div className={styles.tick}>
                          <CheckCircle className={styles.ticked} />
                        </div>
                      )}
                    </div>
                    <p>{blend.title}</p>
                  </div>
                ))}
            </div>
          </div>
          <div className={styles.filter__top} style={{ marginTop: "15px" }}>
            <h3>Ingredients</h3>
            <FilterbottomComponent />
          </div>
        </div>
      ) : null}
    </FilterTrayWrapper>
  );
}
