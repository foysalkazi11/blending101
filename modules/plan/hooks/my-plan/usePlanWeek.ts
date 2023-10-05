import { MONTH } from "data/Date";
import { startOfWeek, endOfWeek } from "date-fns";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";

type Query = { start: string; end: string; alert: "true" | "false" };

export type IWeek = {
  start: Date;
  end: Date;
  monthStart?: string;
  monthEnd?: string;
  dayStart?: number;
  dayEnd?: number;
  url?: Query;
  isWeekFromUrl?: boolean;
};

const usePlanWeek = () => {
  const router = useRouter();
  const query = router.query as unknown as Query;

  const [week, setWeek] = useState({
    start: startOfWeek(new Date(), { weekStartsOn: 0 }),
    end: endOfWeek(new Date(), { weekStartsOn: 0 }),
  });

  const [isWeekFromUrl, setIsWeekFromUrl] = useState(false);

  // PICKING WEEKINFO FROM THE URL IF USERS WANT TO ADD EXISTING PLAN TO MY PLAN
  useEffect(() => {
    if (query.start && query.end) {
      setWeek({
        start: new Date(query.start),
        end: new Date(query.end),
      });
      setIsWeekFromUrl(true);
    }
  }, [query.alert, query.end, query.start]);

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
      url: query,
      isWeekFromUrl,
    };
  }, [isWeekFromUrl, query, week.end, week.start]);

  return [weekData, setWeek] as [
    IWeek,
    Dispatch<
      SetStateAction<{
        start: Date;
        end: Date;
      }>
    >,
  ];
};

export default usePlanWeek;
