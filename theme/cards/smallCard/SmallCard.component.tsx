/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./smallcard.module.scss";
import { IoClose } from "react-icons/io5";
import IconWarper from "../../iconWarper/IconWarper";

export default function SmallcardComponent({
  img,
  text,
  fnc,
  recipe,
  findCompareRecipe,
  fucUnCheck,
  compareLength,
  handleRemoveFromCompare = (
    id: string,
    versionId: string,
    e: React.SyntheticEvent,
  ) => {},
}) {
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
            <IconWarper
              defaultBg="primary"
              style={{ width: "20px", height: "20px", marginRight: "10px" }}
            >
              <IoClose fontSize={16} />
            </IconWarper>
            compare
          </button>
        ) : (
          <button
            disabled={compareLength === 8 ? true : false}
            className={`${styles.compar} 
         ${compareLength === 8 ? styles.disable : ""}
         `}
            onClick={handleClick}
          >
            compare
          </button>
        )}

        <div className={styles.tick}>
          <IconWarper
            hover="bgPrimary"
            defaultBg="gray"
            handleClick={(e) =>
              handleRemoveFromCompare(
                recipe?._id,
                recipe?.defaultVersion?._id,
                e,
              )
            }
          >
            <IoClose />
          </IconWarper>
        </div>

        <div className={styles.smallCard__top}>
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
