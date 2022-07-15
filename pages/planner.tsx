import { useQuery } from "@apollo/client";
import React, { useState } from "react";
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
import CircleComponent from "../theme/circularComponent/CircleComponent.component";
import { food_color, fake_data } from "../theme/circularComponent/js/my";
import IconHeading from "../theme/iconHeading/iconHeading.component";
import ToggleCard from "../theme/toggleCard/toggleCard.component";

const Planner = () => {
  const [centerLeftToggler, setCenterLeftToggler] = useState(false);
  const [uploadState, setUploadState] = useState(false);

  const userId = useAppSelector((state) => state.user?.dbUser?._id || "");

  const { data } = useQuery(GET_30DAYS_CHALLENGE, {
    variables: {
      userId,
    },
  });

  return (
    <AContainer>
      <div className={styles.windowContainer}>
        <div className={styles.planner}>
          <div className={styles.planner__pageTitle}>BLENDA COACH</div>
          <div className="row">
            <div className="col-3">
              {centerLeftToggler && !uploadState ? (
                <ChallengeQueue />
              ) : (
                <PlannerQueue isUpload={uploadState} />
              )}
            </div>
            <div className="col-6">
              <div className={styles.mainContainer}>
                <div className={styles.headingDiv}>
                  <IconHeading title="Toolbox" icon={<FaToolbox />} />
                  {centerLeftToggler && (
                    <div
                      className={styles.uploadDiv}
                      onClick={() => {
                        setUploadState(true);
                        setCenterLeftToggler(true);
                      }}
                    >
                      <AiOutlinePlusCircle className={styles.uploadDiv__icon} />
                      <span>Upload</span>
                    </div>
                  )}
                </div>
                <div className={styles.mainContainer__contentDiv}>
                  {uploadState ? (
                    <UploadCard setUploadState={setUploadState} />
                  ) : (
                    <>
                      <ToggleCard
                        leftToggleHeading="Challenge"
                        rightToggleHeading="Planner"
                        toggler={centerLeftToggler}
                        setTogglerFunc={setCenterLeftToggler}
                        headingStyle={{
                          fontSize: "1.6rem",
                          padding: "15px 5px",
                        }}
                        togglerStyle={{
                          width: "80%",
                          margin: "0px auto",
                          paddingTop: "18px",
                        }}
                      >
                        {/* <SettingComponent/> */}
                      </ToggleCard>

                      {centerLeftToggler ? (
                        <div
                          className={styles.mainContainer__contentDiv__innerDiv}
                        >
                          <div
                            className={
                              styles.mainContainer__contentDiv__innerDiv__challengeDiv
                            }
                          >
                            {data?.getMyThirtyDaysChallenge?.length !== 0 && (
                              <CircleComponent
                                activities={
                                  data?.getMyThirtyDaysChallenge || []
                                }
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
                            )}
                          </div>
                        </div>
                      ) : (
                        <RecipePlanner />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="col-3">
              <PlannerGuide />
            </div>
          </div>
        </div>
      </div>

      {/* </div> */}
    </AContainer>
  );
};

export default Planner;

// export const ingredientCenterList = [
//   {
//     ingredientName: "Coconut Milk",
//     servingSize: "4 med",
//   },
//   {
//     ingredientName: "Celery",
//     servingSize: "4 med",
//   },
//   {
//     ingredientName: "Orange Juice",
//     servingSize: "4 med",
//   },
//   {
//     ingredientName: "Grapes",
//     servingSize: "4 med",
//   },
// ];
