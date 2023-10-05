import React from "react";
import styles from "./AppdownLoad.module.scss";
import Image from "next/image";
import Link from "next/link";

interface Props {
  title?: string;
  subTitle?: string;
}

const AppdownLoadCard = ({
  title = "DOWNLOAD THE APP NOW!",
  subTitle = "EXPLORE INGREDIENTS, NUTRITION AND HEALTH CATEGORIES WITH THE ALL-NEW BLENDING APP.",
}: Props) => {
  return (
    <div className={styles.orange__card}>
      <div className={styles.orange__card__left}>
        <h2>{title}</h2>
        <p>{subTitle}</p>
        <div className={styles.orange__card__left__Buttons}>
          <div className={styles.btn}>
            <Link href={"#"}>
              <Image
                src={"/images/app-store@2x.png"}
                alt="banner Icon"
                layout={"fill"}
                objectFit={"contain"}
              />
            </Link>
          </div>
          <div className={styles.btn}>
            <Link href={"#"}>
              <Image
                src={"/images/google-play@2x.png"}
                alt="banner Icon"
                layout={"fill"}
                objectFit={"contain"}
              />
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
  );
};

export default AppdownLoadCard;
