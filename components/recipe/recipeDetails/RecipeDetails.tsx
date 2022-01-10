import React from "react";
import { Container, Grid } from "@mui/material";
import AContainer from "../../../containers/A.container";
import LeftSide from "./leftSide/LeftSide";
import RightSide from "./rightSide/RightSide";
import Center from "./center/Center";

const RecipeDetails = () => {
  return (
    <div style={{ margin: "40px auto" }}>
      <AContainer
        showHeader={true}
        logo={true}
        headerTitle="Blend Recipe"
        showRighTray={true}
        commentsTray={true}
      >
        <Container maxWidth="xl">
          <Grid container spacing={1}>
            <Grid item xs={12} lg={3}>
              <LeftSide />
            </Grid>
            <Grid container item xs={12} lg={9} spacing={1}>
              <Grid item xs={9}>
                <Center />
              </Grid>
              <Grid item xs={3}>
                <RightSide />
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </AContainer>
    </div>
  );
};

export default RecipeDetails;

// direction={{ xs: "column-reverse", xl: "row" }}
