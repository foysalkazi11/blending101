import SingleDate from "../single-date/single-date.component";
import Inside from "../inside/inside.component";
import styles from "./main.module.scss";
import { daysInMonth } from "../js/my";
import { format } from "date-fns";

export function getCurrentDate(t: Date) {
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}/${month}/${year}`;
}

interface MainInterface {
  activities: any[];
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
  activities,
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
  // console.log(afterAddingDateList);
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
        {activities &&
          activities.length !== 0 &&
          activities.map((activity, key) => {
            const categories = activity?.posts.map(
              (post) => post?.recipeBlendCategory?.name || "",
            );
            console.log(activities.length);
            if (key > 30) return <div></div>;
            return (
              <SingleDate
                key={key}
                date={activity?.assignDate}
                categories={categories}
              />
            );
          })}
        <div className={styles.challenge_circle_semi_circle} />
      </div>
    </div>
  );
}

export default Main;
