import React from "react";
import FrontPageHeader from "../components/header/front_page/FrontPageHeader.component";
// import FrontPageHeader from "../components/header/front-page/FrontPageHeader.component";
import Frontbanner from "../theme/banners/frontbanner/frontbanner.component";
import styles from "./Front.module.scss";

type ScreenElem = {
  children?: React.ReactNode;
};
const Front = ({ children }: ScreenElem) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <FrontPageHeader />
        <Frontbanner />
      </div>
      <div className={styles.contentDiv}>{children}</div>
    </>
  );
};

export default Front;
