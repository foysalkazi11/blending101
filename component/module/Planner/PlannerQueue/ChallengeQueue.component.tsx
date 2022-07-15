import React from "react";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";

import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SplitImageCard from "../../../../theme/card/splitImageCard/splitImageCard.component";
import ViewDataCard from "../../../../theme/dataCard/viewDataCard.component";

import styles from "./ChallengeQueue.module.scss";
import { useAppSelector } from "../../../../redux/hooks";
import { format } from "date-fns";

const plannerIcon = (
  <div className={styles.plannerIcon}>
    <Image src={"/images/planner.svg"} alt="" layout="fill" objectFit="cover" />
  </div>
);

const ChallengePanel = () => {
  const { date, notes, recipes } = useAppSelector(
    (state) => state.planner.challenge,
  );
  return (
    <>
      <IconHeading
        icon={plannerIcon}
        title={"Planner Queue"}
        iconStyle={{ fontSize: "18px" }}
      />
      <div className={styles.challengePostCardContainer}>
        <div className={styles.challengePostCardContainer__heading}>
          <GoPrimitiveDot
            className={styles.challengePostCardContainer__heading__dot}
          />
          <h5>{format(date ? new Date(date) : new Date(), "EEEE, MMMM d")}</h5>
        </div>
        <SplitImageCard />
        <h5 className={styles.headingText}>My Notes</h5>
        <div className={styles.notesText}>
          {notes.map((note) => (
            <h5 key={note} className={styles.notesText__heading}>
              {note}
            </h5>
          ))}
        </div>
        <h5 className={styles.headingText}>My Recipe</h5>
        <div className={styles.myRecipeDiv}>
          {recipes.map((recipe) => (
            <ViewDataCard
              key={recipe.id}
              title={recipe.name}
              category={recipe.category}
              companyName={"blending"}
              rankingScore={4}
              commentNumber={20}
              calorieValue={recipe.calorie}
              nutriScore={recipe.score}
              ingredientList={recipe.ingredients}
              showCalender
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default ChallengePanel;
