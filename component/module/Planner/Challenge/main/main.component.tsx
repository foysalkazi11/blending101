import SingleDate from "../single-date/single-date.component";
import Inside from "../inside/inside.component";
import styles from "./main.module.scss";

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
                date={activity?.formattedDate}
                dayName={activity?.dayName}
                day={activity?.date}
                categories={categories}
                disabled={activity?.disabled}
              />
            );
          })}
        <div className={styles.challenge_circle_semi_circle} />
      </div>
    </div>
  );
}

export default Main;
