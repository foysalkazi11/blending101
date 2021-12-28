/* eslint-disable @next/next/no-img-element */
import { Cancel } from "@mui/icons-material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setBlendTye, setIngredients } from "../../redux/slices/sideTraySlice";
import styles from "./searchtag.module.scss";
import { handleFilterClick } from "../../services/trayClick.service";

export default function SearchtagsComponent(props) {
  const ingredients = useAppSelector((state) => state.sideTray.ingredients);
  const blends = useAppSelector((state) => state.sideTray.blends);
  const category = useAppSelector((state) => state.sideTray.category);

  const dispatch = useAppDispatch();

  const handleIngredientClick = (item) => {
    const blendz = handleFilterClick(ingredients, item);
    dispatch(setIngredients(blendz));
  };
  const handleBlendClick = (item) => {
    const blendz = handleFilterClick(blends, item);
    dispatch(setBlendTye(blendz));
  };

  if (ingredients?.length < 1 && blends?.length < 1 && category === null)
    return null;

  return (
    <div className={styles.searchtab}>
      <div className={styles.container}>
        {blends &&
          blends.map((blend, i) => (
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
          ))}
        {ingredients &&
          ingredients.map((blend, i) => (
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
          ))}
      </div>
    </div>
  );
}
