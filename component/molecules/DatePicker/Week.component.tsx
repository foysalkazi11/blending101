import { faCalendarWeek } from "@fortawesome/pro-light-svg-icons";
import { isSameWeek, endOfWeek, startOfWeek } from "date-fns";
import React, { forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import Icon from "../../atoms/Icon/Icon.component";
import "react-datepicker/dist/react-datepicker.css";

interface WeekPickerProps {
  element: React.ReactNode;
  week: {
    start: Date;
    end: Date;
  };
  onWeekChange: (startDate: Date, endDate: Date) => void;
}

const WeekPicker = (props: WeekPickerProps) => {
  const { element, week, onWeekChange } = props;

  return (
    <DatePicker
      // fixedHeight
      // inline
      dayClassName={(date: Date) =>
        isSameWeek(date, week?.start || new Date())
          ? "react-datepicker__day--selected"
          : ""
      }
      closeOnScroll={(e) => e.target === document}
      selected={new Date()}
      onChange={(date) => onWeekChange(startOfWeek(date), endOfWeek(date))}
      customInput={element}
    />
  );
};

export default WeekPicker;
