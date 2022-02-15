/* eslint-disable @next/next/no-img-element */
import React from "react";
import Cancel from "../../public/icons/cancel_black_24dp.svg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBlendTye, setIngredients } from "../../redux/slices/sideTraySlice";
import styles from "./searchtag.module.scss";
import { handleFilterClick } from "../../services/trayClick.service";
import { deleteFilterValue } from "../../redux/slices/filterRecipeSlice";

export default function SearchtagsComponent(props) {
  const ingredients = useAppSelector((state) => state.sideTray.ingredients);
  const blends = useAppSelector((state) => state.sideTray.blends);
  const category = useAppSelector((state) => state.sideTray.category);
  const filters = useAppSelector((state) => state.filterRecipe.filters);
  const dispatch = useAppDispatch();

  const handleIngredientClick = (item) => {
    const blendz = handleFilterClick(ingredients, item);
    dispatch(setIngredients(blendz));
  };
  const handleBlendClick = (item) => {
    const blendz = handleFilterClick(blends, item);
    dispatch(setBlendTye(blendz));
  };

  const removeHandler = (pageTitle: string, value: string) => {
    dispatch(deleteFilterValue({ pageTitle, value }));
  };

  return (
    <div className={styles.searchtab}>
      {blends?.length
        ? blends.map((blend, i) => (
            <div key={"searchtags" + i} className={styles.item}>
              <div
                className={styles.cross}
                onClick={() => handleBlendClick(blend)}
              >
                <Cancel className={styles.cancel} />
              </div>
              <div className={styles.image}>
                {/* @ts-ignore */}
                <img src={blend?.img} alt="img" />
              </div>
              {/* @ts-ignore */}
              <p>{blend?.title}</p>
            </div>
          ))
        : null}
      {ingredients?.length
        ? ingredients?.map((blend, i) => (
            <div key={"searchtags" + i} className={styles.item}>
              <div
                className={styles.cross}
                onClick={() => handleIngredientClick(blend)}
              >
                <Cancel className={styles.cancel} />
              </div>
              <div className={styles.image}>
                {/* @ts-ignore */}
                <img src={blend?.img} alt="img" />
              </div>
              {/* @ts-ignore */}
              <p>{blend?.title}</p>
            </div>
          ))
        : null}
      {filters?.length
        ? filters?.map((filter, i) => {
            return filter.values.map((value) => {
              return (
                <div
                  key={value + i}
                  className={styles.item}
                  style={{ minHeight: "35px" }}
                >
                  <div
                    className={styles.cross}
                    onClick={() => removeHandler(filter.pageTitle, value)}
                  >
                    <Cancel className={styles.cancel} />
                  </div>
                  {/* <div className={styles.image}>
                <img src={blend?.img} alt="img" />
              </div> */}

                  <p>
                    {filter.prefix} | {value}
                  </p>
                </div>
              );
            });
          })
        : null}
    </div>
  );
}
