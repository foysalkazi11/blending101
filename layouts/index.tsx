import React, { useRef } from "react";
import Footer from "./_footer";
import Header from "./_header";
import Sidebar from "./_sidebar";

import NotificationTray from "../components/sidetray/notificationTray";

import styles from "./index.module.scss";

interface ILayout {
  sidebar?: boolean;
  title: string;
  icon: string | React.ReactElement;
}
const Layout: React.FC<ILayout> = (props) => {
  const { title, icon, sidebar, children } = props;

  const mainRef = useRef(null);

  return (
    <div className={styles.body}>
      {sidebar && <Sidebar />}
      <NotificationTray showTagByDefaut={false} showPanle={"right"} />
      <main className={styles.main} ref={mainRef}>
        <Header title={title} icon={icon} mainRef={mainRef} />
        <div className={styles.content}>{children}</div>
        <Footer />
      </main>
    </div>
  );
};

Layout.defaultProps = {
  sidebar: true,
};

export default Layout;
