import React from "react";
import Image from "next/image";

import styles from "./_header.module.scss";
import { useUser } from "context/AuthProvider";
import Icon from "component/atoms/Icon/Icon.component";
import { faUser } from "@fortawesome/pro-thin-svg-icons";
import { faTableCellsLarge } from "@fortawesome/pro-regular-svg-icons";
import { faChevronRight } from "@fortawesome/pro-light-svg-icons";
import Link from "next/link";
import routes from "routes";

const Header = () => {
  const user = useUser();

  return (
    <header className={styles.header}>
      <div className={styles.header__wrapper}>
        <img className={styles.header__logo} src="/logo_small.svg" alt="Blending101 Logo" />
        <div className={styles.header__breadcrumbs}>
          <Link href={routes.spaces.joined}>
            <Icon fontName={faTableCellsLarge} size={18} />
            Spaces
          </Link>
          <Link href={"#"}>
            <Icon fontName={faChevronRight} size={16} />
            30 Days Blending Challenge
          </Link>
        </div>
      </div>
      {user ? (
        <button className={styles.user}>
          {user?.image ? (
            <img className={styles.header__logo} src={user?.image} alt="Blending101 Logo" />
          ) : (
            <Icon fontName={faUser} size={20} />
          )}
        </button>
      ) : null}
    </header>
  );
};

export default Header;
