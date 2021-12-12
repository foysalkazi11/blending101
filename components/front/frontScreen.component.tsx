import React from "react";
import Frontbanner from "../../theme/banners/frontbanner/frontbanner.component";
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
