import styles from "./NotificationTray.module.scss";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBlender,
  faBookmark,
  faCalendar,
  faUser,
  faWhistle,
} from "@fortawesome/pro-light-svg-icons";
import CommentAndNoteButton from "../../../theme/button/commentAndNoteButton/CommentAndNoteButton";
import CircularRotatingLoader from "../../../theme/loader/circularRotatingLoader.component";
import { useRouter } from "next/router";
import { useAppDispatch } from "../../../redux/hooks";
import { setIsNotificationTrayOpen } from "../../../redux/slices/notificationSlice";
import useToAcceptRecipeShare from "../../../customHooks/notification/useToAcceptRecipeShare";
import useToRejectRecipeShare from "../../../customHooks/notification/useToRejectRecipeShare";
import { slugify } from "../../../helperFunc/string/slugToTittle";
import useToAcceptCollectionShare from "../../../customHooks/collection/useToAcceptCollectionShare";
import useToRejectCollectionShare from "../../../customHooks/collection/useToRejectCollectionShare";
import time_ago from "../../../helperFunc/date/time_ago";

// selected icon for different type of notification

const icons = {
  Recipe: faBlender,
  Collection: faBookmark,
  Plan: faCalendar,
  Challenge: faWhistle,
};

const NotificationDetails = ({
  shareData,
  sharedBy,
  variables,
  image,
  type,
  createdAt,
}) => {
  const { entityId } = shareData;
  const { displayName, firstName, lastName } = sharedBy;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { functionAcceptRecipeShare, acceptRecipeShareLoading } =
    useToAcceptRecipeShare();
  const { functionAcceptCollectionShare, acceptCollectionShareLoading } =
    useToAcceptCollectionShare();
  const { functionRejectRecipeShare, rejectRecipeShareLoading } =
    useToRejectRecipeShare();
  const { functionRejectCollectionShare, rejectCollectionShareLoading } =
    useToRejectCollectionShare();

  // show recipe
  const showRecipe = (type, entityId, token) => {
    if (type === "Recipe") {
      router.push(
        `/recipe_details/${entityId?._id}/${token ? "?token=" + token : ""} `,
      );
    }
    if (type === "Collection") {
      router.push(
        `/collection/recipeCollection/${slugify(entityId?.name)}${
          "?collectionId=" + entityId?._id
        }`,
      );
    }
    dispatch(setIsNotificationTrayOpen(false));
  };

  switch (type) {
  }
  return (
    <div className={styles.singleNotificationContainer}>
      <div className={styles.recipeName}>
        <div className={styles.leftSide}>
          <div className={styles.imageBox}>
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
              <FontAwesomeIcon icon={faUser} color="gray" size="2x" />
            )}
            <div className={styles.iconBox}>
              <FontAwesomeIcon icon={icons[type]} />
            </div>
          </div>

          <div>
            {/* <h3
              onClick={() => showRecipe(type, entityId, variables?.token)}
              className={`${styles.heading}`}
            >
              {entityId?.name}
            </h3> */}
            <p className={styles.sharedBy}>
              <span className={styles.name}>
                {displayName || firstName || lastName}
              </span>{" "}
              shared{" "}
              <span
                onClick={() => showRecipe(type, entityId, variables?.token)}
                className={styles.item}
              >
                {entityId?.name}
              </span>{" "}
              <span className={styles.type}>{type?.toLowerCase()}</span> with
              you on {time_ago(createdAt)}
            </p>
          </div>
        </div>
      </div>
      <div className={styles.btnBox}>
        <CommentAndNoteButton
          type="submitBtn"
          submitBtnVarient="outlineSecondary"
          style={{ boxShadow: "5px 5px 15px #e5e6e4" }}
          text={
            acceptRecipeShareLoading || acceptCollectionShareLoading ? (
              <CircularRotatingLoader
                color="white"
                style={{ fontSize: "16px" }}
              />
            ) : type === "Challenge" ? (
              "Accept"
            ) : (
              "Save"
            )
          }
          handleClick={() => {
            if (type === "Recipe") {
              functionAcceptRecipeShare(variables);
            }
            if (type === "Collection") {
              functionAcceptCollectionShare(variables);
            }
          }}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text={
            rejectRecipeShareLoading || rejectCollectionShareLoading ? (
              <CircularRotatingLoader
                color="primary"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Decline"
            )
          }
          handleClick={() => {
            if (type === "Recipe") {
              functionRejectRecipeShare(variables);
            }
            if (type === "Collection") {
              functionRejectCollectionShare(variables);
            }
          }}
        />
      </div>
    </div>
  );
};

export default NotificationDetails;
