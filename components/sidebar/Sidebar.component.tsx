/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import index from "../../pages/component";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCollectionDetailsId,
  setShowAllRecipes,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import Tooltip from "../../theme/toolTip/CustomToolTip";
import styles from "./sidebar.module.scss";

export default function SidebarComponent(props) {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const pages = [
    { logo: "/icons/home.svg", link: "/", content: "Home" },
    { logo: "/icons/juicer.svg", link: "/", content: "Discover recipe" },
    { logo: "/icons/books.svg", link: "/", content: "Wikipedia" },
    { logo: "/icons/calender__sidebar.svg", link: "/", content: "Planner" },
    { logo: "/icons/book_light.svg", link: "/", content: "Book" },
    { logo: "/icons/whistle.svg", link: "/", content: "Whistle" },
    { logo: "/icons/store.svg", link: "/", content: "Store" },
  ];

  const handleClick = (link: string, i: number) => {
    setActive(i);
    if (i === 1) {
      dispatch(setCollectionDetailsId(""));
      dispatch(setOpenCollectionsTary(false));
      dispatch(setShowAllRecipes(false));
    }
    router?.push(link);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo_small.svg" alt="logo small" />
      </div>
      <ul className={styles.list}>
        {pages &&
          pages.map((page, i) => (
            <Tooltip key={"sidebaritem" + i} content={page?.content}>
              <li
                className={active === i ? styles.active : "null"}
                onClick={() => handleClick(page.link, i)}
              >
                <span>
                  {" "}
                  <img src={page.logo} alt={page.logo} />{" "}
                </span>
              </li>
            </Tooltip>
          ))}
      </ul>
    </div>
  );
}
