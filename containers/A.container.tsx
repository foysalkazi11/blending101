import React from "react";
import { useAuth } from "../auth/auth.component";
import HeaderComponent from "../components/header/Header.component";
import SidebarComponent from "../components/sidebar/Sidebar.component";
import SidetrayrightComponent from "../components/sidetray/sidetrayRight/SidetrayRight.component";
import styles from "./container.module.scss";
import WikiTray from "../components/sidetray/wiki/wikiTray.component";
import CollectionTray from "../components/sidetray/collection/collectionTray.component";

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
    headerTitle = "",
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
            <CollectionTray />
          </div>
        ) : null}
        {showRighTray ? (
          <div className={styles.fixed__main__right}>
            <SidetrayrightComponent />
          </div>
        ) : null}
        <div className={styles.fixed__main__left}>
          <WikiTray />
        </div>
        {props.children}
      </div>
    </div>
  );
}
