import React from "react";
import Image from "next/image";
import { GoPrimitiveDot } from "react-icons/go";

import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SplitImageCard from "../../../../theme/card/splitImageCard/splitImageCard.component";
import ViewDataCard from "../../../../theme/dataCard/viewDataCard.component";

import styles from "./ChallengeQueue.module.scss";

const plannerIcon = (
  <div className={styles.plannerIcon}>
    <Image src={"/images/planner.svg"} alt="" layout="fill" objectFit="cover" />
  </div>
);

const ChallengePanel = () => {
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
          <h5>Thursday, March 21</h5>
        </div>
        <SplitImageCard />
        <h5 className={styles.headingText}>My Notes</h5>
        <div className={styles.notesText}>
          <h5 className={styles.notesText__heading}>asdfasd</h5>
          <h5 className={styles.notesText__content}>
            asdfas asdfasdf asfd asdfasdf asfasdf asdf asfasdf asfdasdf asdfas
            fd
          </h5>
        </div>
        <h5 className={styles.headingText}>My Recipe</h5>
        <div className={styles.myRecipeDiv}>
          <ViewDataCard
            title={"Smoothie"}
            category={"wheat"}
            companyName={"blending"}
            rankingScore={4}
            commentNumber={20}
            calorieValue={90}
            nutriScore={900}
            ingredientList={[
              { ingredientName: "Turmeric" },
              { ingredientName: "generic" },
              { ingredientName: "lemon" },
              { ingredientName: "honey" },
              { ingredientName: "black pepper" },
              { ingredientName: "turmeric " },
              { ingredientName: "ginger" },
              { ingredientName: "honey" },
              { ingredientName: "lemon" },
            ]}
            showCalender
          />
        </div>
      </div>
    </>
  );
};

export default ChallengePanel;
