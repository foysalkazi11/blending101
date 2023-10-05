import React, { useEffect } from "react";
import styles from "./User.module.scss";
import SideBar from "./sidebar/SideBar";
import Main from "./main/Main";
import { useUser } from "../../../context/AuthProvider";
import notification from "../../utility/reactToastifyNotification";
import useLocalStorage from "customHooks/useLocalStorage";
import useToGetExistingUserInfo from "customHooks/user/useToGetExistingUserInfo";

export type UserDataType = {
  about: {
    bio: string;
    image: string;
    firstName: string;
    lastName: string;
    displayName: string;
    yourBlender: string;
    email: string;
    location: string;
    blenderManufacturer: string;
  };
  membership: {
    plan: string;
  };
  notification: {
    platform: {
      newsAndEvents: any[];
      blending101Offers: any[];
    };
    topicDigest: {
      recommendations: any[];
      sharedwithYou: any[];
    };
  };
  personalization: {
    activity: string;
    age: {
      months: any;
      quantity: any;
      years: any;
    };
    allergies: any[];
    dieteryLifeStyle: string;
    gender: string;
    heightInCentimeters: any;
    weightInKilograms: any;
    meditcation: any[];
    preExistingMedicalConditions: any[];
    whyBlending: any[];
    pregnantOrLactating: any;
  };
};
const User = () => {
  const handleToGetExistingUserInfo = useToGetExistingUserInfo();
  const [userData, setUserData] = useLocalStorage<UserDataType>("userData", {
    about: {
      bio: "",
      image: "",
      firstName: "",
      lastName: "",
      displayName: "",
      yourBlender: "",
      email: "",
      location: "",
      blenderManufacturer: "",
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
      heightInCentimeters: null,
      weightInKilograms: null,
      meditcation: [],
      preExistingMedicalConditions: [],
      whyBlending: [],
      pregnantOrLactating: null,
    },
  });
  const user = useUser();

  // handle to get existing user
  const handleToGetExistingUser = async (email) => {
    try {
      const currentUser = await handleToGetExistingUserInfo(email);

      if (currentUser?.configuration) {
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
          blenderManufacturer,
        } = currentUser;

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

        setUserData({
          ...userData,
          about: {
            ...userData?.about,
            bio: bio || "",
            image,
            firstName,
            lastName,
            displayName,
            email,
            location,
            yourBlender,
            blenderManufacturer,
          },
          personalization: {
            ...userData?.personalization,
            activity,
            age: {
              quantity: age?.quantity,
              months: age?.months,
              years: age?.years,
            },
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
        });
      }
    } catch (error) {
      notification("error", "Failed to get existing user data");
    }
  };

  useEffect(() => {
    if (user?.email) {
      handleToGetExistingUser(user?.email);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default User;
