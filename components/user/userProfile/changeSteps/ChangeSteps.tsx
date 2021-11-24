import React from "react";
import ButtonComponent from "../../../../theme/button/button.component";
import styles from "./ChangeSteps.module.scss";
import Container from "@mui/material/Container";

type ChangeStepsProps = {
  nextStep: () => void;
  prevStep: () => void;
  steps: number;
};

const ChangeSteps = ({ nextStep, prevStep, steps }: ChangeStepsProps) => {
  return (
    <Container maxWidth="md">
      <div className={styles.buttonContainer}>
        {steps === 1 ? null : (
          <button className={styles.backButton} onClick={prevStep}>
            Back
          </button>
        )}
        <ButtonComponent
          type="primary"
          value={steps === 4 ? "Finish" : "Next"}
          onClick={nextStep}
          style={{
            fontSize: "18px",
            borderRadius: "40px",
            margin: "0 30px",
            height: "62px",
            width: "135px",
          }}
        />
      </div>
    </Container>
  );
};

export default ChangeSteps;
