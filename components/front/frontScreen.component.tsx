import React from "react";
import ToggleScreens from "./toggleElement/toggleScreens.component";
import ToStoryCard from "./toStoryCard/toStoryCard.component";

const FrontScreen = () => {
  return (
    <>
      <ToggleScreens />
      <ToStoryCard/>
    </>
  );
};

export default FrontScreen;
