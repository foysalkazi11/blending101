import React from "react";
import styles from "./Center_header.module.scss";
import Image from "next/image";
import ClearIcon from "../../../../../public/icons/clear_black_36dp.svg";
import { useRouter } from "next/router";
import { IoIosSave } from "react-icons/io";
const Center_header = ({ editARecipeFunction, isFetching }) => {
  const router = useRouter();
  const { recipeId } = router.query;
  return (
    <div className={styles.center__title}>
      <div className={styles.center__title__left}>
        <span>
          <Image src={"/icons/recipe-icon.svg"} alt={"icon"} width={24} height={24} />
        </span>
        <h3>Recipe</h3>
      </div>
      <div className={styles.center__title__right}>
        <div className={styles.save__Recipe__button} onClick={editARecipeFunction}>
          <IoIosSave className={styles.save__Recipe__button__icon}/>
        </div>
        <div
          className={styles.center__title__right__cross}
          onClick={() => {
            router.push(`/recipe_details/${recipeId}`);
          }}
        >
          <ClearIcon />
        </div>
      </div>
    </div>
  );
};

export default Center_header;
