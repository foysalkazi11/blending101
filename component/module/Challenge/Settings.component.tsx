import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useMutation, useQuery } from "@apollo/client";
import {
  faChevronLeft,
  faTimes,
  faTrash,
  faUserPlus,
} from "@fortawesome/pro-solid-svg-icons";

import ButtonComponent from "../../../theme/button/button.component";
import IconButton from "../../atoms/Button/IconButton.component";
import Checkbox from "../../organisms/Forms/Checkbox.component";
import NumberField from "../../organisms/Forms/NumericField.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

import {
  ACTIVATE_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  EDIT_CHALLENGE,
  GET_CHALLENGES,
  INVITE_CHALLENGE,
} from "../../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";

import styles from "./Settings.module.scss";
import { addDays, differenceInDays, format, isBefore, isPast } from "date-fns";
import RadioButton from "../../organisms/Forms/RadioButton.component";
import { setChallengeDate } from "../../../redux/slices/Challenge.slice";
import Invite from "../../organisms/Share/Invite.component";
import { SharedUserInfoType } from "../../organisms/Share/Distribute.component";

interface SettingsProps {
  currentChallenge: string;
  challenges: any;
  hideSettings: () => void;
}

const Settings = (props: SettingsProps) => {
  const { currentChallenge, hideSettings, challenges } = props;
  const [showForm, setShowForm] = useState(false);
  const [challenge, setChallenge] = useState<any>(null);

  const editFormHandler = useCallback((data) => {
    setShowForm(true);
    setChallenge(data);
  }, []);

  return (
    <div className={styles.settings}>
      <div className={styles.settings__header}>
        <h2 className={styles.settings__title}>
          {!showForm && (
            <IconButton
              size="medium"
              variant="white"
              className="mr-20"
              fontName={faChevronLeft}
              onClick={hideSettings}
            />
          )}
          Settings
        </h2>
        {!showForm && (
          <ButtonComponent
            type="buttonWithIcon"
            value="Add Challenge"
            icon="/images/plus-white-icon.svg"
            style={{
              height: "4rem",
              width: "19rem",
              borderRadius: "10px",
              fontSize: "1.5rem",
            }}
            onClick={() => {
              setChallenge(null);
              setShowForm(true);
            }}
          />
        )}
        {showForm && (
          <IconButton
            size="small"
            variant="primary"
            fontName={faTimes}
            onClick={() => {
              setShowForm(false);
            }}
          />
        )}
      </div>
      <div>
        {showForm ? (
          <ChallengeForm challenge={challenge} setShowForm={setShowForm} />
        ) : (
          <ChallengeList
            currentChallenge={currentChallenge}
            challenges={challenges}
            editFormHandler={editFormHandler}
            hideSettings={hideSettings}
          />
        )}
      </div>
    </div>
  );
};

const ChallengeList = ({
  currentChallenge,
  challenges,
  editFormHandler,
  hideSettings,
}) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [challengeInfo, setChallengeInfo] = useState<any>({});

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [activateChallenge, activateState] = useMutation(ACTIVATE_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge", "GetAllChallenges"],
  });
  const [deleteChallenge, deleteState] = useMutation(DELETE_CHALLENGE, {
    refetchQueries: ["GetAllChallenges"],
  });

  const [inviteChallenge, { loading: inviteChallengeLoading }] =
    useMutation(INVITE_CHALLENGE);
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
        hideSettings();
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
    });
  };

  return (
    <Fragment>
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
      {challenges?.getMyChallengeList?.map((challenge) => {
        const canShareWithOthers = isPast(new Date(challenge.startDate));
        return (
          <div className={`row ${styles.challenge}`} key={challenge._id}>
            <div className="col-1">
              <div className={styles.challenge__action}>
                <RadioButton
                  selected={
                    activeId === "" && challenge.isActive
                      ? ""
                      : activeId === challenge._id
                      ? ""
                      : "unchecked"
                  }
                  options={[""]}
                  onChange={() => activeHandler(challenge._id)}
                  className={styles.challenge__action__radio}
                />
              </div>
            </div>
            <div className="col-4">
              <div
                className={styles.challenge__name}
                style={
                  isPast(new Date(challenge.endDate))
                    ? { backgroundColor: "#eee", color: "#333" }
                    : {}
                }
              >
                <a onClick={() => editFormHandler(challenge)}>
                  {challenge.challengeName}
                </a>
              </div>
            </div>
            <div className="col-3">
              <Textfield defaultValue={challenge.startingDate} disabled />
            </div>
            <div className="col-2">
              <Textfield defaultValue={challenge.days} disabled />
            </div>
            <div className="col-2">
              <IconButton
                fontName={faUserPlus}
                variant="fade"
                size="small"
                disabled={canShareWithOthers}
                className={`${styles.challenge__action__trash} ml-30`}
                onClick={() => {
                  setShow(true);
                  setChallengeInfo({
                    id: challenge._id,
                    title: challenge.challengeName,
                  });
                }}
              />
              <IconButton
                fontName={faTrash}
                variant="fade"
                size="small"
                className={`${styles.challenge__action__trash} ml-10`}
                onClick={() => deleteHandler(challenge._id)}
              />
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};

const defaultValues = {
  challengeName: "",
  startDate: format(new Date(), "yyyy-MM-dd"),
  endDate: "",
  description: "",
  notification: false,
};

const ChallengeForm = ({ setShowForm, challenge }) => {
  const [days, setDays] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addChallenge, addState] = useMutation(CREATE_CHALLENGE, {
    refetchQueries: ["GetAllChallenges"],
  });
  const [editChallenge, editState] = useMutation(EDIT_CHALLENGE, {
    refetchQueries: ["GetAllChallenges", "Get30DaysChallenge"],
  });

  useEffect(() => {
    if (challenge) {
      const { challengeName, description, endDate, startDate, notification } =
        challenge;
      methods.reset({
        challengeName,
        startDate,
        endDate,
        description,
        notification,
      });
      setIsEditMode(true);
    }
  }, [challenge, methods]);

  const handleSubmit = async (data) => {
    const challengeData = {
      data: {
        memberId,
        ...data,
        days: days,
        startDate: data.startDate,
        endDate: data.endDate,
      },
    };
    if (isEditMode) challengeData.data.challengeId = challenge._id;

    await Publish({
      mutate: isEditMode ? editChallenge : addChallenge,
      variables: challengeData,
      state: isEditMode ? editState : addState,
      success: `${isEditMode ? "Edited" : "Created"} Challenge Successfully`,
      onSuccess: () => {
        methods.reset(defaultValues);
        setShowForm(false);
        setDays(0);
      },
    });
  };

  return (
    <div>
      <FormProvider {...methods}>
        <div className="row">
          <div className="col-12 mb-30">
            <Textfield label="Challenge Name" name="challengeName" />
          </div>
        </div>
        <ChallengeDate dayState={[days, setDays]} />
        <div className="row mb-10">
          <div className="col-12">
            <Textarea
              name="description"
              label="Description"
              className={styles.textarea}
            />
          </div>
        </div>
        <div className="row mb-20">
          <div className="col-12">
            <Checkbox label="Receive Notifications" name="notification" />
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ButtonComponent
              value="Save"
              type="primary"
              style={{ height: "45px", margin: "auto" }}
              onClick={methods.handleSubmit(handleSubmit)}
            />
          </div>
        </div>
      </FormProvider>
    </div>
  );
};

const ChallengeDate = ({ dayState }) => {
  const hasDaysBeenSet = useRef(false);
  const [days, setDays] = dayState;
  const { control, setValue } = useFormContext();

  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const endDate = useWatch({
    control,
    name: "endDate",
  });

  const endDays = (e) => {
    if (startDate) {
      setValue(
        "endDate",
        format(addDays(new Date(startDate), e.target.value), "yyyy-MM-dd"),
      );
    }
  };

  // Resetting days value
  useEffect(() => {
    if (hasDaysBeenSet.current) return;
    // No End Date selected
    if (!endDate) return setDays(0);
    // End Date < Start Date
    if (isBefore(new Date(endDate), new Date(startDate))) {
      setValue("endDate", "");
      setDays(0);
      return;
    }
    setDays(differenceInDays(new Date(endDate), new Date(startDate)));
    hasDaysBeenSet.current = true;
  }, [endDate, setDays, setValue, startDate]);

  return (
    <div className="row mb-30">
      <div className="col-5">
        <Textfield label="Start Date" name="startDate" type="date" />
      </div>
      <div className="col-2">
        <NumberField
          label="End Day"
          valueState={[days, setDays]}
          onChange={endDays}
        />
      </div>
      <div className="col-5">
        <Textfield label="End Date" name="endDate" type="date" />
      </div>
    </div>
  );
};
export default Settings;
