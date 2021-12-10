import { Grid } from "@mui/material";
import React from "react";
import ButtonComponent from "../../../../../theme/button/button.component";
import UserPlan from "../../../../../theme/membership/plan/UserPlan";

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

type UserPlanProps = {
  plan: string;
  handleChange: (name: string, value: string) => void;
};

const Plan = ({ plan, handleChange }: UserPlanProps) => {
  return (
    <div>
      <Grid container spacing={2}>
        {userPlan?.map((item, index) => {
          const { label, value, amount } = item;
          return (
            <Grid key={index} item xs={12} sm={6} xl={4}>
              <UserPlan
                plan={plan}
                handleChange={handleChange}
                label={label}
                value={value}
                amount={amount}
              />
            </Grid>
          );
        })}
      </Grid>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
        }}
      >
        <ButtonComponent
          type="primary"
          value="Update Profile"
          style={{
            borderRadius: "30px",
            height: "48px",
            width: "180px",
          }}
        />
      </div>
    </div>
  );
};

export default Plan;
