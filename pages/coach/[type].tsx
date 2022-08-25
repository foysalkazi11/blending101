import React, { Fragment, useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { faToolbox } from "@fortawesome/pro-light-svg-icons";
import { isWithinInterval } from "date-fns";

import RXPanel from "../../component/templates/Panel/RXFacts/RXPanel.component";
import PlannerGuide from "../../component/module/Planner/PlannerGuide/PlannerGuide.component";
import ChallengeQueue from "../../component/module/Planner/PlannerQueue/ChallengeQueue.component";
import PlannerQueue from "../../component/module/Planner/PlannerQueue/PlannerQueue.component";
import { RecipePlanner } from "../../component/module/Planner/Toolbox/RecipePlanner.component";
import UploadCard from "../../component/module/Planner/Toolbox/UploadCard.component";
import Challenge from "../../component/module/Planner/Challenge/Challenge.component";
import Settings from "../../component/module/Planner/Setttings/Settings.component";

import AContainer from "../../containers/A.container";
import IconHeading from "../../theme/iconHeading/iconHeading.component";
import ToggleCard from "../../theme/toggleCard/toggleCard.component";

import { GET_30DAYS_CHALLENGE } from "../../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChallengeInterval,
  setShowPostForm,
} from "../../redux/slices/Challenge.slice";

import styles from "../../styles/pages/planner.module.scss";
import { useRouter } from "next/router";

const ChallengePage = () => {
  const type = useRouter().query.type as "challenge" | "planner";
  const showChallenge = type === "challenge";
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
  if (showChallenge && showUpload) toolbox = <UploadCard />;
  else if (showChallenge && showSettings)
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
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className={styles.planner__pageTitle}>BLENDA COACH</div>
          <div className="row">
            <div className="col-3">
              {showChallenge && !showUpload ? (
                <ChallengeQueue
                  challenges={data?.getMyThirtyDaysChallenge?.challenge}
                />
              ) : (
                <PlannerQueue isUpload={showUpload} />
              )}
            </div>
            <div className="col-6">
              <div className={styles.headingDiv}>
                <IconHeading title="Toolbox" icon={faToolbox} />
                {showChallenge && !showUpload && !showSettings && (
                  <div className="flex ai-center">
                    <div
                      className={styles.uploadDiv}
                      onClick={() => {
                        dispatch(setShowPostForm(false));
                        setShowSettings(true);
                        // setShowChallenge(true);
                      }}
                    >
                      <AiOutlinePlusCircle className={styles.uploadDiv__icon} />
                      <span>Settings</span>
                    </div>
                    <div
                      className={styles.uploadDiv}
                      onClick={() => {
                        dispatch(setShowPostForm(true));
                        setShowSettings(false);
                        // setShowChallenge(true);
                      }}
                    >
                      <AiOutlinePlusCircle className={styles.uploadDiv__icon} />
                      <span>Upload</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.toolbox}>
                {toolbox && toolbox !== null ? (
                  toolbox
                ) : (
                  <Fragment>
                    <ToggleCard
                      active={type}
                      leftToggleHeading="Challenge"
                      rightToggleHeading="Planner"
                      headingStyle={{
                        fontSize: "1.6rem",
                        padding: "15px 5px",
                      }}
                      togglerStyle={{
                        width: "80%",
                        margin: "0px auto",
                        paddingTop: "18px",
                      }}
                    />
                    {type === "challenge" ? (
                      <Challenge
                        activities={data?.getMyThirtyDaysChallenge?.challenge}
                        statistics={
                          data?.getMyThirtyDaysChallenge?.challengeInfo
                        }
                      />
                    ) : (
                      <RecipePlanner />
                    )}
                  </Fragment>
                )}
              </div>
            </div>
            <div className="col-3">
              <PlannerGuide />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default ChallengePage;
