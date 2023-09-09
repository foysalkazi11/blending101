import { UserRecipe } from "@/recipe/recipe.types";
import { faPlus } from "@fortawesome/pro-regular-svg-icons";
import Icon from "component/atoms/Icon/Icon.component";
import { useState } from "react";

import styles from "./DayPicker.module.scss";

interface DayPickerProps {
  _id?: string;
  recipe?: UserRecipe;
  addRecipeToPlan: (day: any, recipe: any) => void;
}

const DayPicker = (props: DayPickerProps) => {
  const { _id, recipe, addRecipeToPlan } = props;
  const [shownDayId, setShownDayId] = useState("");
  return (
    <div className={styles.daypicker}>
      <div className={styles.daypicker__field} onClick={() => setShownDayId(shownDayId === _id ? "" : _id)}>
        <Icon fontName={faPlus} size={15} />
      </div>
      {shownDayId === _id && (
        <ul className={styles.daypicker__options}>
          {[1, 2, 3, 4, 5, 6, 7].map((day) => (
            <li
              key={day}
              onClick={() => {
                addRecipeToPlan(day, recipe);
                setShownDayId("");
              }}
            >
              {day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DayPicker;
