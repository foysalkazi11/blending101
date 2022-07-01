const week = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
export const food_color = {
  "#9AC740": "Whole Food",
  "#FFB440": "Refreshing",
  "#FF5140": "Smoothie",
  "#FFE740": "Soup",
  "#AF895F": "Tea",
  "#9085D9": "Frozen Treat",
  "#D8D8D8": "No Activity",
};

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

export const daysInMonth = (
  activityDataList,
  startDate,
  startMonth,
  startYear
) => {
  let dt =
    !startDate || !startMonth || !startYear
      ? new Date()
      : new Date(`${startDate}-${startMonth}-${startYear}`);
  let dt_check =
    !startDate || !startMonth || !startYear
      ? new Date()
      : new Date(`${startDate}-${startMonth}-${startYear}`);

  let today = new Date();

  dt_check = new Date(dt_check.getTime() + 1000 * 60 * 60 * 24 * 29);

  const days = [];

  if (dt_check.getTime() <= today.getTime()) {
    for (
      let i = 0;
      dt.getTime() <=
      new Date(today.getTime() + 1000 * 60 * 60 * 24 * 1);
      i++
    ) {
      if (dt.getTime() <= today.getTime()) {
        days.push([
          dt,
          dt.getDate(),
          week[dt.getDay()],
          activityDataList[i],
        ]);
      } else {
        days.push([dt, dt.getDate(), week[dt.getDay()]]);
      }
      dt = new Date(dt.getTime() + 1000 * 60 * 60 * 24);
    }

    return days.slice(-30);
  } else {
    for (let i = 0; i <= 29; i++) {
      if (dt.getTime() <= today.getTime()) {
        days.push([
          dt,
          dt.getDate(),
          week[dt.getDay()],
          activityDataList[i],
        ]);
      } else {
        days.push([dt, dt.getDate(), week[dt.getDay()]]);
      }
      dt = new Date(dt.getTime() + 1000 * 60 * 60 * 24);
    }

    return days;
  }
};
