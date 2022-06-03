import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import UpdatedCustomAccordion from "../../theme/accordion/updatedAccordion.component copy";
import styles from "./updatedRecursiveAccordian.module.scss";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/router";
import { GET_DAILY_BY_USER_ID } from "../../gqlLib/user/mutations/query/getDaily";
import { useQuery } from "@apollo/client";
import GET_DAILY_GOALS from "../../gqlLib/dri/query/getDailyGoals";

interface recursiveAccordianInterface {
  dataObject: object;
  counter?: number;
  showUser?: boolean;
  servingSize?: number;
}

const UpdatedRecursiveAccordian = ({
  dataObject,
  counter = 1,
  showUser = true,
  servingSize = 1,
}: recursiveAccordianInterface) => {
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  const { data: dailyData } = useQuery(GET_DAILY_GOALS, {
    fetchPolicy: "network-only",
    variables: { memberId: dbUser?._id },
  });

  return (
    <>
      <div className={styles.nutritionHeader}>
        <div className={styles.recursiveAccordianHeading__heading}>
          <div className={styles.recursiveAccordianHeading__heading__1}>
            Calories
          </div>
          <div className={styles.recursiveAccordianHeading__heading__2}>
            {
              //@ts-ignore
              dataObject?.Calories?.calories?.value &&
                Math?.round(
                  //@ts-ignore
                  (dataObject?.Calories?.calories?.value * counter) /
                    servingSize,
                )
            }
          </div>
          {showUser ? (
            <div className={styles.recursiveAccordianHeading__heading__3}>
              {user ? (
                <div className={styles.userName}>
                  {dbUser?.image ? (
                    <Image
                      src={dbUser?.image}
                      alt="prfile.png"
                      objectFit="contain"
                      layout="fill"
                      onClick={() =>
                        router?.push("/user/?type=personalization&toggle=1")
                      }
                    />
                  ) : (
                    <FaRegUser
                      className={styles.userName__image}
                      onClick={() =>
                        router?.push("/user/?type=personalization&toggle=1")
                      }
                    />
                  )}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
      <div className={styles.recursiveAccordianHeading__subheading}>
        <div className={styles.recursiveAccordianHeading__subheading__3}>
          Value
        </div>
        <div className={styles.recursiveAccordianHeading__subheading__4}>
          Daily%
        </div>
      </div>
      <div className={`${styles.recursiveAccordianBody}`}>
        {Object?.entries(dataObject)?.map((elem) => {
          if (elem[0] !== "Calories") {
            return (
              <UpdatedCustomAccordion
                key={elem[0] + Date.now()}
                title={elem[0]}
                content={elem[1]}
                type={"mainHeading"}
                counter={counter}
                dailyGoalsData={dailyData?.getDailyGoals?.goals}
                servingSize={servingSize}
              />
            );
          }
        })}
      </div>
    </>
  );
};
export default UpdatedRecursiveAccordian;
