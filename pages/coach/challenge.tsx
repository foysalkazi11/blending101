import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import {
  faGear,
  faPlusCircle,
  faToolbox,
} from "@fortawesome/pro-light-svg-icons";
import { isWithinInterval } from "date-fns";

import RXPanel from "../../component/templates/Panel/RXFacts/RXPanel.component";
import Statistics from "../../component/module/Challenge/Statistics.component";
import ChallengeQueue from "../../component/module/Challenge/Post.component";
import PlannerQueue from "../../component/module/Planner/Queue.component";
import UploadCard from "../../component/module/Challenge/Upload.component";
import Challenge from "../../component/module/Challenge/Achievement/index.component";
import Settings from "../../component/module/Challenge/Settings.component";

import AContainer from "../../containers/A.container";
import IconHeading from "../../theme/iconHeading/iconHeading.component";

import { GET_30DAYS_CHALLENGE } from "../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChallengeInterval,
  setShowPostForm,
} from "../../redux/slices/Challenge.slice";

import styles from "../../styles/pages/planner.module.scss";
import Icon from "../../component/atoms/Icon/Icon.component";

import { theme } from "../../configs/themes";

const ChallengePage = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [showGroceryTray] = useState(true);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const {
    activeDate,
    startDate,
    endDate,
    showPostForm: showUpload,
  } = useAppSelector((state) => state.challenge);

  const [getChallenges, { data }] = useLazyQuery(GET_30DAYS_CHALLENGE);

  useEffect(() => {
    if (
      userId === "" ||
      (![activeDate, startDate, endDate].includes("") &&
        isWithinInterval(new Date(activeDate), {
          start: new Date(startDate),
          end: new Date(endDate),
        }))
    )
      return;
    getChallenges({
      variables: {
        userId,
        startDate: activeDate,
      },
    });
  }, [activeDate, endDate, getChallenges, startDate, userId]);

  useEffect(() => {
    const challenges = data?.getMyThirtyDaysChallenge?.challenge || [];
    if (challenges.length === 0) return;

    dispatch(
      setChallengeInterval({
        startDate: challenges[0]?.date,
        endDate: challenges[challenges.length - 1]?.date,
      }),
    );
  }, [data, dispatch]);

  let toolbox = null;
  if (showUpload) toolbox = <UploadCard />;
  else if (showSettings)
    toolbox = <Settings hideSettings={() => setShowSettings(false)} />;

  return (
    <AContainer
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
    >
      <RXPanel />
      <div className={styles.planner}>
        <div className={styles.planner__pageTitle}>BLENDA CHALLENGE</div>
        <div className="row">
          <div className="col-3">
            {showUpload ? (
              <PlannerQueue isUpload={showUpload} />
            ) : (
              <ChallengeQueue
                challenges={data?.getMyThirtyDaysChallenge?.challenge}
              />
            )}
          </div>
          <div className="col-6">
            <div className={styles.headingDiv}>
              <IconHeading title="Challenge" icon={faToolbox} />
              <div className="flex ai-center">
                <div
                  className={styles.uploadDiv}
                  onClick={() => {
                    dispatch(setShowPostForm(false));
                    setShowSettings(true);
                  }}
                >
                  <Icon
                    fontName={faGear}
                    size="1.6rem"
                    color={theme.color.primary}
                  />
                  <span>Settings</span>
                </div>
                <div
                  className={styles.uploadDiv}
                  onClick={() => {
                    dispatch(setShowPostForm(true));
                    setShowSettings(false);
                  }}
                >
                  <Icon
                    fontName={faPlusCircle}
                    size="1.6rem"
                    color={theme.color.primary}
                  />
                  <span>Upload</span>
                </div>
              </div>
            </div>
            <div className={styles.toolbox}>
              {toolbox && toolbox !== null ? (
                toolbox
              ) : (
                <Challenge
                  activities={data?.getMyThirtyDaysChallenge?.challenge}
                  statistics={data?.getMyThirtyDaysChallenge?.challengeInfo}
                />
              )}
            </div>
          </div>
          <div className="col-3">
            <Statistics />
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default ChallengePage;
