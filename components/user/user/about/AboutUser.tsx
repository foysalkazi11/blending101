/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "./AboutUser.module.scss";
import { BiSearch } from "react-icons/bi";
import InputComponent from "../../../../theme/input/input.component";
import Combobox from "../../../../theme/dropDown/combobox/Combobox.component";

type AboutProps = {
  userData: any;
  setUserData: any;
};

const About = ({ userData, setUserData }: AboutProps) => {
  const { firstName, lastName, displayName, yourBlender, email, location } =
    userData?.about;

  const [focused, setFocused] = useState(false);

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

  return (
    <div>
      <div className={styles.Container}>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>First name</label>
            <InputComponent
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
              fullWidth={true}
              placeholder="First name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Last name</label>
            <InputComponent
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
              placeholder="Lirst name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Display name</label>
            <InputComponent
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
              placeholder="Display name"
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Your Blender</label>
            <div
              className={styles.searchInput}
              style={{
                border: focused ? "1px solid #fe5d1f" : "1px solid #dddddd",
              }}
            >
              <input
                className={styles.input}
                type="text"
                name="yourBlender"
                value={yourBlender}
                onChange={handleChange}
                placeholder="Yoru blender"
                onFocus={(e) => setFocused(true)}
                onBlur={(e) => setFocused(false)}
              />
              <BiSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Email*</label>
            <InputComponent
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled
              placeholder="Email"
            />
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Location</label>
            <Combobox
              options={[
                {
                  label: "(GMT-8:00) Pacific Time (US & Canada)",
                  value: "all",
                },
                { label: "(GMT-09:00) Alaska", value: "leafy" },
                { label: "(GMT-06:00) Central America", value: "berry" },
              ]}
              placeholder="Select"
              style={{ width: "100%" }}
              value={location}
              handleChange={handleChange}
            />
            {/* <div className={styles.selectBox}>
              <img src="/images/us.png" alt="flag" />
              <select
              name="location"
              value={location || "all"}
                onChange={handleChange}
              >
                <option value="all">
                  (GMT-8:00) Pacific Time (US & Canada)
                </option>
                <option value="leafy">(GMT-09:00) Alaska</option>
                <option value="berry"> (GMT-06:00) Central America</option>
              </select>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
