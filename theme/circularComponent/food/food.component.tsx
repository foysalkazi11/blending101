import { food_color } from "../js/my";
import FoodBox from "../food-box/food-box.component";
import styles from "./food.module.scss";

interface FoodInterface {
  categoryObject: object;
}

function Food({ categoryObject }: FoodInterface) {
  categoryObject = categoryObject || {};
  return (
    <div className={styles.challenge_circle_food}>
      {Object.keys(categoryObject).map((color, key) => {
        // @ts-ignore
        if (categoryObject[color] !== "No Activity") {
          return (
            <FoodBox
              key={key}
              foodColor={color}
              // @ts-ignore
              foodName={categoryObject[color]}
            />
          );
        }
        return;
      })}
    </div>
  );
}

export default Food;
