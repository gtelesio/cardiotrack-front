import { Box, Grid } from "@mui/material";
import { Container } from "@mui/system";
import Head from "next/head";
import * as React from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";
import { Layout } from "src/types/layouts/layouts.type";

export const LanguagesContext = React.createContext({});

export const LayoutDefault = ({ children }: Layout): React.ReactElement => {
  return (
    <React.Fragment>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
      </Head>
      <Box>
        <React.Fragment>
          <Header></Header>
          <Container>
            <Grid>{children}</Grid>
          </Container>
          <Footer></Footer>
        </React.Fragment>
      </Box>
    </React.Fragment>
  );
};
