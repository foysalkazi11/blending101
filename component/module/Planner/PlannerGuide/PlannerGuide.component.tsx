import React from "react";
import { HiLightBulb } from "react-icons/hi";
import CustomCards from "../../../../theme/card/customCard/customCards.component";
import FriendInvitePoster from "../../../../theme/friendInvitePoster/friendInvitePoster.component";
import HorizontalLine from "../../../../theme/horizontalLine/horizontalLine.component";
import IconHeading from "../../../../theme/iconHeading/iconHeading.component";
import SequenceList from "../../../../theme/sequenceList/sequenceList.component";

import styles from "./PlannerGuide.module.scss";

const PlannerGuide = () => {
  return (
    <div className={styles.mainContainer}>
      <IconHeading icon={<HiLightBulb />} title={"Planner Guide"} />

      <div>
        <FriendInvitePoster
          tagline="Invite a friend and Win"
          buttonFunc={() => {}}
        />
      </div>
      <div className={styles.mainContainer__rightCardTray}>
        <div>
          <SequenceList listTitle="Top Tips" sequenceList={topPlannerTips} />
        </div>
        <div className={styles.mainContainer__horizontalLine}>
          <HorizontalLine lineColor="grey" width="60%" margin="20px 0px" />
        </div>

        <div>
          {topPlannerArticles?.map(({ title, content, imageUrl }) => (
            <CustomCards
              key={title}
              cardTitle={title}
              cardSummaryText={content}
              imageUrl={imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlannerGuide;

export const topPlannerTips = [
  "Meal Planning 101",
  "How we use AI to personalize plans",
  "Using the digital pantry to reduce waste",
  "Setting up grocery delivery services",
  "Replaying a blend plan week",
];
export const topPlannerArticles = [
  {
    title: "Meal Planning 101",
    content:
      "if you have an unbreakable string such as a very long word, by default it will overflow any container that is too small for it in the inline direction. We can see this happening in the example below: the long word is extending past the boundary of the box it is contain",
    imageUrl: undefined,
  },
  {
    title: "How we use AI to personalize plans",
    content:
      "if you have an unbreakable string such as a very long word, by default it will overflow any container that is too small for it in the inline direction. We can see this happening in the example below: the long word is extending past the boundary of the box it is contain",
    imageUrl: undefined,
  },
  {
    title: "Using the digital pantry to reduce waste",
    content:
      "if you have an unbreakable string such as a very long word, by default it will overflow any container that is too small for it in the inline direction. We can see this happening in the example below: the long word is extending past the boundary of the box it is contain",
    imageUrl: undefined,
  },
  {
    title: "Setting up grocery delivery services",
    content:
      "if you have an unbreakable string such as a very long word, by default it will overflow any container that is too small for it in the inline direction. We can see this happening in the example below: the long word is extending past the boundary of the box it is contain",
    imageUrl: undefined,
  },
  {
    title: "Replaying a blend plan week",
    content:
      "if you have an unbreakable string such as a very long word, by default it will overflow any container that is too small for it in the inline direction. We can see this happening in the example below: the long word is extending past the boundary of the box it is contain",
    imageUrl: undefined,
  },
];

export const topChallengeTips = [];
