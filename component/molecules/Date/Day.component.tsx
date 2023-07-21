import { faCalendar } from "@fortawesome/pro-regular-svg-icons";
import { isToday, isYesterday, isTomorrow, format, addDays } from "date-fns";
import React, { forwardRef, useMemo } from "react";
import ReactDatePicker from "react-datepicker";
import { UTCDate } from "../../../helpers/Date";
import { useAppDispatch } from "../../../redux/hooks";
import { setPostDate } from "../../../redux/slices/Challenge.slice";
import Icon from "../../atoms/Icon/Icon.component";
import Textfield from "../../organisms/Forms/Textfield.component";

import styles from "./Day.module.scss";

const DatePickerButton = forwardRef(({ value, onClick }: any, ref: any) => {
  const label = useMemo(() => {
    const date = UTCDate(value, "/");
    if (isToday(date)) return "Today";
    else if (isYesterday(date)) return "Yesterday";
    else if (isTomorrow(date)) return "Tomorrow";
    else return format(date, "MMMM do, yyyy");
  }, [value]);

  return (
    <div className={styles.date} onClick={onClick}>
      <Textfield ref={ref} required value={label} disabled />
      <Icon fontName={faCalendar} size={"2rem"} className={styles.date__icon} />
    </div>
  );
});
DatePickerButton.displayName = "DatePickerButton";

interface DateSelectorProps {
  activeDate: string;
  startDate: string;
  endDate: string;
}
const DayPicker = (props: DateSelectorProps) => {
  const dispatch = useAppDispatch();
  const { activeDate, startDate } = props;

  const dateHandler = (date) => {
    dispatch(setPostDate(format(date, "yyyy-MM-dd")));
  };

  return (
    <ReactDatePicker
      selected={activeDate ? UTCDate(activeDate) : new Date()}
      minDate={startDate ? UTCDate(startDate) : new Date()}
      maxDate={addDays(new Date(), 1)}
      onChange={dateHandler}
      fixedHeight
      customInput={<DatePickerButton />}
    />
  );
};

export default DayPicker;
