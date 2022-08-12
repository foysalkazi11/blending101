import { useLazyQuery } from "@apollo/client";
import React, { Fragment, useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import PlannerGuide from "../component/module/Planner/PlannerGuide/PlannerGuide.component";

import ChallengeQueue from "../component/module/Planner/PlannerQueue/ChallengeQueue.component";
import PlannerQueue from "../component/module/Planner/PlannerQueue/PlannerQueue.component";
import { RecipePlanner } from "../component/module/Planner/Toolbox/RecipePlanner.component";
import UploadCard from "../component/module/Planner/Toolbox/UploadCard.component";
import AContainer from "../containers/A.container";
import { GET_30DAYS_CHALLENGE, GET_RECENT_POST } from "../graphql/Planner";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

import styles from "../styles/pages/planner.module.scss";
import Challenge from "../component/module/Planner/Challenge/Challenge.component";

import IconHeading from "../theme/iconHeading/iconHeading.component";
import ToggleCard from "../theme/toggleCard/toggleCard.component";
import Settings from "../component/module/Planner/Setttings/Settings.component";
import { setChallenge } from "../redux/slices/Planner.slice";
import { faToolbox } from "@fortawesome/pro-light-svg-icons";

const ChallengePage = () => {
  const [showChallenge, setShowChallenge] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showGroceryTray] = useState(true);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const [get30DaysChallenge, { loading, data }] = useLazyQuery(
    GET_30DAYS_CHALLENGE,
    {
      variables: {
        userId,
      },
    },
  );

  const [getRecentChallengeData, { data: challenge }] = useLazyQuery(
    GET_RECENT_POST,
    {
      fetchPolicy: "no-cache",
    },
  );

  useEffect(() => {
    if (userId !== "")
      getRecentChallengeData({
        variables: {
          memberId: userId,
        },
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    if (!challenge?.getLatestChallengePost) return;
    dispatch(
      setChallenge({
        date: challenge.getLatestChallengePost?.assignDate,
        posts: challenge.getLatestChallengePost?.posts,
      }),
    );
  }, [challenge?.getLatestChallengePost, dispatch]);

  useEffect(() => {
    if (userId) get30DaysChallenge();
  }, [get30DaysChallenge, userId]);

  let toolbox = null;
  if (showChallenge && showUpload)
    toolbox = <UploadCard setUploadState={setShowUpload} />;
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
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className={styles.planner__pageTitle}>BLENDA COACH</div>
          <div className="row">
            <div className="col-3">
              {showChallenge && !showUpload ? (
                <ChallengeQueue />
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
                        setShowUpload(false);
                        setShowSettings(true);
                        setShowChallenge(true);
                      }}
                    >
                      <AiOutlinePlusCircle className={styles.uploadDiv__icon} />
                      <span>Settings</span>
                    </div>
                    <div
                      className={styles.uploadDiv}
                      onClick={() => {
                        setShowUpload(true);
                        setShowSettings(false);
                        setShowChallenge(true);
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
                      leftToggleHeading="Challenge"
                      rightToggleHeading="Planner"
                      toggler={showChallenge}
                      setTogglerFunc={setShowChallenge}
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
                    {showChallenge ? (
                      <Challenge
                        activities={
                          data &&
                          data?.getMyThirtyDaysChallenge &&
                          data?.getMyThirtyDaysChallenge?.challenge?.length > 0
                            ? data?.getMyThirtyDaysChallenge?.challenge
                            : []
                        }
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
