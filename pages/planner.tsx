import { useQuery } from "@apollo/client";
import React, { Fragment, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaToolbox } from "react-icons/fa";
import PlannerGuide from "../component/module/Planner/PlannerGuide/PlannerGuide.component";

import ChallengeQueue from "../component/module/Planner/PlannerQueue/ChallengeQueue.component";
import PlannerQueue from "../component/module/Planner/PlannerQueue/PlannerQueue.component";
import { RecipePlanner } from "../component/module/Planner/Toolbox/RecipePlanner.component";
import UploadCard from "../component/module/Planner/Toolbox/UploadCard.component";
import AContainer from "../containers/A.container";
import { GET_30DAYS_CHALLENGE } from "../graphql/Planner";
import { useAppSelector } from "../redux/hooks";

import styles from "../styles/pages/planner.module.scss";
import Challenge from "../component/module/Planner/Challenge/Challenge.component";

import { food_color, fake_data } from "../theme/circularComponent/js/my";
import IconHeading from "../theme/iconHeading/iconHeading.component";
import ToggleCard from "../theme/toggleCard/toggleCard.component";
import Settings from "../component/module/Planner/Setttings/Settings.component";

const Planner = () => {
  const [showChallenge, setShowChallenge] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const { data } = useQuery(GET_30DAYS_CHALLENGE, {
    variables: {
      userId,
    },
  });

  let toolbox = null;
  if (showChallenge && showUpload)
    toolbox = <UploadCard setUploadState={setShowUpload} />;
  else if (showChallenge && showSettings) toolbox = <Settings hideSettings={() => setShowSettings(false)}/>;

  return (
    <AContainer>
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
                <IconHeading title="Toolbox" icon={<FaToolbox />} />
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
                        activities={data?.getMyThirtyDaysChallenge || []}
                        categoryObject={food_color}
                        activityDataList={fake_data}
                        profileImage={"/images/5.jpeg"}
                        blendValue={400}
                        totalBlendValue={750}
                        numOfDaysChallenge={30}
                        startDate={21}
                        startYear={2022}
                        startMonth={"May"}
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

export default Planner;
