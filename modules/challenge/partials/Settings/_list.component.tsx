import { useMutation } from "@apollo/client";
import { faUserPlus, faTrash } from "@fortawesome/pro-regular-svg-icons";
import RadioButton from "component/organisms/Forms/RadioButton.component";
import IconButton from "component/atoms/Button/IconButton.component";
import Textfield from "component/organisms/Forms/Textfield.component";
import { SharedUserInfoType } from "component/organisms/Share/Distribute.component";
import Invite from "component/organisms/Share/Invite.component";
import { useUser } from "context/AuthProvider";
import { isPast, format } from "date-fns";
import { INVITE_CHALLENGE } from "@/challenge/challenge.graphql";
import { UTCDate } from "helpers/Date";
import Publish from "helpers/Publish";
import { useRouter } from "next/router";
import { Fragment, useState } from "react";
import Tooltip from "component/molecules/Tooltip/Tooltip.component";
import { useAppDispatch } from "redux/hooks";
import { setChallengeDate } from "redux/slices/Challenge.slice";

import styles from "./index.module.scss";
import { Challenge } from "@/app/types/challenge.types";
import useChallengeActivate from "@/challenge/hooks/settings/useActivate";
import useChallengeDelete from "@/challenge/hooks/settings/useDelete";
import Alert from "component/molecules/Alert/Alert.component";

const DEFAULT_CHALLENGE = { title: "", id: "" };

interface ChallengeListProps {
  currentChallenge: string;
  challenges: Challenge[];
  editFormHandler: (challenge: Challenge) => void;
}

const ChallengeList = (props: ChallengeListProps) => {
  const { currentChallenge, challenges, editFormHandler } = props;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);

  const [activeId, setActiveId] = useState("");
  const [challengeInfo, setChallengeInfo] = useState(DEFAULT_CHALLENGE);

  const dispatch = useAppDispatch();
  const userId = useUser().id;

  const [activateChallenge, activateState] = useChallengeActivate(userId);
  const [deleteChallenge, deleteState] = useChallengeDelete(userId);
  const [inviteChallenge, { loading: inviteChallengeLoading }] = useMutation(INVITE_CHALLENGE);

  const [emails, setEmails] = useState<SharedUserInfoType[]>([]);

  const handleInvitation = () => {
    if (emails.length === 0) return;
    inviteChallenge({
      variables: {
        shareWithOther: false,
        emails: emails?.map((info) => info?.email),
        user: userId,
        challengeId: challengeInfo?.id,
      },
    }).then((response) => {
      setShow(false);
      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/invited/?id=${response.data.inviteToChallenge}`,
      );
    });
  };

  const resetModal = () => {
    setEmails([]);
    setShow(false);
  };

  const activeHandler = async (challengeId) => {
    if (challengeId === currentChallenge) return;
    await Publish({
      mutate: activateChallenge,
      variables: {
        memberId: userId,
        newChallenge: challengeId,
        prevChallenge: currentChallenge,
      },
      state: activateState,
      success: `Activated Challenge Sucessfully`,
      onSuccess: () => {
        dispatch(setChallengeDate(""));
        setActiveId(challengeId);
        router.replace("/challenge", undefined, { shallow: true });
        // hideSettings();
      },
    });
  };

  const deleteHandler = async (challengeId) => {
    await Publish({
      mutate: deleteChallenge,
      variables: {
        challengeId,
      },
      state: deleteState,
      success: `Deleted Challenge Sucessfully`,
      onSuccess: () => {
        setChallengeInfo(DEFAULT_CHALLENGE);
        setDeleteAlert(false);
      },
    });
  };

  return (
    <div className={styles.settings__body}>
      <div className={styles.settings__header}>
        <h2 className={styles.settings__title}>My Challenges</h2>
      </div>
      <div>
        <Invite
          show={show}
          setShow={setShow}
          {...challengeInfo}
          emails={emails}
          setEmails={setEmails}
          handleCancel={resetModal}
          handleInvitation={handleInvitation}
          loading={inviteChallengeLoading}
        />
        <Alert
          show={deleteAlert}
          setShow={setDeleteAlert}
          message={`Delete "${challengeInfo.title}"`}
          description="This will permanently delete this challenge. You cannot undo this action"
          actions={[
            {
              title: "Delete",
              handler: () => {
                deleteHandler(challengeInfo.id);
              },
            },
            {
              title: "Cancel",
              handler: () => {
                setDeleteAlert(false);
              },
            },
          ]}
        />
        <div className="row mb-10 mt-10">
          <div className="col-1" />
          <div className="col-4">
            <h5>Challenge Name</h5>
          </div>
          <div className="col-3">
            <h5>Start Date</h5>
          </div>
          <div className="col-2">
            <h5>Days</h5>
          </div>
          <div className="col-2">&nbsp;</div>
        </div>
        {challenges?.map((challenge) => {
          const hasChallengeStarted = isPast(UTCDate(challenge.startDate));
          const hasChallengeEnded = isPast(UTCDate(challenge.endDate));
          const canShareWithOthers = !hasChallengeStarted && challenge.canInviteWithOthers;

          // WHEN SETTINGS IS FETCHED FIRST ACTIVEID IS NULL BUT "isActive" HAS THE VALUE, LATER IF WE TOGGLE BETWEEN CHALLENGES THEN ACTIVEID GETS VALUE AND SECOND LOGIC GETS INVOKED
          const isChallengeActive =
            activeId === "" && challenge.isActive ? "" : activeId === challenge._id ? "" : "unchecked";

          let shareBtnTooltip: string;
          if (hasChallengeStarted) shareBtnTooltip = "Challenge has started";
          if (hasChallengeEnded) shareBtnTooltip = "Challenge has ended";
          if (!challenge.canInviteWithOthers) shareBtnTooltip = "You are not allowed to share with others";
          console.log(activeId === "" && challenge.isActive ? "" : activeId === challenge._id ? "" : "unchecked");
          return (
            <div className={`row ${styles.challenge}`} key={challenge._id}>
              <div className="col-1">
                <div className={styles.challenge__action}>
                  <RadioButton
                    // OPTIONS = "" => TO HIDE LABEL
                    selected={isChallengeActive}
                    options={[""]}
                    onChange={() => activeHandler(challenge._id)}
                    className={styles.challenge__action__radio}
                  />
                </div>
              </div>
              <div className="col-4">
                <Tooltip content={hasChallengeEnded ? "Challenge has ended" : ""}>
                  <div
                    className={styles.challenge__name}
                    style={hasChallengeEnded ? { backgroundColor: "#eee", color: "#333" } : {}}
                  >
                    <a onClick={() => editFormHandler(challenge)}>{challenge.challengeName}</a>
                  </div>
                </Tooltip>
              </div>
              <div className="col-3">
                <Textfield defaultValue={challenge.startingDate} disabled />
              </div>
              <div className="col-2">
                <Textfield defaultValue={challenge.days} disabled />
              </div>
              <div className="col-2 flex">
                <Tooltip content={shareBtnTooltip}>
                  <IconButton
                    fontName={faUserPlus}
                    variant="fade"
                    size="small"
                    disabled={!canShareWithOthers}
                    className={`${styles.challenge__action__trash} ml-30`}
                    onClick={() => {
                      setShow(true);
                      setChallengeInfo({
                        id: challenge._id,
                        title: challenge.challengeName,
                      });
                    }}
                  />
                </Tooltip>
                <Tooltip content={isChallengeActive === "" ? "You can't delete activated challenge" : ""}>
                  <IconButton
                    fontName={faTrash}
                    variant="fade"
                    size="small"
                    disabled={isChallengeActive === ""}
                    className={`${styles.challenge__action__trash} ml-10`}
                    onClick={() => {
                      setDeleteAlert(true);
                      setChallengeInfo({
                        id: challenge._id,
                        title: challenge.challengeName,
                      });
                    }}
                  />
                </Tooltip>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChallengeList;
