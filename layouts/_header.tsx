import React, { useState, useRef, useEffect } from "react";
import styles from "./_header.module.scss";
import { HiOutlineUserCircle } from "react-icons/hi";
import {
  MdOutlineAdminPanelSettings,
  MdHelpOutline,
  MdOutlineLogout,
  MdOutlineLogin,
  MdPublishedWithChanges,
} from "react-icons/md";
import Link from "next/link";
import { FaRegUser } from "react-icons/fa";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/pro-solid-svg-icons";
import { useQuery } from "@apollo/client";

import SocialComponent from "../components/header/social/Social.component";
import useOnClickOutside from "../components/utility/useOnClickOutside";
import { useUser, useUserHandler } from "../context/AuthProvider";
import GET_SHARE_NOTIFICATION from "../gqlLib/notification/query/getShareNotification";
import { useAppDispatch } from "../redux/hooks";
import { setIsNotificationTrayOpen } from "../redux/slices/notificationSlice";
import NotificationBell from "../theme/notificationBell";

interface IHeader {
  logo?: Boolean;
  title: string;
  fullWidth?: Boolean;
  icon?: string | React.ReactNode;
  mainRef: any;
}

function Header({
  logo = true,
  title = "Home",
  fullWidth,
  icon = "",
  mainRef,
}: IHeader) {
  const user = useUser();
  const { signOut } = useUserHandler();

  const headerEl = useRef(null);
  const userMenu = useRef(null);
  const userIcon = useRef(null);

  const [openPopup, setOpenPopup] = useState(false);
  useOnClickOutside(userMenu, () => setOpenPopup(false));

  const { data } = useQuery(GET_SHARE_NOTIFICATION, {
    variables: { userId: user?.id },
    fetchPolicy: "cache-and-network",
  });

  const dispatch = useAppDispatch();

  const style = fullWidth ? { width: "100%" } : {};
  const notificationLength = data?.getShareNotification?.totalNotification || 0;

  // useEffect(() => {
  //   const main: HTMLDivElement = mainRef.current;
  //   if (typeof window !== `undefined`) {
  //     let prevScrollPosition = main.scrollTop;
  //     main.addEventListener("scroll", (e: any) => {
  //       const curScrollPosition = e.target.scrollTop;
  //       const difference = prevScrollPosition - curScrollPosition;
  //       console.log({
  //         curr: curScrollPosition,
  //         prev: prevScrollPosition,
  //         difference,
  //       });
  //       const { current } = headerEl;
  //       // setMobileNav(false);
  //       if (curScrollPosition > 100) {
  //         current.classList.add(styles.compaq);
  //       } else {
  //         current.classList.remove(styles.compaq);
  //       }
  //       if (difference < 0) {
  //         current.classList.add(styles.hide);
  //       } else {
  //         current.classList.remove(styles.hide);
  //       }
  //       prevScrollPosition = curScrollPosition;
  //     });
  //   }
  // }, []);

  return (
    <header id="header" ref={headerEl}>
      <div className={styles.header} style={style}>
        <div className={styles.header__inner}>
          <Link href="/" passHref>
            <div className={styles.left + " " + styles.logo}>
              {logo && <img src="/logo.png" alt="logo" />}
            </div>
          </Link>
          <div className={styles.center}>
            {icon ? (
              typeof icon === "string" ? (
                <img src={icon} alt="icon" />
              ) : (
                icon
              )
            ) : null}
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className={styles.right + " " + styles.logo}>
            <SocialComponent />

            <NotificationBell
              count={notificationLength}
              onClick={() => dispatch(setIsNotificationTrayOpen(true))}
            />

            <div className={styles.cart__icon}>
              <FontAwesomeIcon icon={faBagShopping} />
            </div>
            {/* <LocalMallIcon className={styles.cart__icon} /> */}

            <div className={styles.userPopupMenu} ref={userMenu}>
              <div className={styles.arrowWithText} ref={userIcon}>
                {user ? (
                  <div className={styles.userName}>
                    {user?.image ? (
                      <Image
                        src={user?.image}
                        alt="prfile.png"
                        objectFit="cover"
                        layout="fill"
                        onClick={(e) => {
                          setOpenPopup((pre) => !pre);
                        }}
                      />
                    ) : (
                      <FaRegUser
                        className={styles.userName__image}
                        onClick={() => setOpenPopup((pre) => !pre)}
                      />
                    )}
                  </div>
                ) : null}
              </div>

              {openPopup ? (
                <div className={`${styles.popup}`}>
                  <Link href="/user/?type=about" passHref>
                    <div className={styles.menu}>
                      <p>My Profile</p>
                      <HiOutlineUserCircle className={styles.icon} />
                    </div>
                  </Link>
                  <div className={styles.menu}>
                    <p>Admin</p>
                    <MdOutlineAdminPanelSettings className={styles.icon} />
                  </div>
                  <div className={styles.menu}>
                    <p>Help</p>
                    <MdHelpOutline className={styles.icon} />
                  </div>
                  {user ? (
                    <>
                      <Link href="/reset_password" passHref>
                        <div className={styles.menu}>
                          <p>Change Pass.</p>
                          <MdPublishedWithChanges className={styles.icon} />
                        </div>
                      </Link>
                      <div className={styles.menu} onClick={signOut}>
                        <p>Logout</p>
                        <MdOutlineLogout className={styles.icon} />
                      </div>
                    </>
                  ) : (
                    <Link href="/login" passHref>
                      <div className={styles.menu}>
                        <p>Login</p>
                        <MdOutlineLogin className={styles.icon} />
                      </div>
                    </Link>
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
