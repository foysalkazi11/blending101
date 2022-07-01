import SingleDate from "../single-date/single-date.component";
import Inside from "../inside/inside.component";
import styles from "./main.module.scss";
import { daysInMonth } from "../js/my";

export function getCurrentDate(t: Date) {
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}/${month}/${year}`;
}

interface MainInterface {
  activityDataList?: any[];
  profileImage?: string;
  numOfDaysChallenge?: number;
  blendValue: number;
  totalBlendValue: number;
  startDate: number;
  startMonth: string;
  startYear?: number;
}

function Main({
  activityDataList,
  profileImage,
  numOfDaysChallenge,
  blendValue,
  totalBlendValue,
  startDate,
  startMonth,
  startYear,
}: MainInterface) {
  startDate = startDate || 0;
  startMonth = startMonth || "none";
  startYear = startYear || 0;
  const dateList = daysInMonth(
    activityDataList,
    startDate,
    startMonth,
    startYear,
  );
  const afterAddingDateList = [...dateList, []];
  const today: Date = new Date();
  const todayDate = getCurrentDate(today);

  return (
    <div className={styles.challenge_circle_main_circle_outer}>
      <div className={styles.challenge_circle_main_circle}>
        <Inside
          dateList={dateList}
          profileImage={profileImage}
          numOfDaysChallenge={numOfDaysChallenge}
          blendValue={blendValue}
          totalBlendValue={totalBlendValue}
        />
        {afterAddingDateList.map((date, key) => {
          if (!date[0]) {
            return (
              <div key={key} className={styles.challenge_circle_semi_circle} />
            );
          }

          // @ts-ignore
          return (
            <SingleDate
              selectToday={todayDate === getCurrentDate(date[0]) ? true : false}
              key={key}
              date={date}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Main;
