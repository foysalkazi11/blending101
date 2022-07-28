import styles from "./inside.module.scss";
import Profile from "../profile/profile.component";

interface InsideInterface {
  dateList: any;
  profileImage?: string;
  numOfDaysChallenge?: number;
  blendValue: number;
  totalBlendValue: number;
}
function Inside({
  dateList,
  profileImage,
  numOfDaysChallenge,
  blendValue,
  totalBlendValue,
}: InsideInterface) {
  const week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const year = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let dt = new Date();
  numOfDaysChallenge = numOfDaysChallenge || 30;
  blendValue = blendValue || 0;
  totalBlendValue = totalBlendValue || 1;

  const remainingDays = dateList.reduce(
    (totalCount: number, value: string | any[]) => {
      if (value.length === 3) {
        return (totalCount += 1);
      }
      return (totalCount += 0);
    },
    0,
  );

  const calculatedPercentage = ((blendValue / totalBlendValue) * 100).toFixed(
    1,
  );

  return (
    <div className={styles.challenge_circle_inside_circle}>
      <Profile />
      <div className={styles.challenge_circle_inside_date}>
        {week[dt.getDay()]}, {year[dt.getMonth()]} {dt.getDate()}
      </div>
      <p className={styles.challenge_circle_day_challenge}>
        {" "}
        {numOfDaysChallenge} Day Challenge
      </p>
      <span className={styles.challenge_circle_remaining_day}>
        {/* {remainingDays} &nbsp; Day Remaining */}
        {remainingDays} Day Remaining
      </span>
      <p className={styles.challenge_circle_remaining_percentage}>
        {calculatedPercentage}%
      </p>
      <p className={styles.challenge_circle_remaining_percentage_paragraph}>
        Blend Score
      </p>
    </div>
  );
}

export default Inside;
