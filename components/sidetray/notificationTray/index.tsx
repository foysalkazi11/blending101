import React, { useState } from "react";
import TrayWrapper from "../TrayWrapper";
import TrayTag from "../TrayTag";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { faBell, faBellConcierge } from "@fortawesome/pro-light-svg-icons";
import { setIsNotificationTrayOpen } from "../../../redux/slices/notificationSlice";
import ShowNotificationData from "./ShowNotificationData";
import styles from "./NotificationTray.module.scss";
import ToggleMenu from "../../../theme/toggleMenu/ToggleMenu";
import GET_SHARE_NOTIFICATION from "../../../gqlLib/notification/query/getShareNotification";
import { useQuery } from "@apollo/client";
import { useUser } from "../../../context/AuthProvider";
interface CommentsTrayProps {
  showTagByDefaut?: boolean;
  showPanle?: "left" | "right";
}

export default function NotificationTray({
  showPanle,
  showTagByDefaut,
}: CommentsTrayProps) {
  const [toggleNotification, setToggleNotification] = useState(0);
  const dispatch = useAppDispatch();
  const { isNotificationTrayOpen } = useAppSelector(
    (state) => state.notification,
  );
  const userId = useUser().id;
  const { data, loading } = useQuery(GET_SHARE_NOTIFICATION, {
    variables: { userId },
    fetchPolicy: "cache-and-network",
  });

  const notification = data?.getShareNotification;

  return (
    <div className={showPanle === "right" ? styles.fixed__main__right : ""}>
      <TrayWrapper
        showTagByDefault={showTagByDefaut}
        closeTray={() => dispatch(setIsNotificationTrayOpen(false))}
        openTray={isNotificationTrayOpen}
        showPanel={showPanle}
        panelTag={(hover) => (
          <TrayTag
            icon={<FontAwesomeIcon icon={faBell} />}
            placeMent="left"
            hover={hover}
          />
        )}
      >
        <ToggleMenu
          toggleMenuList={[
            <div key={"key0"} className={styles.menu}>
              <FontAwesomeIcon icon={faBell} className={styles.icon} />

              <p>Notifications</p>
            </div>,
          ]}
          variant={"outlineSecondary"}
        />
        <ToggleMenu
          toggleMenuList={[
            <div key={"key0"} className={styles.sharedNotificationBox}>
              <p className={styles.text}>Shared </p>
              <span className={styles.count}>
                {notification?.totalNotification}
              </span>{" "}
            </div>,
            <p key={"key1"}>Others</p>,
          ]}
          variant="borderBottomSecondary"
          toggle={toggleNotification}
          setToggle={(index) => setToggleNotification(index)}
        />
        {toggleNotification === 0 && (
          <ShowNotificationData
            notificationData={notification}
            notificationDataLoading={loading}
          />
        )}
      </TrayWrapper>
    </div>
  );
}
