/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import FilterTrayWrapper from "../filter.wrapper";
import styles from "./filter.module.scss";
import { FaEye } from "react-icons/fa";
import { BsTagsFill } from "react-icons/bs";
import TagSection from "./tag/TagSection";
import VisualSection from "./visaul/VisualSection";

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

export default function Filtertray({ filter }) {
  const [toggle, setToggle] = useState(1);
  const reff = useRef<any>();

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
        <VisualSection categories={categories} />
      ) : (
        <TagSection categories={categories} />
      )}
    </FilterTrayWrapper>
  );
}
