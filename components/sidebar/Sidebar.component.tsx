/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "./sidebar.module.scss";

export default function SidebarComponent(props) {
  const [active, setActive] = useState(0);
  const router = useRouter();

  const pages = [
    { logo: "/icons/home.svg", link: "/" },
    { logo: "/icons/juicer.svg", link: "/" },
    { logo: "/icons/books.svg", link: "/" },
    { logo: "/icons/calender__sidebar.svg", link: "/" },
    { logo: "/icons/book_light.svg", link: "/" },
    { logo: "/icons/whistle.svg", link: "/" },
    { logo: "/icons/store.svg", link: "/" },
  ];

  const handleClick = (link: string, i: number) => {
    setActive(i);
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <img src="/logo_small.svg" alt="logo small" />
      </div>
      <ul className={styles.list}>
        {pages &&
          pages.map((page, i) => (
            <li
              key={"sidebaritem" + i}
              className={active === i ? styles.active : "null"}
              onClick={() => handleClick(page.link, i)}
            >
              <span>
                {" "}
                <img src={page.logo} alt={page.logo} />{" "}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
}
