import React from "react";
import AContainer from "../../containers/A.container";

const Home = () => {
  return (
    <AContainer
      headerTitle="Home"
      logo={true}
      showRighTray={true}
      showSidebar={false}
      headerFullWidth={true}
    >
      Home
    </AContainer>
  );
};

export default Home;
