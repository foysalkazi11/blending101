import styles from "./inside.module.scss";
import Profile from "../profile/profile.component";
import { format } from "date-fns";

interface InsideInterface {
  statistics: any;
}
function Inside({ statistics }: InsideInterface) {
  return (
    <div className={styles.challenge_circle_inside_circle}>
      <Profile />
      <div className={styles.challenge_circle_inside_date}>
        {format(new Date(), "EEEE, MMM dd")}
      </div>
      <p className={styles.challenge_circle_day_challenge}>
        {statistics?.challengeName || ""}
      </p>
      <span className={styles.challenge_circle_remaining_day}>
        {/* {remainingDays} &nbsp; Day Remaining */}
        {statistics?.daysRemaining || 0} Day Remaining
      </span>
      <p className={styles.challenge_circle_remaining_percentage}>
        {parseFloat(statistics?.blendScore || 0).toFixed(1)}%
      </p>
      <p className={styles.challenge_circle_remaining_percentage_paragraph}>
        Blend Score
      </p>
    </div>
  );
}

export default Inside;
