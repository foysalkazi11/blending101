import React, { Fragment, useRef } from "react";
import Footer from "./_footer";
import Header from "./_header";
import Sidebar from "./_sidebar";

import NotificationTray from "../components/sidetray/notificationTray";

import styles from "./index.module.scss";
import Navbar from "./_navbar";
import MHeader from "./_mheader";

interface LayoutProps {
  sidebar?: boolean;
  title?: string;
  icon?: string | React.ReactElement;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { title, icon, sidebar, children } = props;
  const mainRef = useRef(null);

  // const { title, icon, sidebar } = layout;
  if (!title) return <Fragment>{children}</Fragment>;
  return (
    <div className={styles.body}>
      {sidebar && <Sidebar />}
      <NotificationTray showTagByDefaut={false} showPanle={"right"} />
      <main className={styles.main} ref={mainRef}>
        <MHeader />
        <Header title={title} icon={icon} mainRef={mainRef} />
        <div className={styles.content}>{children}</div>
        <Footer />
      </main>
      <Navbar />
    </div>
  );
};

Layout.defaultProps = {
  sidebar: true,
};

export default Layout;
