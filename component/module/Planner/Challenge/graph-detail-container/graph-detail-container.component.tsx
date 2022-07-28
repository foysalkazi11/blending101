import { daysInMonth } from "../js/my";
import styles from "./graph-detail-container.module.scss";
// @ts-ignore
import HSBar from "react-horizontal-stacked-bar-chart";
import { RECIPE_CATEGORY_COLOR } from "../../../../../data/Recipe";
import { useMemo } from "react";

interface GraphDetailContainerInterface {
  categoryObject: object;
  activityDataList?: any[];
  startDate: number;
  startMonth: string;
  startYear?: number;
  activities?: any[];
}
function GraphDetailContainer({
  categoryObject,
  activityDataList,
  startDate,
  startMonth,
  startYear,
  activities,
}: GraphDetailContainerInterface) {
  let date = new Date();
  date = new Date(date.getTime() - 1000 * 60 * 60 * 24 * 6);
  startDate = startDate || 0;
  startMonth = startMonth || "none";
  startYear = startYear || 0;

  const data = daysInMonth(
    activityDataList,
    startDate,
    startMonth,
    startYear,
  ).filter((val) => {
    if (
      // @ts-ignore
      date.getDate() === val[0].getDate() &&
      // @ts-ignore
      date.getMonth() === val[0].getMonth() &&
      // @ts-ignore
      date.getFullYear() === val[0].getFullYear() &&
      val[3]
    ) {
      date = new Date(date.getTime() + 1000 * 60 * 60 * 24);
      return val;
    }
    return false;
  });

  const main_data = data
    .map((main) =>
      // @ts-ignore
      main[3].map((value: any) =>
        Object.keys(categoryObject).find(
          // @ts-ignore
          (key) => categoryObject[key] === value,
        ),
      ),
    )
    .flat()
    .filter((remove) => remove !== "#D8D8D8");

  const output = Object.values(
    main_data.reduce((obj, color) => {
      if (obj[color] === undefined)
        obj[color] = {
          color: color,
          value: 1,
          // @ts-ignore
          description: categoryObject[color],
        };
      else obj[color].value++;
      return obj;
    }, {}),
  );

  const chartData = useMemo(() => {
    const categories = {};

    Object.keys(RECIPE_CATEGORY_COLOR).forEach((category) => {
      categories[category] = {
        name: category,
        description: category,
        color: RECIPE_CATEGORY_COLOR[category],
        value: 0,
      };
    });

    activities?.forEach((activity) => {
      activity?.posts?.forEach((post) => {
        if (post?.recipeBlendCategory?.name) {
          categories[post.recipeBlendCategory?.name].value++;
        }
      });
    });

    return Object.values(categories).filter(
      (category: any) => category?.value > 0,
    );
  }, [activities]);

  console.log(chartData);

  return (
    <div className={styles.challenge_circle_graph_data}>
      <div className={styles.challenge_circle_streak}>
        <p className={styles.challenge_circle_no_of_days}>7 Days</p>
        <p className={styles.challenge_circle_paragraph}>Current Streak</p>
      </div>
      <div className={styles.challenge_circle_graph_box}>
        <HSBar
          height={"40px"}
          id={styles.challenge_circle_new_id}
          data={chartData}
        />
      </div>
      <div className={styles.challenge_circle_streak}>
        <p className={styles.challenge_circle_no_of_days}>7 Days</p>
        <p className={styles.challenge_circle_paragraph}>Longest Streak</p>
      </div>
    </div>
  );
}

export default GraphDetailContainer;
