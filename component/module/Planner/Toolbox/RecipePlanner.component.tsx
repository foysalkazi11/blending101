import React, { useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import MealCalendarDatePlan from "../../../../theme/mealCalenderDatePlan/mealCalendarDatePlan.component";
import SeperatedButtonTray from "./recipesButtonTray/seperatedButtonTray.component";

import styles from "./RecipePlanner.module.scss";
import SharedHeader from "./SharedHeader.component";
import MealPlanner from "./MealPlanner.component";

const RecipePlanner = (props) => {
  const { plannerList } = props;
  return (
    <div className={styles.mainContainer__contentDiv__innerDiv}>
      <div className={styles.mainContainer__contentDiv__innerDiv__left}>
        <RecipeMealPlan recipeList={plannerList} />
      </div>
      <div className={styles.mainContainer__contentDiv__innerDiv__right}>
        <RecipeMealPlan recipeList={plannerList} />
      </div>
    </div>
  );
};

interface RecipeMealHeader {
  text?: string;
}
const RecipeMealHeader = ({ text }: RecipeMealHeader) => {
  text = text || "";
  return (
    <div className={styles.header}>
      <AiOutlineLeft className={styles.header__icon} />
      <h4 className={styles.header__text}>{text}</h4>
      <AiOutlineRight className={styles.header__icon} />
    </div>
  );
};

interface RecipeMealPlanInterface {
  recipeList: Array<object>;
}
const RecipeMealPlan = ({ recipeList }: RecipeMealPlanInterface) => {
  const [toggleOptionCard, setToggleOptionCard] = useState({});

  return (
    <div>
      <SharedHeader title="Recipes" optionTray={<SeperatedButtonTray />} />

      <MealPlanner
        headerComponent={<RecipeMealHeader text="Meal Plan, Oct 5 - Oct 11" />}
      >
        {/* @ts-ignore */}
        {recipeList?.map(({ day, date, recipeList }, index) => (
          <MealCalendarDatePlan
            key={`${day} ${index}`}
            indexValue={index}
            day={day}
            date={date}
            recipeList={recipeList}
            setToggleOptionCard={setToggleOptionCard}
            toggleOptionCard={toggleOptionCard}
          />
        ))}
      </MealPlanner>
    </div>
  );
};

export { RecipePlanner, RecipeMealPlan };
