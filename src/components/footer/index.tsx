import { Grid, Typography } from "@mui/material";
import * as React from "react";
export const Footer = () => {
  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography textAlign={`center`}>
            Cardiotrack © {new Date().getFullYear()} - By Gonzalo Patricio
            Telesio
          </Typography>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
