import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import styles from "./_sidebar.module.scss";
import Tooltip from "../theme/toolTip/CustomToolTip";

function Sidebar(props) {
  const router = useRouter();

  const [activeMenu, setActiveMenu] = useState<PageName>("Home");

  useEffect(() => {
    const url = router.asPath;
    if (url === "/") {
      return setActiveMenu("Home");
    } else {
      const page = PAGES.find((page, idx) => {
        // SKIPPING HOME PAGE CHECK
        if (idx === 0) return false;
        // IF THE URL CONTAINS CORE PART OF THE MODULE
        return url.startsWith(page.link);
      });
      if (page) setActiveMenu(page.content);
    }
  }, [router.asPath]);

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <Image src="/logo_small.svg" width={40} height={40} alt="logo" />
      </div>
      <ul className={styles.list}>
        {PAGES &&
          PAGES.map((page, i) => (
            <Tooltip key={"sidebaritem" + i} content={page?.content}>
              <li className={activeMenu === page.content ? styles.active : ""}>
                <Link href={page?.link}>
                  <img src={page.logo} alt={page.logo} />{" "}
                </Link>
              </li>
            </Tooltip>
          ))}
      </ul>
    </aside>
  );
}

export default Sidebar;

export type PageName =
  | "Home"
  | "Blends"
  | "Plans"
  | "Challenges"
  | "Wiki"
  | "Blogs"
  | "Shop";

export const PAGES: {
  logo: string;
  link: string;
  content: PageName;
}[] = [
  { logo: "/icons/home.svg", link: "/", content: "Home" },
  {
    logo: "/icons/juicer.svg",
    link: "/recipe/recipe_discovery",
    content: "Blends",
  },
  {
    logo: "/icons/calender__sidebar.svg",
    link: "/planner",
    content: "Plans",
  },
  {
    logo: "/icons/whistle.svg",
    link: "/challenge",
    content: "Challenges",
  },
  { logo: "/icons/books.svg", link: "/wiki", content: "Wiki" },
  { logo: "/icons/book_light.svg", link: "/blog", content: "Blogs" },
  { logo: "/icons/store.svg", link: "/shop", content: "Shop" },
];
