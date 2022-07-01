import styles from "./food-box.module.scss";

function FoodBox({ foodColor, foodName }:any) {
  return (
    <div className={styles.challenge_circle_food_box}>
      <div
        className={styles.challenge_circle_food_color_represent}
        style={{ backgroundColor: foodColor }}
      ></div>
      <p className={styles.challenge_circle_food_name}>{foodName}</p>
    </div>
  );
}

export default FoodBox;
