import React from "react";
import { FormProvider } from "react-hook-form";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

export const defaultPlan = {
  planName: "",
  description: "",
};

const PlanForm = ({ methods }) => {
  return (
    <FormProvider {...methods}>
      <div style={{ background: "#fff", padding: 10, marginBottom: 10 }}>
        <Textfield name="planName" placeholder="Plan Name" className="mb-10" />
        <Textarea name="description" placeholder="Plan Description" />
      </div>
    </FormProvider>
  );
};

export default PlanForm;
