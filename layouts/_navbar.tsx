"use client";
import React, { Fragment, useState } from "react";
import Icon from "../component/atoms/Icon/Icon.component";
import {
  faBlender,
  faCalendarDays,
  faHome,
  faHouseBlank,
  faWhistle,
} from "@fortawesome/pro-light-svg-icons";

import styles from "./_navbar.module.scss";

const Navbar = () => {
  const [active, setActive] = useState(MENU[0].name);
  const [overlay, setOverlay] = useState(OVERLAY_POSITION[0]);
  return (
    <nav className={styles.navbar}>
      <span className={styles.navbar__overlay} style={{ left: overlay }} />
      <ul className={styles.navbar__menu}>
        {MENU.map((menu, index) => (
          <li
            key={menu.name}
            className={menu.name === active ? styles.active : ""}
            onClick={() => {
              console.log(index);
              setActive(menu.name);
              setOverlay(OVERLAY_POSITION[index]);
            }}
          >
            <span>
              <Icon fontName={menu.icon} size={30} />
            </span>
            <h6>{menu.name}</h6>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;

const MENU = [
  { name: "Home", icon: faHouseBlank },
  { name: "Blends", icon: faBlender },
  { name: "Challenge", icon: faWhistle },
  { name: "Planner", icon: faCalendarDays },
];

const OVERLAY_POSITION = {
  0: "0.50%",
  1: "24.5%",
  2: "51.25%",
  3: "78%",
};
