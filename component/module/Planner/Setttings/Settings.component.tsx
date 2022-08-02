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
import { faChevronLeft, faTimes } from "@fortawesome/pro-solid-svg-icons";

import ButtonComponent from "../../../../theme/button/button.component";
import IconButton from "../../../atoms/Button/IconButton.component";
import Checkbox from "../../../organisms/Forms/Checkbox.component";
import NumberField from "../../../organisms/Forms/NumberField.component";
import Textarea from "../../../organisms/Forms/Textarea.component";
import Textfield from "../../../organisms/Forms/Textfield.component";

import {
  ACTIVATE_CHALLENGE,
  CREATE_CHALLENGE,
  GET_CHALLENGES,
} from "../../../../graphql/Planner";
import { useAppSelector } from "../../../../redux/hooks";
import Publish from "../../../../helpers/Publish";

import styles from "./Settings.module.scss";
import { addDays, differenceInDays, format, isBefore } from "date-fns";
import RadioButton from "../../../organisms/Forms/RadioButton.component";

interface SettingsProps {
  hideSettings: () => void;
}

const Settings = (props: SettingsProps) => {
  const { hideSettings } = props;
  const [showForm, setShowForm] = useState(false);
  const [challenge, setChallenge] = useState<any>(null);

  const editFormHandler = useCallback((data) => {
    console.log("first");
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
          <ChallengeList editFormHandler={editFormHandler} />
        )}
      </div>
    </div>
  );
};

const ChallengeList = ({ editFormHandler }) => {
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const { data } = useQuery(GET_CHALLENGES, {
    variables: {
      memberId,
    },
  });

  const [activateChallenge, activateState] = useMutation(ACTIVATE_CHALLENGE, {
    refetchQueries: ["Get30DaysChallenge", "GetAllChallenges"],
  });

  const [activeId, setActiveId] = useState("");

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
        setActiveId(challengeId);
      },
    });
  };

  return (
    <Fragment>
      <div className="row mb-10 mt-10">
        <div className="col-5">
          <h5>Challenge Name</h5>
        </div>
        <div className="col-3">
          <h5>Start Date</h5>
        </div>
        <div className="col-2">
          <h5>Days</h5>
        </div>
        <div className="col-1">&nbsp;</div>
      </div>
      {data?.getMyChallengeList?.map((challenge) => {
        return (
          <div className="row" key={challenge._id}>
            <div className="col-5">
              <div className={styles.challengeName}>
                <a onClick={() => editFormHandler(challenge)}>
                  {challenge.challengeName}
                </a>
              </div>
            </div>
            <div className="col-3">
              <Textfield
                defaultValue={format(
                  new Date(challenge.startDate),
                  "MMM d, yyyy",
                )}
                disabled
              />
            </div>
            <div className="col-2">
              <Textfield defaultValue={challenge.days} disabled />
            </div>
            <div className="col-1">
              <RadioButton
                selected={
                  activeId === "" && challenge.isActive
                    ? ""
                    : activeId === challenge._id
                    ? ""
                    : "unchecked"
                }
                options={[""]}
                className="ml-50"
                onChange={() => activeHandler(challenge._id)}
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
  startDate: "",
  endDate: "",
  description: "",
  notification: false,
};

const ChallengeForm = ({ setShowForm, challenge }) => {
  const days = useRef(0);
  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });
  const memberId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [addChallenge, addState] = useMutation(CREATE_CHALLENGE);

  useEffect(() => {
    if (challenge) {
      const { challengeName, description, endDate, startDate, notification } =
        challenge;
      methods.reset({
        challengeName,
        startDate: format(new Date(startDate), "yyyy-MM-dd"),
        endDate: format(new Date(endDate), "yyyy-MM-dd"),
        description,
        notification,
      });
    }
  }, [challenge, methods]);

  const handleSubmit = async (data) => {
    await Publish({
      mutate: addChallenge,
      variables: {
        data: {
          memberId,
          ...data,
          days: days.current,
          startDate: new Date(data.startDate).toISOString(),
          endDate: new Date(data.endDate).toISOString(),
        },
      },
      state: addState,
      success: "Created Challenge Successfully",
      onSuccess: () => {
        methods.reset(defaultValues);
        setShowForm(false);
        days.current = 0;
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
        <ChallengeDate />
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

const ChallengeDate = () => {
  const [days, setDays] = useState(0);
  const { control, setValue } = useFormContext();

  const startDate = useWatch({
    control,
    name: "startDate",
    defaultValue: format(new Date(), "yyyy-MM-dd"),
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
    if (endDate && !isBefore(new Date(endDate), new Date(startDate))) {
      setDays(differenceInDays(new Date(endDate), new Date(startDate)));
    }
  }, [endDate, startDate]);

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
