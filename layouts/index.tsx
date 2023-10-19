import React, { Fragment, useRef } from "react";
import Footer from "./_footer";
import Header from "./_header";
import Sidebar from "./_sidebar";
import NotificationTray from "../components/sidetray/notificationTray";
import styles from "./index.module.scss";
import Meta from "theme/meta";

interface LayoutProps {
  sidebar?: boolean;
  title?: string;
  icon?: string | React.ReactElement;
  header?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { title, icon, sidebar, header, children } = props;
  const mainRef = useRef(null);
  if (!title) return <Fragment>{children}</Fragment>;
  return (
    <div className={styles.body}>
      <Meta />
      {sidebar && <Sidebar />}
      <NotificationTray showTagByDefaut={false} showPanle={"right"} />
      <main className={styles.main} ref={mainRef}>
        <Header title={title} icon={icon} mainRef={mainRef} />
        <div className={styles.content}>{children}</div>
        <Footer />
      </main>
      {/* <Navbar /> */}
    </div>
  );
};

Layout.defaultProps = {
  sidebar: true,
};

export default Layout;
