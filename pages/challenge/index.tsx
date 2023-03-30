import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  faGear,
  faPlusCircle,
  faShare,
  faToolbox,
} from "@fortawesome/pro-light-svg-icons";
import { isWithinInterval } from "date-fns";
import { useRouter } from "next/router";
import axios from "axios";
import html2canvas from "html2canvas";

import RXPanel from "../../component/templates/Panel/RXFacts/RXPanel.component";
import Statistics from "../../component/module/Challenge/Statistics.component";
import ChallengeQueue from "../../component/module/Challenge/Post.component";
import PlannerQueue from "../../component/module/Planner/Queue.component";
import UploadCard from "../../component/module/Challenge/Upload.component";
import Challenge from "../../component/module/Challenge/Achievement/index.component";
import Settings from "../../component/module/Challenge/Settings.component";

import AContainer from "../../containers/A.container";
import IconHeading from "../../theme/iconHeading/iconHeading.component";

import {
  GET_30DAYS_CHALLENGE,
  GET_CHALLENGES,
  SHARE_CHALLENGE,
} from "../../graphql/Challenge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setChallengeInterval,
  setShowPostForm,
  setChallengeView,
} from "../../redux/slices/Challenge.slice";

import styles from "../../styles/pages/planner.module.scss";
import Icon from "../../component/atoms/Icon/Icon.component";

import { theme } from "../../configs/themes";
import ShareModal from "../../component/organisms/Share/Share.component";
import { dataURLtoFile } from "../../helpers/File";

const ChallengePage = () => {
  const router = useRouter();
  const challengeProgress = useRef<HTMLDivElement>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [showGroceryTray] = useState(true);

  const [link, setLink] = useState("");
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
  const [shareChallenge] = useMutation(SHARE_CHALLENGE);

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

  const shareChallengeHandler = useCallback(() => {
    const id = data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeId;

    shareChallenge({
      variables: {
        userId,
        challengeId: id,
      },
    }).then((res) => {
      setLink(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );

      navigator.clipboard.writeText(
        `${process.env.NEXT_PUBLIC_HOSTING_DOMAIN}/challenge/shared?id=${id}&token=${res.data?.shareGlobalChallenge}`,
      );

      html2canvas(challengeProgress.current).then((canvas) => {
        const data = canvas.toDataURL("image/jpg");
        const file = dataURLtoFile(data, "challenge.png");

        // STORING THE DIALER IMAGE
        const formdata = new FormData();
        formdata.append("image", file, `${id}.jpg`);

        axios.post(
          "https://om7h45qezg.execute-api.us-east-1.amazonaws.com/prod//file-processing/images/single",
          formdata,
        );

        const link = document.createElement("a");
        if (typeof link.download === "string") {
          link.href = data;
          link.download = "image.jpg";

          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          window.open(data);
        }
      });
    });
  }, [
    data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeId,
    shareChallenge,
    userId,
  ]);

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

  const canUpload =
    !viewOnly &&
    data?.getMyThirtyDaysChallenge?.challengeInfo?.daysRemaining > 0;

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
        name={data?.getMyThirtyDaysChallenge?.challengeInfo?.challengeName}
        show={showShare}
        setShow={setShowShare}
        link={link}
        onShare={shareChallengeHandler}
      />
      <div className={styles.planner}>
        <div className="row mt-20">
          <div className="col-3">
            {showUpload ? (
              <PlannerQueue panel="challenge" />
            ) : (
              <ChallengeQueue
                challenges={data?.getMyThirtyDaysChallenge?.challenge}
              />
            )}
          </div>
          <div className="col-6">
            <div className={styles.headingDiv}>
              <IconHeading
                title="Challenge"
                icon={faToolbox}
                iconStyle={{ marginLeft: 20 }}
              />
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
            </div>
            <div className={styles.plan}>
              {toolbox && toolbox !== null ? (
                toolbox
              ) : (
                <Challenge
                  canUpload={canUpload}
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
