import React, { useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import UpdatedCustomAccordion from "../../theme/accordion/updatedAccordion.component copy";
import styles from "./updatedRecursiveAccordian.module.scss";
import Image from "next/image";
import { FaRegUser } from "react-icons/fa";

interface recursiveAccordianInterface {
  dataObject: object;
  counter?: number;
}

const UpdatedRecursiveAccordian = ({
  dataObject,
  counter,
}: recursiveAccordianInterface) => {
  //@ts-ignore
  const { Energy, Vitamins, Minerals } = dataObject;
  const { user, dbUser } = useAppSelector((state) => state?.user);
  const [openPopup, setOpenPopup] = useState(false);
  return (
    <div>
      <div className={styles.nutritionHeader}>
        <div className={styles.recursiveAccordianHeading__heading}>
          <div className={styles.recursiveAccordianHeading__heading__1}>
            Calories
          </div>
          <div className={styles.recursiveAccordianHeading__heading__2}>93</div>
          <div className={styles.recursiveAccordianHeading__heading__3}>
            <div>
              {user ? (
                <div className={styles.userName}>
                  {dbUser?.image ? (
                    <Image
                      src={dbUser?.image}
                      alt="prfile.png"
                      objectFit="contain"
                      layout="fill"
                      onClick={() => setOpenPopup((pre) => !pre)}
                    />
                  ) : (
                    <FaRegUser
                      className={styles.userName__image}
                      onClick={() => setOpenPopup((pre) => !pre)}
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>
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

      <UpdatedCustomAccordion
        title={"Energy"}
        content={Energy}
        type={"mainHeading"}
        counter={counter}
      />
      <UpdatedCustomAccordion
        title={"Vitamins"}
        content={Vitamins}
        type={"mainHeading"}
        counter={counter}
      />
      <UpdatedCustomAccordion
        title={"Minerals"}
        content={Minerals}
        type={"mainHeading"}
        counter={counter}
      />
    </div>
  );
};
export default UpdatedRecursiveAccordian;
