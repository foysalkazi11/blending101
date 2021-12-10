import React, { useState } from "react";
import styles from "./Main.module.scss";
import About from "../about/AboutUser";
import Membership from "../membership/Membership";
import Notification from "../notification/Notification";
import Personalization from "../personalization/Personalization";

const tab = ["About", "Membership", "Notification", "Personalization"];

type MainProps = {
  userData: any;
  setUserData: any;
};

const Main = ({ userData, setUserData }: MainProps) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderUI = () => {
    switch (activeTab) {
      case 0:
        return <About userData={userData} setUserData={setUserData} />;
      case 1:
        return <Membership userData={userData} setUserData={setUserData} />;
      case 2:
        return <Notification userData={userData} setUserData={setUserData} />;
      case 3:
        return (
          <Personalization userData={userData} setUserData={setUserData} />
        );

      default:
        return <About userData={userData} setUserData={setUserData} />;
    }
  };

  return (
    <div className={styles.mainContainer}>
      <header className={styles.header}>
        {tab?.map((item, index) => {
          return (
            <p
              key={index}
              onClick={() => setActiveTab(index)}
              className={`${styles.text} ${
                activeTab === index ? styles.active : ""
              }`}
            >
              {item}
            </p>
          );
        })}
      </header>
      {renderUI()}
    </div>
  );
};

export default Main;
