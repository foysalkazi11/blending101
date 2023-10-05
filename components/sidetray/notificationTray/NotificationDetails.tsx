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
import useToRejectChallengeInvite from "../../../customHooks/notification/useToRejectChallengeInvite";
import useToAcceptChallengeInvite from "../../../customHooks/notification/useToAcceptChallengeInvite";

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
  const { functionAcceptChallengeInvite, acceptChallengeInviteLoading } =
    useToAcceptChallengeInvite();
  const { functionAcceptCollectionShare, acceptCollectionShareLoading } =
    useToAcceptCollectionShare();
  const { functionRejectRecipeShare, rejectRecipeShareLoading } =
    useToRejectRecipeShare();
  const { functionRejectCollectionShare, rejectCollectionShareLoading } =
    useToRejectCollectionShare();
  const { functionRejectChallengeInvite, rejectChallengeInviteLoading } =
    useToRejectChallengeInvite();

  // show recipe
  const showRecipe = (type, entityId, token) => {
    if (type === "Recipe") {
      router.push(
        `/recipe/recipe_details/${entityId?._id}/${
          token ? "?token=" + token : ""
        } `,
      );
    }
    if (type === "Collection") {
      router.push(
        `/recipe/recipeCollection/${slugify(entityId?.name)}${
          "?collectionId=" + entityId?._id
        }`,
      );
    }
    if (type === "Challenge") {
      router.push(`/challenge/invited/${"?id=" + entityId?._id}`);
    }
    dispatch(setIsNotificationTrayOpen(false));
  };

  // accept share
  const handleAcceptShare = (type) => {
    if (type === "Recipe") {
      functionAcceptRecipeShare(variables);
    }
    if (type === "Collection") {
      functionAcceptCollectionShare(variables);
    }
    if (type === "Challenge") {
      functionAcceptChallengeInvite(variables);
    }
  };

  // decline share
  const handleDeclineShare = (type) => {
    if (type === "Recipe") {
      functionRejectRecipeShare(variables);
    }
    if (type === "Collection") {
      functionRejectCollectionShare(variables);
    }
    if (type === "Challenge") {
      functionRejectChallengeInvite(variables);
    }
  };
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
          text={
            acceptRecipeShareLoading ||
            acceptCollectionShareLoading ||
            acceptChallengeInviteLoading ? (
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
          handleClick={() => handleAcceptShare(type)}
        />
        <CommentAndNoteButton
          type="cancleBtn"
          text={
            rejectRecipeShareLoading ||
            rejectCollectionShareLoading ||
            rejectChallengeInviteLoading ? (
              <CircularRotatingLoader
                color="primary"
                style={{ fontSize: "16px" }}
              />
            ) : (
              "Decline"
            )
          }
          handleClick={() => handleDeclineShare(type)}
        />
      </div>
    </div>
  );
};

export default NotificationDetails;
