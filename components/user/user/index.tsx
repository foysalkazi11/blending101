import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./User.module.scss";
import { Container, Grid } from "@mui/material";
import SideBar from "./sidebar/SideBar";
import Main from "./main/Main";
import ButtonComponent from "../../../theme/button/button.component";
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
      gender: "",
      activity: "",
      age: "",
      weight: "",
      dieteryLifeStyle: "",
      allergies: "",
      height: "",
    },
  });

  const { dbUser } = useAppSelector((state) => state?.user);

  useEffect(() => {
    if (dbUser) {
      const {
        bio,
        displayName,
        email,
        firstName,
        // gender,
        image,
        lastName,
        // mobileNumber,
        configuration,
      } = dbUser;
      const {
        activity,
        age,
        allergies,
        dieteryLifeStyle,
        gender,
        height,
        weight,
        // meditcation,
        // preExistingMedicalConditions,
        // whyBlending,
      } = configuration;

      setUserData((pre) => ({
        ...pre,
        about: {
          ...pre?.about,
          bio,
          image,
          firstName,
          lastName,
          displayName,
          // yourBlender: "",
          email,
          // location: ""
        },
        personalization: {
          ...pre?.personalization,
          gender,
          activity,
          age,
          weight,
          dieteryLifeStyle,
          allergies,
          height,
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

      <Container maxWidth="xl" className={styles.container}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <div className={styles.sideBar}>
              <SideBar userData={userData} setUserData={setUserData} />
            </div>
          </Grid>
          <Grid item xs={12} md={8}>
            <div className={styles.main}>
              <Main userData={userData} setUserData={setUserData} />
            </div>
          </Grid>
        </Grid>
      </Container>
    </AContainer>
  );
};

export default User;
