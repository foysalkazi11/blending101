import { Grid } from "@mui/material";
import React, { useRef, useState } from "react";
import UserPlan from "../../../../theme/membership/plan/UserPlan";
import styles from "./Membership.module.scss";

const Membership = () => {
  const [toggle, setToggle] = useState(1);

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
          <Grid item xl={4}>
            <UserPlan />
          </Grid>
          <Grid item xl={4}>
            <UserPlan />
          </Grid>
          <Grid item xl={4}>
            <UserPlan />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Membership;
