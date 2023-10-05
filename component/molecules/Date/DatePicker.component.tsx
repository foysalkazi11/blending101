import React, { forwardRef } from "react";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface DatePickerProps {
  children?: React.ReactNode;
  selected?: Date;
  minDate?: Date;
  maxDate?: Date;
  onChange: (date: Date) => void;
}
const DatePicker = (props: DatePickerProps) => {
  const { children, ...datePickerProps } = props;
  return (
    <ReactDatePicker
      // portalId="root-portal"
      {...datePickerProps}
      customInput={<DatePickerButton>{children}</DatePickerButton>}
    />
  );
};

const DatePickerButton = forwardRef(({ children, onClick }: any, ref: any) => (
  <span onClick={onClick} ref={ref}>
    {children}
  </span>
));
DatePickerButton.displayName = "DatePickerButton";

export default DatePicker;
