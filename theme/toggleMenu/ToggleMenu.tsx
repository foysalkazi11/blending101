import React, { ReactNode } from "react";
import styles from "./toggleMenu.module.scss";
import { ToggleMenuType } from "../../type/toggleMenuType";

let border = {
  border: "1px solid #c1c1c1",
};
let borderBottom = {
  borderBottom: "1px solid #c1c1c1",
};

type ToggleMenuProps = {
  toggle?: number;
  setToggle?: (val: number) => void;
  toggleMenuList: string[] | ReactNode[];
  maxWidth?: React.CSSProperties;
  variant?: ToggleMenuType;
};

const ToggleMenu = ({
  toggle = 0,
  setToggle = () => {},
  toggleMenuList,
  maxWidth = {},
  variant = "containPrimary",
}: ToggleMenuProps) => {
  let styleForTopMenu =
    variant === "borderBottomPrimary" || variant === "borderBottomSecondary"
      ? {}
      : border;
  let styleForMenu =
    variant === "borderBottomPrimary" || variant === "borderBottomSecondary"
      ? borderBottom
      : {};
  return (
    <div className={styles.topMenuContainer}>
      <div
        className={styles.topMenu}
        style={{
          ...maxWidth,
          ...styleForTopMenu,
        }}
      >
        <div
          className={`${styles.active} ${styles[variant]}`}
          style={{
            width: `${100 / toggleMenuList.length}%`,
            left: `${(100 / toggleMenuList.length) * toggle}%`,
          }}
        ></div>
        {toggleMenuList?.map((menu, index) => {
          return (
            <div
              key={index}
              className={`${styles.menu} ${
                toggle === index ? styles[variant] : ""
              }`}
              onClick={() => setToggle(index)}
              style={{
                width: `${100 / toggleMenuList.length}%`,
                ...styleForMenu,
              }}
            >
              {menu}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ToggleMenu;
