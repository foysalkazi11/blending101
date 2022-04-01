import React from "react";
import styles from './CircularRotatingLoader.module.scss';
import { BiLoaderAlt } from "react-icons/bi";

const CircularRotatingLoader = () => {
  return (
    <div className={styles.mainLoader}>
      <BiLoaderAlt className={styles.mainLoader__loader}/>
    </div>
  );
};

export default CircularRotatingLoader;
