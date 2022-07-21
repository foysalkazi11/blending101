import React, { Fragment, useState } from "react";
import Textfield from "../../../organisms/Forms/Textfield.component";

const Settings = () => {
  const [showForm, setShowForm] = useState(false);
  return <div>Settings{showForm ? <ChallengeForm /> : <ChallengeList />}</div>;
};

const ChallengeList = () => {
  return (
    <Fragment>
      <div className="row">
        <div className="col-5">
          <h5>Challenge Name</h5>
        </div>
        <div className="col-3">
          <h5>Start Date</h5>
        </div>
        <div className="col-2">
          <h5>Days</h5>
        </div>
        <div className="col-1">&nbsp;</div>
      </div>
      <div className="row">
        <div className="col-5">
          <Textfield defaultValue="30 Day Challenge" disabled />
        </div>
        <div className="col-3">
          <Textfield defaultValue="May 1, 2022" disabled />
        </div>
        <div className="col-2">
          <Textfield defaultValue="30" disabled />
        </div>
        <div className="col-1"></div>
      </div>
    </Fragment>
  );
};

const ChallengeForm = () => {
  return <div>Challene</div>;
};

export default Settings;
