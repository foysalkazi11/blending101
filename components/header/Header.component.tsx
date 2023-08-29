/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import styles from "./header.module.scss";
import SocialComponent from "./social/Social.component";
import notification from "../utility/reactToastifyNotification";
import { Auth } from "aws-amplify";
import { useAppDispatch } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import {
  setUser,
  setNonConfirmedUser,
  setDbUser,
} from "../../redux/slices/userSlice";
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
import useOnClickOutside from "../utility/useOnClickOutside";
import { DbUserType } from "../../type/dbUserType";
import NotificationBell from "../../theme/notificationBell";
import NotificationPopup from "../../theme/notificationPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/pro-solid-svg-icons";
import { setIsNotificationTrayOpen } from "../../redux/slices/notificationSlice";
import { useQuery } from "@apollo/client";
import GET_SHARE_NOTIFICATION from "../../gqlLib/notification/query/getShareNotification";
import { useUserHandler, useUser } from "../../context/AuthProvider";
import { NextImageWithFallback } from "../../theme/imageWithFallback";

interface headerInterface {
  logo: Boolean;
  headerTitle: string;
  fullWidth?: Boolean;
  headerIcon?: string | React.ReactNode;
}

export default function HeaderComponent({
  logo = true,
  headerTitle = "Home",
  fullWidth,
  headerIcon = "",
}: headerInterface) {
  const user = useUser();
  const { signOut } = useUserHandler();

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={style}>
        <div className={styles.header__inner}>
          <Link href="/" passHref>
            <div className={styles.left + " " + styles.logo}>
              {logo && <img src="/logo.png" alt="logo" />}
            </div>
          </Link>
          <div className={styles.center}>
            {headerIcon ? (
              typeof headerIcon === "string" ? (
                <img src={headerIcon} alt="icon" />
              ) : (
                headerIcon
              )
            ) : null}
            <h2 className={styles.title}>{headerTitle}</h2>
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
                      <NextImageWithFallback
                        src={user?.image}
                        alt="prfile.png"
                        fallbackSrc="/images/user-placeholder.png"
                        style={{ objectFit: "cover" }}
                        fill
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
    </div>
  );
}
