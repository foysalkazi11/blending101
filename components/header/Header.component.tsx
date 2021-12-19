/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./header.module.scss";
import SocialComponent from "./social/Social.component";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import notification from "../utility/reactToastifyNotification";
import { Auth } from "aws-amplify";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setLoading } from "../../redux/slices/utilitySlice";
import { setUser, setNonConfirmedUser } from "../../redux/slices/userSlice";

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
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state?.user);
  console.log(user);

  const userSingOut = async () => {
    dispatch(setLoading(true));
    try {
      await Auth.signOut();
      dispatch(setLoading(false));
      notification("info", "Logout successfully");
      dispatch(setUser(""));
      dispatch(setNonConfirmedUser(""));
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
          <div className={styles.left + " " + styles.logo}>
            {logo && <img src="/logo.png" alt="logo" />}
          </div>
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
              <img src="/user-profile.png" alt="prfile.png" />
            </div>

            <button
              style={{
                marginLeft: "10px",
                border: "none",
                outline: "none",
                cursor: "pointer",
                backgroundColor: "transparent",
              }}
              onClick={userSingOut}
            >
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
