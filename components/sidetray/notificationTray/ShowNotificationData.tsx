import React from "react";
import { useQuery } from "@apollo/client";
import GET_SHARE_NOTIFICATION from "../../../gqlLib/notification/query/getShareNotification";
import { useAppSelector } from "../../../redux/hooks";
import NotificationDetails from "./NotificationDetails";
import SkeletonComment from "../../../theme/skeletons/skeletonComment/SkeletonComment";
import styles from "./NotificationTray.module.scss";

interface Props {
  notificationData: any;
  notificationDataLoading: boolean;
}

const ShowNotificationData = ({
  notificationData: notification,
  notificationDataLoading,
}: Props) => {
  const userId = useAppSelector((state) => state?.user?.dbUser?._id);

  if (notificationDataLoading) {
    return <SkeletonComment />;
  }

  return (
    <>
      {notification?.totalNotification ? (
        notification?.shareNotifications?.map(
          ({ _id, image, type, shareData, sharedBy, createdAt }) => {
            return (
              <NotificationDetails
                key={_id}
                variables={{ userId, token: _id }}
                shareData={shareData}
                sharedBy={sharedBy}
                image={image}
                type={type}
                createdAt={createdAt}
              />
            );
          },
        )
      ) : (
        <div className={styles.noNotification}>
          <p className={styles.text}>{"No notifications"}</p>
        </div>
      )}
    </>
  );
};

export default ShowNotificationData;
