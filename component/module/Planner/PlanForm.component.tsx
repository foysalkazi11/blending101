import React from "react";
import Textarea from "../../organisms/Forms/Textarea.component";
import Textfield from "../../organisms/Forms/Textfield.component";

const PlanForm = () => {
  return (
    <div style={{ background: "#fff", padding: 10, marginBottom: 10 }}>
      <Textfield placeholder="Plan Name" className="mb-10" />
      <Textarea placeholder="Plan Description" name="description" />
    </div>
  );
};

export default PlanForm;
