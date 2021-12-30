/* eslint-disable @next/next/no-img-element */
import { CheckBoxRounded, CheckCircle } from "@mui/icons-material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { setBlendTye } from "../../../redux/slices/sideTraySlice";
import FilterTrayWrapper from "../filter.wrapper";
import styles from "./filter.module.scss";
import FilterbottomComponent from "./filterBottom.component";
import { blendTypes } from "./filterRankingList";

export default function Filtertray({ filter }) {
  const dispatch = useAppDispatch();
  const blends = useAppSelector((state) => state.sideTray.blends);

  console.log("blends", blends);

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

<<<<<<< HEAD
	const checkActive = (blend) => {

		let present = false;
		blends.forEach((blen:any) => {
			if (blen.title === blend) {
				present = true;
			}
		});
		return present;
	};
=======
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
>>>>>>> 0f69a489f66a48a53ced8e93b0b60683dfda7077

  return (
    <FilterTrayWrapper filter={filter} id={"filter123"}>
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
    </FilterTrayWrapper>
  );
}
