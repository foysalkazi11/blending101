import React from "react";
import Image from "next/image";
import styles from "./_footer.module.scss";
import Link from "next/link";

const Footer = () => {
  return (
    <div className={styles.mainDiv__footer}>
      <ul className={styles.mainDiv__footer__ul}>
        <div className={styles.mainDiv__footer__ul__div__left}>
          <li className={styles.mainDiv__footer__ul__li}>About Us</li>
          <div className={styles.greenButton} />
          <li className={styles.mainDiv__footer__ul__li}>Contact Us</li>
          <div className={styles.greenButton} />
          <li className={styles.mainDiv__footer__ul__li}>FAQ</li>
        </div>
        <li className={styles.mainDiv__footer__ul__li}>
          <div className={styles.mainDiv__footer__ul__li__icon}>
            <Image src={"/images/logo.png"} alt="" layout="fill" objectFit="contain" />
          </div>
        </li>
        <div className={styles.mainDiv__footer__ul__div__right}>
          <li className={styles.mainDiv__footer__ul__li}>
            <Link href={"/terms_and_conditions"}>Terms and Conditions</Link>
          </li>
          <div className={styles.greenButton} />
          <li className={styles.mainDiv__footer__ul__li}>
            <Link href={"/privacy_policy"}>Privacy Policy</Link>
          </li>
        </div>
      </ul>
    </div>
  );
};

export default Footer;
