import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import {
  faGear,
  faPlusCircle,
  faShare,
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

import { GET_30DAYS_CHALLENGE, GET_CHALLENGES } from "../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChallengeInterval,
  setShowPostForm,
  setChallengeView,
} from "../../redux/slices/Challenge.slice";

import styles from "../../styles/pages/planner.module.scss";
import Icon from "../../component/atoms/Icon/Icon.component";

import { theme } from "../../configs/themes";
import ChallengeShareModal from "../../component/organisms/Share/ChallengeShare.component";
import { useRouter } from "next/router";

const ChallengePage = () => {
  const router = useRouter();
  const challengeProgress = useRef<HTMLDivElement>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showGroceryTray] = useState(true);
  const [showShare, setShowShare] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const {
    activeDate,
    startDate,
    endDate,
    showPostForm: showUpload,
  } = useAppSelector((state) => state.challenge);

  const [getChallenges, { data }] = useLazyQuery(GET_30DAYS_CHALLENGE);
  const { data: challenges } = useQuery(GET_CHALLENGES, {
    variables: {
      memberId: userId,
    },
  });

  const viewOnly = data?.getMyThirtyDaysChallenge?.challengeInfo?.viewOnly;

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
        challengeId: router.query?.id,
        token: router.query?.token,
      },
    });
  }, [
    activeDate,
    endDate,
    getChallenges,
    router.query?.id,
    router.query?.token,
    startDate,
    userId,
  ]);

  useEffect(() => {
    const challenges = data?.getMyThirtyDaysChallenge?.challenge || [];
    if (challenges.length === 0) return;

    dispatch(setChallengeView(viewOnly));
    dispatch(
      setChallengeInterval({
        startDate: challenges[0]?.date,
        endDate: challenges[challenges.length - 1]?.date,
      }),
    );
  }, [data, dispatch, viewOnly]);

  let toolbox = null;
  if (showUpload) toolbox = <UploadCard />;
  else if (showSettings)
    toolbox = (
      <Settings
        currentChallenge={
          data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeId
        }
        challenges={challenges}
        hideSettings={() => setShowSettings(false)}
      />
    );

  return (
    <AContainer
      headerTitle="BLENDA CHALLENGE"
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
    >
      <RXPanel />
      <ChallengeShareModal
        id={data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeId}
        name={data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeName}
        show={showShare}
        setShow={setShowShare}
        element={challengeProgress.current}
      />
      <div className={styles.planner}>
        <div className="row mt-20">
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
                {!viewOnly && (
                  <div
                    className={styles.uploadDiv}
                    onClick={() => {
                      setShowShare(true);
                    }}
                  >
                    <Icon
                      fontName={faShare}
                      size="1.6rem"
                      color={theme.color.primary}
                    />
                    <span>Share</span>
                  </div>
                )}
                <div
                  className={`${styles.uploadDiv} ml-10`}
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
                {!viewOnly && (
                  <div
                    className={`${styles.uploadDiv} ml-10`}
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
                )}
              </div>
            </div>
            <div className={styles.plan}>
              {toolbox && toolbox !== null ? (
                toolbox
              ) : (
                <Challenge
                  progressRef={challengeProgress}
                  activities={data?.getMyThirtyDaysChallenge?.challenge}
                  statistics={data?.getMyThirtyDaysChallenge?.challengeInfo}
                />
              )}
            </div>
          </div>
          <div className="col-3">
            <Statistics
              statistics={data?.getMyThirtyDaysChallenge?.challengeInfo}
            />
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default ChallengePage;
