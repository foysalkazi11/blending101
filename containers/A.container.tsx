import React from "react";
import { useAuth } from "../auth/auth.component";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import SidetrayleftComponent from "../components/sidetray/sidetrayLeft/SidetrayLeft.component";
import SidetrayrightComponent from "../components/sidetray/sidetrayRight/SidetrayRight.component";
import styles from "./container.module.scss";

type AContainerProps = {
  showHeader?: boolean;
  showSidebar?: boolean;
  showLeftTray?: boolean;
  showRighTray?: boolean;
  logo?: boolean;
  headerTitle?: string;
  headerLogo?: string;
  children: React.ReactNode;
};

export default function AContainer(props: AContainerProps) {
  const { user } = useAuth();
  const {
    showHeader = true,
    showSidebar = true,
    showLeftTray = true,
    showRighTray = true,
    logo = true,
    headerTitle = "Home",
  } = props;

  return (
    <div className={styles.containerA}>
      {showSidebar ? (
        <div className={styles.sidebarA}>
          <SidebarComponent />
        </div>
      ) : null}
      <div className={styles.mainA}>
        {showHeader ? (
          <HeaderComponent logo={logo} headerTitle={headerTitle} />
        ) : null}
        {showLeftTray ? (
          <div className={styles.fixed__main__left}>
            <SidetrayleftComponent />
          </div>
        ) : null}
        {showRighTray ? (
          <div className={styles.fixed__main__right}>
            <SidetrayrightComponent />
          </div>
        ) : null}
        {props.children}
      </div>
    </div>
  );
}
