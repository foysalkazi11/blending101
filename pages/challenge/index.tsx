import React, { useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import {
  faGear,
  faShare,
  faToolbox,
  faPlusCircle,
  faTimes,
} from "@fortawesome/pro-light-svg-icons";

import RXPanel from "../../component/templates/Panel/RXFacts/RXPanel.component";
import Statistics from "../../component/module/Challenge/Statistics.component";
import ChallengeQueue from "../../component/module/Challenge/Post.component";
import PlannerQueue from "../../component/module/Planner/Queue.component";
import UploadCard from "../../component/module/Challenge/Upload.component";
import Challenge from "../../component/module/Challenge/Achievement/index.component";
import Settings from "../../component/module/Challenge/Settings.component";
import IconButton from "../../component/atoms/Button/IconButton.component";
import Icon from "../../component/atoms/Icon/Icon.component";
import ShareModal from "../../component/organisms/Share/Share.component";

import AContainer from "../../containers/A.container";
import IconHeading from "../../theme/iconHeading/iconHeading.component";

import { GET_CHALLENGES } from "../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import useChallengeShare from "../../hooks/modules/Challenge/useChallengeShare";
import { useThirtyDayChallenge } from "../../hooks/modules/Challenge/useChallengePost";

import { setShowPostForm } from "../../redux/slices/Challenge.slice";

import { theme } from "../../configs/themes";

import styles from "../../styles/pages/planner.module.scss";

const ChallengePage = () => {
  const settings = useRef<{ onChallengeSave: any }>();
  const [showGroceryTray] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");
  const { showPostForm: showUpload } = useAppSelector(
    (state) => state.challenge,
  );

  const { data: challenges } = useQuery(GET_CHALLENGES, {
    variables: {
      memberId: userId,
    },
  });

  const { challenge, viewOnly } = useThirtyDayChallenge();
  const { url, progress, onShare } = useChallengeShare(challenge);

  let toolbox = null;
  if (showUpload) toolbox = <UploadCard />;
  else if (showSettings)
    toolbox = (
      <Settings
        ref={settings}
        showFormState={[showForm, setShowForm]}
        currentChallenge={challenge?.challengeInfo?.challengeId}
        challenges={challenges}
        hideSettings={() => setShowSettings(false)}
      />
    );

  const canUpload = !viewOnly && challenge?.challengeInfo?.daysRemaining > 0;

  return (
    <AContainer
      headerIcon="/icons/whistle.svg"
      headerTitle="Challenges"
      showGroceryTray={{
        show: showGroceryTray,
        showPanle: "right",
        showTagByDeafult: showGroceryTray,
      }}
      headTagInfo={{
        title: "Challenge",
        description: "challenge",
      }}
    >
      <RXPanel />
      <ShareModal
        name={challenge?.challengeInfo?.challengeName}
        show={showShare}
        setShow={setShowShare}
        link={url}
        onShare={onShare}
      />
      <div className={styles.planner}>
        <div className="row mt-20">
          <div className="col-3">
            {showUpload ? (
              <PlannerQueue panel="challenge" />
            ) : (
              <ChallengeQueue challenges={challenge?.challenge} />
            )}
          </div>
          <div className="col-6">
            <div className={styles.headingDiv}>
              <IconHeading
                title={showUpload ? "Challenge Post" : "Challenge"}
                icon={faToolbox}
                iconStyle={{ marginLeft: 20 }}
              />
              {
                //CHALLENGE HOME PAGE
                !showUpload && !showSettings && (
                  <div className="flex ai-center mr-20">
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
                    {canUpload && (
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
                )
              }
              {
                // CHALLENGE UPLOAD PAGE OR SETTINGS PAGE
                (showUpload || showSettings) && (
                  <div className="flex ai-center mr-20">
                    {
                      //SETTINGS PAGE
                      !showUpload && showSettings && showForm ? (
                        // SETTINGS PAGE -> FORM
                        <div
                          className={`${styles.uploadDiv} mr-20`}
                          onClick={() => settings.current.onChallengeSave()}
                        >
                          <Icon
                            fontName={faPlusCircle}
                            size="1.6rem"
                            color={theme.color.primary}
                          />
                          <span>Save</span>
                        </div>
                      ) : (
                        showSettings && (
                          // SETTINGS PAGE -> LIST
                          <div
                            className={`${styles.uploadDiv} mr-20`}
                            onClick={() => {
                              setShowForm(true);
                            }}
                          >
                            <Icon
                              fontName={faPlusCircle}
                              size="1.6rem"
                              color={theme.color.primary}
                            />
                            <span>Add</span>
                          </div>
                        )
                      )
                    }
                    <IconButton
                      size="small"
                      variant="secondary"
                      fontName={faTimes}
                      onClick={() => {
                        setShowSettings(false);
                        dispatch(setShowPostForm(false));
                      }}
                    />
                  </div>
                )
              }
            </div>
            <div className={styles.plan}>
              {toolbox && toolbox !== null ? (
                toolbox
              ) : (
                <Challenge
                  canUpload={canUpload}
                  progressRef={progress}
                  activities={challenge?.challenge}
                  statistics={challenge?.challengeInfo}
                />
              )}
            </div>
          </div>
          <div className="col-3">
            <Statistics statistics={challenge?.challengeInfo} />
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default ChallengePage;
