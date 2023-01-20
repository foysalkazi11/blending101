/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCollectionDetailsId,
  setShowAllRecipes,
} from "../../redux/slices/collectionSlice";
import { setOpenCollectionsTary } from "../../redux/slices/sideTraySlice";
import { updateSidebarActiveMenuNo } from "../../redux/slices/utilitySlice";
import Tooltip from "../../theme/toolTip/CustomToolTip";
import styles from "./sidebar.module.scss";

export const PAGES = [
  { logo: "/icons/home.svg", link: "/", content: "Home" },
  { logo: "/icons/juicer.svg", link: "/discovery", content: "Blends" },

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
  { logo: "/icons/store.svg", link: "/", content: "Shop" },
];

export default function SidebarComponent(props) {
  const { sidebarActiveMenuNo } = useAppSelector((state) => state.utility);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClick = (link: string, i: number) => {
    if (i === 1) {
      dispatch(setCollectionDetailsId(""));
      dispatch(setOpenCollectionsTary(false));
      dispatch(setShowAllRecipes(false));
    }
    dispatch(updateSidebarActiveMenuNo(i));
    router?.push(link);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo_small.svg" alt="logo" />
      </div>
      <ul className={styles.list}>
        {PAGES &&
          PAGES.map((page, i) => (
            <Tooltip key={"sidebaritem" + i} content={page?.content}>
              <li
                className={sidebarActiveMenuNo === i ? styles.active : ""}
                onClick={() => handleClick(page?.link, i)}
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
