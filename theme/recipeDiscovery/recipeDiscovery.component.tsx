import React from "react";
import AContainer from "../../containers/A.container";
import styles from "./recipeDiscovery.module.scss";
import Image from "next/image";
import Link from "next/link";

const RecipeDetails = () => {
  return (
    <AContainer>
      <div className={styles.main__div}>
        <div className={styles.orange__card}>
          <div className={styles.orange__card__left}>
            <h2>DOWNLOAD THE APP NOW !</h2>
            <p>
              EXPLORE INGREDIENTS, NUTRITION AND HEALTH CATEGORIES WITH THE
              ALL-NEW BLENDING APP.
            </p>
            <div className={styles.orange__card__left__Buttons}>
              <div className={styles.btn}>
                <Link href={"#"}>
                  <a>
                    <Image
                      src={"/images/app-store@2x.png"}
                      alt="banner Icon"
                      layout={"fill"}
                      objectFit={"contain"}
                    ></Image>
                  </a>
                </Link>
              </div>
              <div className={styles.btn}>
                <Link href={"#"}>
                  <a>
                    <Image
                      src={"/images/google-play@2x.png"}
                      alt="banner Icon"
                      layout={"fill"}
                      objectFit={"contain"}
                    ></Image>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.orange__card__right}>
            <div className={styles.orange__card__right__icon}>
              <Image
                src={"/images/banner-right-item.png"}
                alt="banner Icon"
                layout={"fill"}
                objectFit={"contain"}
              />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default RecipeDetails;
