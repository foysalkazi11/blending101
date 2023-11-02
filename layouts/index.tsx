import React, { Fragment, useRef } from "react";
import Footer from "./_footer";
import Header from "./_header";
import Sidebar from "./_sidebar";
import NotificationTray from "../components/sidetray/notificationTray";
import styles from "./index.module.scss";
import { DefaultSeo } from "next-seo";

interface LayoutProps {
  sidebar?: boolean;
  title?: string;
  icon?: string | React.ReactElement;
  header?: boolean;
  footer?: boolean;
}

const Layout: React.FC<LayoutProps> = (props) => {
  const { title, icon, sidebar, header, footer, children } = props;
  const mainRef = useRef(null);
  if (!title) return <Fragment>{children}</Fragment>;
  return (
    <>
      <DefaultSeo
        // additionalLinkTags={[
        //   { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/favicons/apple-touch-icon.png" },
        //   { rel: "apple-touch-icon", sizes: "32x32", href: "/icons/favicons/favicon-32x32.png" },
        //   { rel: "apple-touch-icon", sizes: "16x16", href: "/icons/favicons/favicon-16x16.png" },
        //   { rel: "manifest", href: "/icons/favicons/site.webmanifest" },
        //   { rel: "mask-icon", href: "/icons/favicons/safari-pinned-tab.svg", color: "#5bbad5" },
        //   { rel: "shortcut icon", href: "/icons/favicons/favicon.ico" },
        // ]}
        // additionalMetaTags={[
        //   { name: "msapplication-TileColor", content: "#da532c" },
        //   { name: "msapplication-config", content: "/icons/favicons/browserconfig.xml" },
        //   { name: "theme-color", content: "#ffffff" },
        // ]}
        title="Blending101 app"
        description="Blending101 app description"
        canonical="https://app.blending101.com/"
        openGraph={{
          url: "https://app.blending101.com/",
          title: "Blending101 app",
          description: "Blending101 app description",
          images: [
            {
              url: "/logo.png",
              width: 800,
              height: 600,
              alt: "Og Image Alt",
              type: "image/jpeg",
            },
            {
              url: "/logo.png",
              width: 900,
              height: 800,
              alt: "Og Image Alt Second",
              type: "image/jpeg",
            },
            { url: "/logo.png" },
            { url: "/logo.png" },
          ],
          siteName: "Blending101",
        }}
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <div className={styles.body}>
        {sidebar && <Sidebar />}
        <NotificationTray showTagByDefaut={false} showPanle={"right"} />
        <main className={styles.main} ref={mainRef}>
          {header && <Header title={title} icon={icon} mainRef={mainRef} />}

          <div className={styles.content}>{children}</div>
          {footer && <Footer />}
        </main>
        {/* <Navbar /> */}
      </div>
    </>
  );
};

Layout.defaultProps = {
  sidebar: true,
  header: true,
  footer: true,
};

export default Layout;
