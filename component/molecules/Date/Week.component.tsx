import React from "react";
import DatePicker from "react-datepicker";
import { isSameWeek, endOfWeek, startOfWeek } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";
import { Portal } from "react-overlays";

const CalendarContainer = ({ children }) => {
  const el = document.getElementById("calendar-portal");

  return <Portal container={el}>{children}</Portal>;
};

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
    <div id="week-picker">
      <DatePicker
        portalId="root-portal"
        dayClassName={(date: Date) =>
          isSameWeek(date, week?.start || new Date()) ? "react-datepicker__day--selected" : ""
        }
        closeOnScroll={(e) => e.target === document}
        selected={new Date()}
        onChange={(date) => onWeekChange(startOfWeek(date), endOfWeek(date))}
        customInput={element}
        // popperContainer={CalendarContainer}
      />
    </div>
  );
};

export default WeekPicker;
