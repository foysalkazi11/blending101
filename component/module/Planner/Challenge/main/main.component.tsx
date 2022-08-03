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
  statistics: any;
  activities: any[];
}

function Main({ activities, statistics }: MainInterface) {
  return (
    <div className={styles.challenge_circle_main_circle_outer}>
      <div className={styles.challenge_circle_main_circle}>
        <Inside statistics={statistics} />
        {activities &&
          activities.length !== 0 &&
          activities.map((activity, key) => {
            const categories = activity?.posts.map(
              (post) => post?.recipeBlendCategory?.name || "",
            );
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

export const fake_data = [
  ["Whole Food", "Smoothie"],
  ["Smoothie"],
  ["No Activity"],
  ["Tea"],
  ["Tea", "Soup", "Frozen Treat", "Smoothie"],
  ["Frozen Treat"],
  ["No Activity"],
  ["Smoothie"],
  ["Frozen Treat"],
  ["Smoothie"],
  ["No Activity"],
  ["Smoothie"],
  ["No Activity"],
  ["No Activity"],
  ["Smoothie", "Tea"],
  ["No Activity"],
  ["No Activity"],
  ["No Activity"],
  ["Frozen Treat"],
  ["Smoothie", "Tea"],
  ["No Activity"],
  ["No Activity"],
  ["No Activity"],
  ["Smoothie", "Tea"],
  ["Frozen Treat", "Tea", "Whole Food"],
  ["Frozen Treat", "Tea"],
  ["Frozen Treat", "Tea", "Whole Food"],
  ["Tea", "Soup"],
  ["No Activity"],
  ["Frozen Treat", "Tea"],
  ["Smoothie"],
  ["No Activity"],
  ["No Activity"],
  ["Frozen Treat", "Tea", "Whole Food"],
  ["No Activity"],
  ["No Activity"],
  ["No Activity"],
];
