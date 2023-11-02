import { faCircleArrowDown, faPlus, faCircleArrowUp } from "@fortawesome/pro-solid-svg-icons";
import IconButton from "component/atoms/Button/IconButton.component";
import Icon from "component/atoms/Icon/Icon.component";
import React, { Fragment, useState } from "react";

import styles from "./Menu.module.scss";
import { faFolderOpen, faCircleUser, faCameraWeb } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import { useRouter } from "next/router";

type TMenuType = "library" | "settings";
const Menu = () => {
  const router = useRouter();
  console.log(router.query);
  const spaceId = router.query.space;
  const activeMenu = router.asPath?.split(`${spaceId}/`)[1]?.replace("/", "") || "";

  const [open, setOpen] = useState<TMenuType>("library");

  const isLibrary = open === "library";
  const links = isLibrary ? LIBRARY_MENU : SETTINGS_MENU;

  return (
    <div className={styles.menu}>
      <div className={styles.menu__header}>
        <h3>
          <Icon fontName={faCircleArrowDown} size={20} color="#fd5109" /> {isLibrary ? "Library" : "Settings"}
        </h3>
        <IconButton fontName={faPlus} variant="white" size="small" />
      </div>
      <div className={styles.menu__list}>
        {links.map((menu) => (
          <Link
            key={menu.link}
            href={`/spaces/${spaceId}/${menu.link}`}
            className={`${styles.menu__item} ${menu.link === activeMenu ? styles["menu__item--active"] : ""} `}
          >
            <div className={styles.menu__link}>
              <Icon fontName={menu.font} size={20} color="#fd5109" />
              {menu.title}
            </div>
            <span className={styles.menu__notification}>{Math.round(Math.random() * 10)}</span>
          </Link>
        ))}
      </div>
      <div className={styles.menu__footer}>
        <h3 onClick={() => setOpen(isLibrary ? "settings" : "library")}>
          <Icon fontName={faCircleArrowUp} size={20} color="#fd5109" /> {isLibrary ? "Settings" : "Library"}
        </h3>
      </div>
    </div>
  );
};

const LIBRARY_MENU = [
  { link: "course", title: "About Course", font: faFolderOpen },
  { link: "assignments", title: "Assignments", font: faFolderOpen },
  { link: "meetups", title: "Meetups", font: faCameraWeb },
  { link: "participants", title: "Participants", font: faCircleUser },
];
const SETTINGS_MENU = [
  { link: "space", title: "About Space", font: faFolderOpen },
  { link: "streams", title: "Streams", font: faFolderOpen },
  { link: "meetups", title: "Meetups", font: faCameraWeb },
  { link: "rooms", title: "Rooms", font: faCircleUser },
];

export default Menu;
