import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import UpdatedCustomAccordion from "../../theme/accordion/updatedAccordion.component copy";
import styles from "./updatedRecursiveAccordian.module.scss";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";
import { useRouter } from "next/router";

interface recursiveAccordianInterface {
  dataObject: object;
  counter?: number;
  showUser?: boolean;
}

const UpdatedRecursiveAccordian = ({
  dataObject,
  counter,
  showUser = true,
}: recursiveAccordianInterface) => {
  //@ts-ignore
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const router = useRouter();
  return (
    <>
      <div className={styles.nutritionHeader}>
        <div className={styles.recursiveAccordianHeading__heading}>
          <div className={styles.recursiveAccordianHeading__heading__1}>
            Calories
          </div>
          <div className={styles.recursiveAccordianHeading__heading__2}>93</div>
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
                      onClick={() => router?.push("/user")}
                    />
                  ) : (
                    <FaRegUser
                      className={styles.userName__image}
                      onClick={() => router?.push("/user")}
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
      {Object?.entries(dataObject)?.map((elem) => {
        return (
          <UpdatedCustomAccordion
            key={elem[0] + Date.now()}
            title={elem[0]}
            content={elem[1]}
            type={"mainHeading"}
            counter={counter}
          />
        );
      })}
    </>
  );
};
export default UpdatedRecursiveAccordian;
