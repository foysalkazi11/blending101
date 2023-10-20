import { faChevronLeft } from "@fortawesome/pro-regular-svg-icons";
import Checkbox from "component/organisms/Forms/Checkbox.component";
import IconButton from "component/atoms/Button/IconButton.component";
import Textarea from "component/organisms/Forms/Textarea.component";
import Textfield from "component/organisms/Forms/Textfield.component";
import { addDays, differenceInDays, format, subDays } from "date-fns";
import { forwardRef, useState, useMemo, useEffect, useImperativeHandle, Fragment } from "react";
import { useForm, FormProvider, useFormContext, useWatch } from "react-hook-form";

import styles from "./index.module.scss";
import NumberField from "component/organisms/Forms/NumericField.component";
import { UTCDate } from "helpers/Date";
import { Challenge } from "@/app/types/challenge.types";
import useChallengeAdd from "@/challenge/hooks/settings/useAdd";
import useChallengeEdit from "@/challenge/hooks/settings/useEdit";

const defaultValues = {
  challengeName: "",
  startDate: "",
  endDate: "",
  description: "",
  notification: false,
};

interface ChallengeFormProps {
  challenge: Challenge | null;
  setChallenge: Dispatch<Challenge>;
  setShowForm: Dispatch<boolean>;
}

const ChallengeForm = forwardRef((props: ChallengeFormProps, ref) => {
  const { setShowForm, challenge, setChallenge } = props;

  const [days, setDays] = useState(0);
  const [isEditMode, setIsEditMode] = useState(false);

  const methods = useForm({
    defaultValues: useMemo(() => defaultValues, []),
  });

  const addChallenge = useChallengeAdd(days);
  const editChallenge = useChallengeEdit(days, challenge?._id);

  useEffect(() => {
    if (challenge) {
      const { challengeName, description, endDate, startDate, notification, days } = challenge;
      methods.reset({
        challengeName,
        startDate,
        endDate,
        description,
        notification,
      });
      setDays(days);
      setIsEditMode(true);
    }
  }, [challenge, methods]);

  const resetForm = () => {
    methods.reset(defaultValues);
    setShowForm(false);
    setDays(1);
    setChallenge(null);
  };

  const handleSubmit = async (data) => {
    if (isEditMode) await editChallenge(data);
    else await addChallenge(data);
    resetForm();
  };

  useImperativeHandle(ref, () => ({
    onChallengeSave() {
      methods.handleSubmit(handleSubmit)();
    },
    onSettingsClose() {
      resetForm();
    },
  }));

  return (
    <div className={styles.settings__body}>
      <div className={styles.settings__header}>
        <h2 className={styles.settings__title}>
          <IconButton size="medium" variant="white" className="mr-20" fontName={faChevronLeft} onClick={resetForm} />
          {challenge ? "Edit" : "Add"} Challenge
        </h2>
      </div>
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
              <Textarea name="description" label="Description" className={styles.textarea} />
            </div>
          </div>
          <div className="row mb-20">
            <div className="col-12">
              <Checkbox label="Receive Notifications" name="notification" />
            </div>
          </div>
        </FormProvider>
      </div>
    </div>
  );
});

ChallengeForm.displayName = "Challenge Form";

interface ChallengeDateProps {
  dayState: [number, Dispatch<number>];
}
const ChallengeDate = (props: ChallengeDateProps) => {
  const { dayState } = props;
  const [days, setDays] = dayState;

  const { control, setValue } = useFormContext();

  const startDate: string = useWatch({
    control,
    name: "startDate",
  });

  const endDate: string = useWatch({
    control,
    name: "endDate",
  });

  const daysHandler = (e) => {
    const days = +e.target.value;
    if (days === 0) return;

    const hasStartDate = startDate !== "";
    const today = new Date();
    const start: Date = hasStartDate ? UTCDate(startDate) : today;

    const interval = days === 0 ? 0 : days - 1;

    if (!hasStartDate) {
      setValue("startDate", format(today, "yyyy-MM-dd"));
    }
    setValue("endDate", format(addDays(start, interval), "yyyy-MM-dd"));
  };

  const startDateHandler = (e) => {
    const difference = differenceInDays(UTCDate(endDate), UTCDate(e.target.value));
    if (difference < 0) return;
    setValue("startDate", e.target.value);
    if (endDate) {
      // If enddate is given on change of startDate only day needs to be changed even if day already exists
      setDays(difference + 1);
    } else if (days && !endDate) {
      // If only days is given, endDate is not provided
      setValue("endDate", format(addDays(UTCDate(e.target.value), days), "yyyy-MM-dd"));
    }
  };

  const endDateHandler = (e) => {
    const difference = differenceInDays(UTCDate(e.target.value), UTCDate(startDate));
    if (difference < 0) return;
    setValue("endDate", e.target.value);
    if (startDate) {
      // If startDate is given on change of endDate only day needs to be changed even if day already exists
      setDays(difference + 1);
    } else if (days && !startDate) {
      // If only days is given, startDate is not provided
      setValue("startDate", format(subDays(UTCDate(e.target.value), days), "yyyy-MM-dd"));
    }
  };

  return (
    <div className="row mb-30">
      <div className="col-5">
        <Textfield label="Start Date" name="startDate" type="date" value={startDate} onChange={startDateHandler} />
      </div>
      <div className="col-2">
        <NumberField label="End Day" minValue={0} valueState={[days, setDays]} onChange={daysHandler} />
      </div>
      <div className="col-5">
        <Textfield
          label="End Date"
          name="endDate"
          type="date"
          //@ts-ignore
          value={endDate}
          onChange={endDateHandler}
        />
      </div>
    </div>
  );
};

export default ChallengeForm;
