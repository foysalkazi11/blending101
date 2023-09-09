/* eslint-disable @next/next/no-img-element */
import React, { useRef, useState } from "react";
import styles from "./AboutUser.module.scss";
import InputComponent from "../../../../theme/input/input.component";
import { UserDataType } from "..";
import ShowSuggestion from "theme/showSuggestion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/pro-light-svg-icons";
import optionsForTimeZone from "./staticData/timezones.json";
import optionsForBlender from "./staticData/blender.json";

const optionsListForTimeZone = Object.entries(
  JSON.parse(JSON.stringify(optionsForTimeZone)),
).map(([timezone, offset]: [string, string]) => {
  let timezoneDivide = timezone?.split("/");
  let label = `${timezoneDivide[1]}, ${timezoneDivide[0]} ${offset.slice(
    0,
    11,
  )}`;
  return {
    label,
    value: label?.toLowerCase(),
  };
});
const optionsListForBlender = JSON.parse(JSON.stringify(optionsForBlender)).map(
  (blenderName: { [key: string]: string }) => {
    return {
      label: blenderName?.["Blender Name"],
      value: blenderName?.["Blender Name"]?.toLowerCase(),
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
  const [showBlenderSuggestionsBox, setShowBlenderSuggestionsBox] =
    useState(false);
  const timezoneRef = useRef<HTMLInputElement>(null);
  const blendRef = useRef<HTMLInputElement>(null);

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
              placeholder="Last name"
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
        <div
          className={styles.Container__item}
          style={{ position: "relative" }}
        >
          <div className={styles.inputContainer}>
            <InputComponent
              inputWithIcon={true}
              type="text"
              name="yourBlender"
              value={yourBlender}
              onChange={handleChange}
              placeholder="Select blender"
              icon={<FontAwesomeIcon icon={faAngleDown} size="sm" />}
              label="Your Blender"
              onClick={() => {
                showBlenderSuggestionsBox && blendRef?.current?.focus();
                setShowBlenderSuggestionsBox(!showBlenderSuggestionsBox);
              }}
              readOnly
            />
          </div>
          <ShowSuggestion
            list={optionsListForBlender}
            handleClickList={(list: Options) =>
              handleChange({
                target: { name: "yourBlender", value: list.label },
              })
            }
            style={{ display: showBlenderSuggestionsBox ? "block" : "none" }}
            placeholder="Search blender..."
            closeSuggestionBox={() => setShowBlenderSuggestionsBox(false)}
            ref={blendRef}
          />
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
              onClick={() => {
                showLocationSuggestionsBox && timezoneRef?.current?.focus();
                setShowLocationSuggestionsBox(!showLocationSuggestionsBox);
              }}
              label="Location"
            />
          </div>

          <ShowSuggestion
            list={optionsListForTimeZone}
            handleClickList={(list: Options) =>
              handleChange({ target: { name: "location", value: list.label } })
            }
            style={{ display: showLocationSuggestionsBox ? "block" : "none" }}
            placeholder="Search timezone"
            closeSuggestionBox={() => setShowLocationSuggestionsBox(false)}
            ref={timezoneRef}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
