import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./User.module.scss";
import SideBar from "./sidebar/SideBar";
import Main from "./main/Main";
import { useAppSelector } from "../../../redux/hooks";

const User = () => {
  const [userData, setUserData] = useState({
    about: {
      bio: "",
      image: "",
      firstName: "",
      lastName: "",
      displayName: "",
      yourBlender: "",
      email: "",
      location: "",
    },
    membership: {
      plan: "free",
    },
    notification: {
      platform: {
        newsAndEvents: [],
        blending101Offers: [],
      },
      topicDigest: {
        recommendations: [],
        sharedwithYou: [],
      },
    },
    personalization: {
      activity: "",
      age: {
        months: null,
        quantity: null,
        years: null,
      },
      allergies: [],
      dieteryLifeStyle: "",
      gender: "",
      heightInCentimeters: "",
      weightInKilograms: "",
      meditcation: [],
      preExistingMedicalConditions: [],
      whyBlending: [],
      pregnantOrLactating: null,
    },
  });

  const { dbUser } = useAppSelector((state) => state?.user);

  useEffect(() => {
    if (dbUser?.configuration) {
      const {
        bio,
        displayName,
        email,
        firstName,
        location,
        yourBlender,
        image,
        lastName,
        configuration,
      } = dbUser;

      const {
        activity,
        age,
        allergies,
        dieteryLifeStyle,
        gender,
        heightInCentimeters,
        weightInKilograms,
        meditcation,
        preExistingMedicalConditions,
        whyBlending,
        pregnantOrLactating,
      } = configuration;

      setUserData((pre) => ({
        ...pre,
        about: {
          ...pre?.about,
          bio: bio || "",
          image,
          firstName,
          lastName,
          displayName,
          email,
          location,
          yourBlender,
        },
        personalization: {
          ...pre?.personalization,
          activity,
          age,
          allergies: allergies || [],
          dieteryLifeStyle,
          gender,
          heightInCentimeters,
          weightInKilograms,
          meditcation: meditcation || [],
          preExistingMedicalConditions: preExistingMedicalConditions || [],
          whyBlending: whyBlending || [],
          pregnantOrLactating,
        },
      }));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AContainer
      headerTitle="My Profile"
      showLeftTray={false}
      showRighTray={false}
      logo={false}
    >
      <header className={styles.header}>
        <div className={styles.header__banner}>
          <h2>Blending 101</h2>
          <p>Where you learn to blend life into a life style</p>
        </div>
      </header>
      <div className={styles.container}>
        <div className={styles.container__div}>
          <div className={styles.container__div__left}>
            <div className={styles.sideBar}>
              <SideBar userData={userData} setUserData={setUserData} />
            </div>
          </div>
          <div className={styles.container__div__right}>
            <div className={styles.main}>
              <Main userData={userData} setUserData={setUserData} />
            </div>
          </div>
        </div>
      </div>
    </AContainer>
  );
};

export default User;
