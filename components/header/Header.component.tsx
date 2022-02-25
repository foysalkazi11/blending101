/* eslint-disable @next/next/no-img-element */
import React, { useState, useRef } from "react";
import styles from "./header.module.scss";
import SocialComponent from "./social/Social.component";
import LocalMallIcon from "../../public/icons/local_mall_black_36dp.svg";
import notification from "../utility/reactToastifyNotification";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import {
  setUser,
  setNonConfirmedUser,
  setDbUser,
} from "../../redux/slices/userSlice";
import { BsCaretDown, BsCaretUp } from "react-icons/bs";
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
import useOnClickOutside from "../utility/useOnClickOutside";

interface headerInterface {
  logo: Boolean;
  headerTitle: string;
  fullWidth?: Boolean;
}

export default function HeaderComponent({
  logo = true,
  headerTitle = "Home",
  fullWidth,
}: headerInterface) {
  const [openPopup, setOpenPopup] = useState(false);
  const dispatch = useAppDispatch();
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const userMenu = useRef(null);
  useOnClickOutside(userMenu, () => setOpenPopup(false));

  const userSingOut = async () => {
    dispatch(setLoading(true));
    try {
      await Auth.signOut();
      dispatch(setLoading(false));
      notification("info", "Logout successfully");
      dispatch(setUser(""));
      dispatch(setNonConfirmedUser(""));
      dispatch(setDbUser({}));
    } catch (error) {
      dispatch(setLoading(false));
      notification("error", error?.message);
    }
  };

  const style = fullWidth ? { width: "100%" } : {};

  return (
    <div className={styles.wrapper}>
      <div className={styles.header} style={style}>
        <div className={styles.header__inner}>
          <Link href="/" passHref>
            <div className={styles.left + " " + styles.logo}>
              {logo && <img src="/logo.png" alt="logo" />}
            </div>
          </Link>
          <div className={styles.center + " " + styles.info}>
            <h3>{headerTitle}</h3>
          </div>
          <div className={styles.right + " " + styles.logo}>
            <div>
              <SocialComponent />
            </div>
            <div>
              <LocalMallIcon className={styles.cart__icon} />
            </div>
            <div className={styles.profile}>
              {dbUser?.image ? (
                <img src={dbUser?.image} alt="prfile.png" />
              ) : (
                <FaRegUser
                  style={{ fontSize: "24px", justifySelf: "flex-end" }}
                />
              )}
            </div>

            <div className={styles.userPopupMenu}>
              {user ? <p className={styles.welcomeText}>Welcome</p> : null}

              <div className={styles.arrowWithText}>
                {user ? (
                  <strong className={styles.userName}>
                    {dbUser?.displayName ||
                      dbUser?.lastName ||
                      dbUser?.firstName ||
                      dbUser?.email}
                  </strong>
                ) : null}
                {openPopup ? (
                  <BsCaretUp
                    className={styles.downArrow}
                    onClick={() => setOpenPopup((pre) => !pre)}
                  />
                ) : (
                  <BsCaretDown
                    className={styles.downArrow}
                    onClick={() => setOpenPopup((pre) => !pre)}
                  />
                )}
              </div>

              {openPopup ? (
                <div
                  className={`${styles.popup}`}
                  ref={userMenu}
                  // style={{
                  //   top: user ? "50px" : "inherits",
                  //   marginLeft: user ? "-100px" : "inherits",
                  // }}
                >
                  {user ? (
                    <Link href="/user" passHref>
                      <div className={styles.menu}>
                        <p>My Profile</p>
                        <HiOutlineUserCircle className={styles.icon} />
                      </div>
                    </Link>
                  ) : null}
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
                      <div className={styles.menu} onClick={userSingOut}>
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
