import React, {
  Fragment,
  useCallback,
  useEffect,
  useMemo,
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
import NumberField from "../../organisms/Forms/NumberField.component";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

import {
  ACTIVATE_CHALLENGE,
  CREATE_CHALLENGE,
  DELETE_CHALLENGE,
  EDIT_CHALLENGE,
  GET_CHALLENGES,
} from "../../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import Publish from "../../../helpers/Publish";

import styles from "./Settings.module.scss";
import { addDays, differenceInDays, format, isBefore, isPast } from "date-fns";
import RadioButton from "../../organisms/Forms/RadioButton.component";
import { getDateISO } from "../../../helpers/Date";
import { setChallengeDate } from "../../../redux/slices/Challenge.slice";
import Invite from "../../organisms/Share/Invite.component";

interface SettingsProps {
  hideSettings: () => void;
}

const Settings = (props: SettingsProps) => {
  const { hideSettings } = props;
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
            editFormHandler={editFormHandler}
            hideSettings={hideSettings}
          />
        )}
      </div>
    </div>
  );
};

const ChallengeList = ({ editFormHandler, hideSettings }) => {
  const [show, setShow] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [challengeInfo, setChallengeInfo] = useState({});

  const dispatch = useAppDispatch();
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const { data } = useQuery(GET_CHALLENGES, {
    variables: {
      memberId,
    },
  });

  const [activateChallenge, activateState] = useMutation(ACTIVATE_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge", "GetAllChallenges"],
  });
  const [deleteChallenge, deleteState] = useMutation(DELETE_CHALLENGE, {
    refetchQueries: ["GetAllChallenges"],
  });

  const activeHandler = async (challengeId) => {
    await Publish({
      mutate: activateChallenge,
      variables: {
        memberId,
        challengeId,
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
      <Invite show={show} setShow={setShow} {...challengeInfo} />
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
      {data?.getMyChallengeList?.map((challenge) => {
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
    refetchQueries: ["GetAllChallenges"],
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
        startDate: getDateISO(new Date(data.startDate)).toISOString(),
        endDate: getDateISO(new Date(data.endDate)).toISOString(),
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
    setDays(e.target.value);
    if (startDate) {
      setValue(
        "endDate",
        format(addDays(new Date(startDate), e.target.value), "yyyy-MM-dd"),
      );
    }
  };

  useEffect(() => {
    if (!endDate) return setDays(0);
    if (isBefore(new Date(endDate), new Date(startDate))) {
      setValue("endDate", "");
      setDays(0);
      return;
    }
    setDays(differenceInDays(new Date(endDate), new Date(startDate)) + 1);
  }, [endDate, setDays, setValue, startDate]);

  console.log(startDate);
  return (
    <div className="row mb-30">
      <div className="col-5">
        <Textfield label="Start Date" name="startDate" type="date" />
      </div>
      <div className="col-2">
        <NumberField label="End Day" value={days} onChange={endDays} />
      </div>
      <div className="col-5">
        <Textfield label="End Date" name="endDate" type="date" />
      </div>
    </div>
  );
};
export default Settings;
