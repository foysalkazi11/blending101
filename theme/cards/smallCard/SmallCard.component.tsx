/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import styles from "./smallcard.module.scss";
import { BsCheck } from "react-icons/bs";
import { RiCloseCircleFill } from "react-icons/ri";
import { MdOutlineClose } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import useChangeCompare from "../../../customHooks/useChangeComaper";
import useLocalStorage from "../../../customHooks/useLocalStorage";

export default function SmallcardComponent({
  img,
  imgHeight,
  text,
  fnc,
  recipe,
  findCompareRecipe,
  fucUnCheck,
  conpareLength,
  compareRecipeList = [],
  setcompareRecipeList = (state: any) => {},
}) {
  const changeCompare = useChangeCompare();

  const style = {};
  //@ts-ignore
  if (imgHeight) style.height = imgHeight;

  text = text || "Chocolate Avocado Smoothie";
  img = img || "/cards/coriander.png";

  const findRecipe = findCompareRecipe && findCompareRecipe(recipe?._id);

  const handleClick = () => {
    fnc && fnc(recipe);
  };

  const handleUnCheck = (e: React.SyntheticEvent) => {
    fucUnCheck && fucUnCheck(recipe?._id, e);
  };

  return (
    <div className={styles.smallCard}>
      <div className={styles.smallCard__innerContainer}>
        {findRecipe ? (
          <button
            className={`${styles.compar}`}
            onClick={(e) => handleUnCheck(e)}
          >
            <div className={`${styles.closeIconWraper}`}>
              <IoClose className={styles.icon} />
            </div>
            compare
          </button>
        ) : (
          <button
            disabled={conpareLength === 8 ? true : false}
            className={`${styles.compar} 
         ${conpareLength === 8 ? styles.disable : ""}
         `}
            onClick={handleClick}
          >
            compare
          </button>
        )}

        <div
          className={`${styles.tick}`}
          onClick={(e) =>
            changeCompare(
              e,
              recipe?._id,
              false,
              compareRecipeList,
              setcompareRecipeList
            )
          }
        >
          <IoClose className={styles.icon} />
        </div>

        <div className={styles.smallCard__top} style={style}>
          <img src={img} alt="coriander" />
        </div>
        <div
          className={styles.smallCard__bottom}
          style={{
            backgroundColor: findRecipe ? "#FBEBE3" : "inherit",
          }}
        >
          <p
            style={{
              fontWeight: findRecipe ? "bold" : "500",
            }}
          >
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
