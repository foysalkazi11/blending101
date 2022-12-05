import React, { ReactNode, useRef } from "react";
import styles from "./toggleMenu.module.scss";

type ToggleMenuProps = {
  toggle?: number;
  setToggle?: (val: number) => void;
  toggleMenuList: string[] | ReactNode[];
  maxWidth?: React.CSSProperties;
  variant?:
    | "containPrimary"
    | "containSecondary"
    | "outlinePrimary"
    | "outlineSecondary";
};

const ToggleMenu = ({
  toggle = 0,
  setToggle = () => {},
  toggleMenuList,
  maxWidth = {},
  variant = "containPrimary",
}: ToggleMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (no: number) => {
    if (no === 0) {
      menuRef.current.style.left = "0";
    } else {
      menuRef.current.style.left = `${(100 / toggleMenuList.length) * no}%`;
    }
    setToggle(no);
  };
  return (
    <div className={styles.topMenuContainer}>
      <div
        className={styles.topMenu}
        style={{
          ...maxWidth,
          // border: toggleMenuList.length === 1 ? "0px" : "1px",
        }}
      >
        <div
          className={`${styles.active} ${styles[variant]}`}
          ref={menuRef}
          style={{ width: `${100 / toggleMenuList.length}%` }}
        ></div>
        {toggleMenuList?.map((menu, index) => {
          return (
            <div
              key={index}
              className={`${styles.menu} ${
                toggle === index ? styles[variant] : ""
              }`}
              onClick={() => handleToggle(index)}
              style={{ width: `${100 / toggleMenuList.length}%` }}
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
