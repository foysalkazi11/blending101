import React from "react";
import IconButton from "../../../atoms/Button/IconButton.component";
import { faBarsSort } from "@fortawesome/pro-regular-svg-icons";
import styles from "./Header.module.scss";
import { useMediaQuery } from "@/app/hooks/interface/useMediaQuery";

interface MHeaderProps {
  title: string;
}

const Header: React.FC<MHeaderProps> = (props) => {
  const { title, children } = props;
  const isMobile = useMediaQuery("md");
  if (!isMobile) return <></>;
  return (
    <div className={styles.header}>
      <IconButton fontName={faBarsSort} className={styles.header__menu} />
      <h1 className={styles.header__title}>{title}</h1>
      <div>{children}</div>
    </div>
  );
};

export default Header;
