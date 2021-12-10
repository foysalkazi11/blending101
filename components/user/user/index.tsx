import React, { useState, useEffect } from "react";
import AContainer from "../../../containers/A.container";
import styles from "./User.module.scss";
import { Container, Grid } from "@mui/material";
import SideBar from "./sidebar/SideBar";
import Main from "./main/Main";
import ButtonComponent from "../../../theme/button/button.component";

const User = () => {
  const [userData, setUserData] = useState({
    about: {
      aboutMe:
        "Quisque libero metus, condimentum nec, tempor a, commodo mollis, magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis gravida.",
      image: "",
      firstName: "Jhon",
      lastName: "Doe",
      displayName: "Jhon",
      yourBlender: "Doe",
      email: "example@gmail.com",
      location: "all",
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
      dietary: "",
      allergies: "",
    },
  });

  useEffect(() => {
    console.log(userData);
  }, [userData]);

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
