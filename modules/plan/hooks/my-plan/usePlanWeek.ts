import { MONTH } from "data/Date";
import { startOfWeek, endOfWeek } from "date-fns";
import { Dispatch, SetStateAction, useMemo, useState } from "react";

const usePlanWeek = () => {
  const [week, setWeek] = useState({
    start: startOfWeek(new Date(), { weekStartsOn: 0 }),
    end: endOfWeek(new Date(), { weekStartsOn: 0 }),
  });

  const weekData = useMemo(() => {
    const monthStart = MONTH[week.start.getMonth()];
    const monthEnd = MONTH[week.end.getMonth()];
    const dayStart = week.start.getDate();
    const dayEnd = week.end.getDate();
    return {
      start: week.start,
      end: week.end,
      monthStart,
      monthEnd,
      dayStart,
      dayEnd,
    };
  }, [week]);

  return [weekData, setWeek] as [
    typeof weekData,
    Dispatch<
      SetStateAction<{
        start: Date;
        end: Date;
      }>
    >,
  ];
};

export default usePlanWeek;
