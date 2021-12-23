import React from "react";
import styles from "./ingredientList&Howto.module.scss";
import Image from "next/image";
import AddSharpIcon from "@material-ui/icons/AddSharp";
import RemoveSharpIcon from "@material-ui/icons/RemoveSharp";
import ButtonComponent from "../../../../../theme/button/buttonA/button.component";

const IngredientList = () => {
  return (
    <div className={styles.mainCard}>
      <div className={styles.ingredients__main__card}>
        <div className={styles.headingDiv}>
          <div className={styles.basket__icon}>
            <Image
              src={"/icons/basket.svg"}
              alt="icon"
              width={"17px"}
              height={"15px"}
              className={styles.original_arrow}
            />
          </div>
          <h5>Ingredients</h5>
        </div>

        <div className={styles.blending__ingredients}>
          <div className={styles.servings}>
            <div className={styles.servings__adjuster}>
              <span className={styles.servings__adjuster__name}>
                Servings :
              </span>
              <div className={styles.servings__adjuster__icondiv}>
                <RemoveSharpIcon />
              </div>
              <span className={styles.servings__adjuster__score}>1</span>
              <div className={styles.servings__adjuster__icondiv}>
                <AddSharpIcon />
              </div>
            </div>
            <div className={styles.servings__size}>
              <span className={styles.servings__adjuster__name}>
                Servings Size :
              </span>
              <span className={styles.servings__size__score}>16 oz</span>
            </div>
            <div className={styles.servings__units}>
              <div className={styles.servings__units__active}>
                <span className={styles.servings__units__country}>Us</span>
                <span className={styles.servings__units__scale}>Metric</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.ingredients}>
          <ul>
            <li>
              <div className={styles.ingredients__icons}>
                <Image
                  src={"/images/avocado-png-hd.png"}
                  alt="Picture will load soon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className={styles.ingredients__text}>1 medium Avacado</div>
            </li>
            <li>
              <div className={styles.ingredients__icons}>
                <Image
                  src={"/images/Swiss-Chard-PNG-Photo.png"}
                  alt="Picture will load soon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className={styles.ingredients__text}>1 medium Avacado</div>
            </li>
            <li>
              <div className={styles.ingredients__icons}>
                <Image
                  src={"/images/apple_PNG12405.png"}
                  alt="Picture will load soon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className={styles.ingredients__text}>1 medium Avacado</div>
            </li>
            <li>
              <div className={styles.ingredients__icons}>
                <Image
                  src={"/images/avocado-png-hd.png"}
                  alt="Picture will load soon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className={styles.ingredients__text}>1 medium Avacado</div>
            </li>
            <li>
              <div className={styles.ingredients__icons}>
                <Image
                  src={"/images/avocado-png-hd.png"}
                  alt="Picture will load soon"
                  objectFit="contain"
                  layout="fill"
                />
              </div>
              <div className={styles.ingredients__text}>1 medium Avacado</div>
            </li>
          </ul>
          <div className={styles.ingredients__searchBar}>
            <span>
              <input
                type="text"
                name="recipe elements"
                id=""
                placeholder="Enter a single ingredient or paste several ingredients"
              />
            </span>
          </div>
        </div>
      </div>

      <div className={styles.how__to}>
        <h4 className={styles.how__to__heading}>
          <div className={styles.how__to__icon}>
            <Image
              src={"/icons/chef.svg"}
              alt="Picture will load soon"
              objectFit="contain"
              layout="fill"
            />
          </div>
          <span className={styles.how__to__headingText}>How to</span>
        </h4>
        <div className={styles.how__to__steps}>
          <ol>
            <li>
              Add ingredients to a blender (in the order listed above) and blend
              to combine.
            </li>
            <li>
              Blend for 45 seconds in whole food mode. Add ice and blend for
              another 45 seconds.
            </li>
          </ol>
          <div className={styles.how__to__searchBar}>
            <span>
              <input
                type="text"
                name="recipe elements"
                id=""
                placeholder="Type Your Instructions here..."
              />
            </span>
          </div>
        </div>
      </div>
      <div className={styles.save__Recipe}>
        <div className={styles.save__Recipe__button}>
          <ButtonComponent
            type={"primary"}
            style={{}}
            fullWidth={true}
            value="Save Recipe"
          />
        </div>
      </div>
    </div>
  );
};

export default IngredientList;
