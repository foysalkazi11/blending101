import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import UserPlan from "../../../../theme/membership/plan/UserPlan";
import styles from "./Membership.module.scss";

const userPlan = [
  {
    label: "Free",
    value: "free",
    amount: 0,
  },
  {
    label: "Supporter",
    value: "supporter",
    amount: 5,
  },
  {
    label: "Founder",
    value: "founder",
    amount: 14,
  },
];

type MembershipProps = {
  userData: any;
  setUserData: any;
};

const Membership = ({ userData, setUserData }: MembershipProps) => {
  const [toggle, setToggle] = useState(1);
  const { plan } = userData?.membership;

  const handleChange = (name, value) => {
    setUserData((pre) => {
      return {
        ...pre,
        membership: {
          ...pre.about,
          [name]: value,
        },
      };
    });
  };

  const menuRef = useRef<HTMLDivElement | null>(null);

  const handleToggle = (no: number) => {
    if (no === 1) {
      menuRef.current.style.left = "0";
    } else {
      menuRef.current.style.left = "50%";
    }
    setToggle(no);
  };

  return (
    <div>
      <div className={styles.topMenuContainer}>
        <div className={styles.topMenu}>
          <div className={styles.active} ref={menuRef}></div>
          <div
            className={`${styles.menu} ${
              toggle === 1 ? styles.activeMenu : ""
            }`}
            onClick={() => handleToggle(1)}
          >
            Plan
          </div>
          <div
            className={`${styles.menu} ${
              toggle === 2 ? styles.activeMenu : ""
            }`}
            onClick={() => handleToggle(2)}
          >
            Transactions
          </div>
        </div>
      </div>
      <div className={styles.userPlan}>
        <Grid container spacing={2}>
          {userPlan?.map((plan, index) => {
            const { label, value, amount } = plan;
            return (
              <Grid key={index} item xl={4}>
                <UserPlan
                  label={label}
                  value={value}
                  plan={userData?.membership?.plan}
                  amount={amount}
                  handleChange={handleChange}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Membership;
