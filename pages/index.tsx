import * as React from "react";
import Head from "next/head";
import { LayoutDefault } from "src/layouts";
import { NextPageWithLayout } from "src/types/pages/pages.type";
import { Grid, Typography } from "@mui/material";

const Home: NextPageWithLayout = () => {
  return (
    <React.Fragment>
      <Head>
        <title>Cardiotrack</title>
      </Head>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "25px", marginBottom: "25px" }}
      >
        <Grid item xs={12}>
          <Typography
            textAlign={`center`}
            variant={`h4`}
            marginTop={`25px`}
            marginBottom={`25px`}
          >
            Welcome
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Home;
