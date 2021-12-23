import React from "react";
import styles from "./centerElements.module.scss";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AddRecipeCard from "./addFiles/addRecipeCards.component";
import ScoreTray from "./scoreTray/scoreTray.component";
import Image from "next/image";

const Center_Elements = () => {
  return (
    <div className={styles.main}>
      <div className={styles.topSection}>
        <h3 className={styles.topSection__heading}>Red Hots Smoothie</h3>
        <div className={styles.topSection__RightIcon}>
          <MoreVertIcon />
        </div>
      </div>
      <div className={styles.addImagediv}>
        <AddRecipeCard />
      </div>
      <div className={styles.scoreTraydiv}>
        <ScoreTray />
        <p>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </p>
        <div className={styles.blendingOptions}>
          <div className={styles.blendingOptions__left}>
            <ul>
              <li>
                <div className={styles.left__options}>
                  <span className={styles.text}>Wholefood</span>
                  <div className={styles.arrow}>
                    <Image
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={"17px"}
                      height={"15px"}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.left__options}>
                  <span className={styles.text}>Blendtec</span>
                  <div className={styles.arrow}>
                    <Image
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={"17px"}
                      height={"15px"}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div className={styles.left__options}>
                  <span className={styles.text}>64 oz</span>
                  <div className={styles.arrow}>
                    <Image
                      src={"/icons/dropdown.svg"}
                      alt="icon"
                      width={"17px"}
                      height={"15px"}
                    />
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className={styles.blendingOptions__right}>
            <div className={styles.blendingOptions__right__options}>
              <span className={styles.text}>4</span>
              <div className={styles.arrow}>
                <div className={styles.arrow_div}>
                  <Image
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.reverse_arrow}
                  />
                  <Image
                    src={"/icons/dropdown.svg"}
                    alt="icon"
                    width={"17px"}
                    height={"15px"}
                    className={styles.original_arrow}
                  />
                </div>
              </div>
            </div>
            <span className={styles.timer_icon}>
              <Image
                src={"/icons/time-icon.svg"}
                alt="Picture will load soon"
                height={"20px"}
                width={"20px"}
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center_Elements;
