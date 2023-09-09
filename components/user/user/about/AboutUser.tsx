/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./AboutUser.module.scss";
import InputComponent from "../../../../theme/input/input.component";
import { UserDataType } from "..";
import ShowSuggestion from "theme/showSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faMagnifyingGlass,
} from "@fortawesome/pro-light-svg-icons";
import options from "./staticData/timezones.json";

const optionsList = Object.entries(JSON.parse(JSON.stringify(options))).map(
  ([timezone, offset]: [string, string]) => {
    let timezoneDivide = timezone?.split("/");
    let label = `${timezoneDivide[1]}, ${timezoneDivide[0]} ${offset.slice(
      0,
      11,
    )}`;
    return {
      label,
      value: label.toLowerCase(),
    };
  },
);

type Options = {
  label: string;
  value: string;
};

type AboutProps = {
  userData: UserDataType;
  setUserData: React.Dispatch<React.SetStateAction<UserDataType>>;
};

const About = ({ userData, setUserData }: AboutProps) => {
  const { firstName, lastName, displayName, yourBlender, email, location } =
    userData?.about;
  const [showLocationSuggestionsBox, setShowLocationSuggestionsBox] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e?.target;

    setUserData((pre) => {
      return {
        ...pre,
        about: {
          ...pre.about,
          [name]: value,
        },
      };
    });
  };

  // useEffect(() => {
  //   handleToGetTimeZones();
  // }, []);

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <InputComponent
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              fullWidth={true}
              placeholder="First name"
              label="First name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <InputComponent
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Lirst name"
              label="Last name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <InputComponent
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              placeholder="Display name"
              label="Display name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <InputComponent
              inputWithIcon={true}
              type="text"
              name="yourBlender"
              value={yourBlender}
              onChange={handleChange}
              placeholder="Yoru blender"
              icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="sm" />}
              label="Your Blender"
            />
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <InputComponent
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled
              placeholder="Email"
              label="Email*"
            />
          </div>
        </div>

        <div
          className={styles.Container__item}
          style={{ position: "relative" }}
        >
          <div className={styles.inputContainer}>
            <InputComponent
              inputWithIcon={true}
              name="location"
              placeholder="Select timezone"
              value={location}
              handleChange={handleChange}
              icon={<FontAwesomeIcon icon={faAngleDown} size="sm" />}
              readOnly
              onClick={() =>
                setShowLocationSuggestionsBox(!showLocationSuggestionsBox)
              }
              label="Location"
            />
          </div>

          <ShowSuggestion
            list={optionsList}
            input={userData.about.location}
            handleClickList={(list: Options) =>
              handleChange({ target: { name: "location", value: list.label } })
            }
            style={{ display: showLocationSuggestionsBox ? "block" : "none" }}
            placeholder="Search timezone"
            closeSuggestionBox={() => setShowLocationSuggestionsBox(false)}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
