/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./AboutUser.module.scss";
import { BiSearch } from "react-icons/bi";

type AboutProps = {
  userData: any;
  setUserData: any;
};

const About = ({ userData, setUserData }: AboutProps) => {
  const { firstName, lastName, displayName, yourBlender, email, location } =
    userData?.about;

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
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Last name</label>
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Display name</label>
            <input
              type="text"
              name="displayName"
              value={displayName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Your Blender</label>
            <div className={styles.searchInput}>
              <input
                type="text"
                name="yourBlender"
                value={yourBlender}
                onChange={handleChange}
              />
              <BiSearch className={styles.searchIcon} />
            </div>
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className={styles.Container__item}>
          <div className={styles.inputContainer}>
            <label>Location</label>
            <div className={styles.selectBox}>
              <img src="/images/us.png" alt="flag" />
              <select
                value={location || "all"}
                name="location"
                onChange={handleChange}
              >
                <option value="all">
                  (GMT-8:00) Pacific Time (US & Canada)
                </option>
                <option value="leafy">(GMT-09:00) Alaska</option>
                <option value="berry"> (GMT-06:00) Central America</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
