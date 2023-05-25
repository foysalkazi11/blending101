import styles from "./NotificationTray.module.scss";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-light-svg-icons";
import CommentAndNoteButton from "../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import ACCEPT_RECIPE_SHARE from "../../../gqlLib/notification/mutation/acceptRecipeShare";
import REJECT_RECIPE_SHARE from "../../../gqlLib/notification/mutation/rejectRecipeShare";
import notification from "../../utility/reactToastifyNotification";
import useToUpdateShareNotification from "../../../customHooks/notification/useToUpdateShareNotification";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsNotificationTrayOpen } from "../../../redux/slices/notificationSlice";
import useToAcceptRecipeShare from "../../../customHooks/notification/useToAcceptRecipeShare";
import useToRejectRecipeShare from "../../../customHooks/notification/useToRejectRecipeShare";

const NotificationDetails = ({
  shareData,
  sharedBy,
  variables,
  image,
  type,
}) => {
  const { entityId } = shareData;
  const { displayName, firstName, lastName } = sharedBy;

  const handleUpdateShareNotification = useToUpdateShareNotification();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { functionAcceptRecipeShare, acceptRecipeShareLoading } =
    useToAcceptRecipeShare();
  const { functionRejectRecipeShare, rejectRecipeShareLoading } =
    useToRejectRecipeShare();

  // show recipe
  const showRecipe = (type, id, token) => {
    if (type === "Recipe") {
      router.push(`/recipe_details/${id}/${token ? "?token=" + token : ""} `);
      dispatch(setIsNotificationTrayOpen(false));
    }
  };
  return (
    <div className={styles.singleNotificationContainer}>
      <div className={styles.recipeName}>
        <div className={styles.leftSide}>
          {image ? (
            <Image
              src={image || ""}
              alt="recipe_img"
              width={45}
              height={45}
              objectFit="cover"
              loading="lazy"
              className={styles.image}
            />
          ) : (
            <div className={styles.image}>
              <FontAwesomeIcon icon={faUser} color="gray" size="2x" />
            </div>
          )}

          <div>
            <h3
              onClick={() => showRecipe(type, entityId?._id, variables?.token)}
              className={`${styles.heading}`}
            >
              {entityId?.name}
            </h3>
            <p className={styles.sharedBy}>
              Shared by : {displayName || firstName || lastName}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.btnBox}>
        <CommentAndNoteButton
          type="submitBtn"
          submitBtnVarient="secondary"
          style={{ boxShadow: "5px 5px 15px #e5e6e4" }}
          text={
            acceptRecipeShareLoading ? (
              <CircularRotatingLoader
                color="white"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Accept"
            )
          }
          handleClick={() => functionAcceptRecipeShare(variables)}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text={
            rejectRecipeShareLoading ? (
              <CircularRotatingLoader
                color="primary"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Decline"
            )
          }
          handleClick={() => functionRejectRecipeShare(variables)}
        />
      </div>
    </div>
  );
};

export default NotificationDetails;
