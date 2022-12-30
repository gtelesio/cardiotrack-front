import * as React from "react";
import Head from "next/head";
import { LayoutDefault } from "src/layouts";
import { NextPageWithLayout } from "src/types/pages/pages.type";
import {
  CircularProgress,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

type Measure = {
  createdAt: Date;
  id: string;
  movingAverage: number | null;
  pressure: number;
  rolled: number;
  updatedAt: Date;
};

const Measures: NextPageWithLayout = () => {
  const [error, setError] = React.useState("");
  const [measures, setMeasures] = React.useState<Measure[]>([]);
  const getMeasuresService = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/measures?limit=1000&orderBy=createdAt&orderType=desc`,
        {
          method: "GET",
        }
      );
      setMeasures(await req.json());
    } catch (error) {
      setError(JSON.stringify(error));
    }
  };

  React.useEffect(() => {
    getMeasuresService();
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>Cardiotrack - Measures</title>
      </Head>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "25px", marginBottom: "25px" }}
      >
        <Grid item xs={2} lg={4}></Grid>
        <Grid item xs={8} lg={4}>
          <Typography
            textAlign={`left`}
            variant={`h4`}
            marginTop={`25px`}
            marginBottom={`25px`}
          >
            Measures
          </Typography>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {measures.length ? (
              measures.map((measure: Measure, idx) => {
                return (
                  <ListItem key={`${measure}_${idx}`}>
                    <ListItemText
                      primary={`Id : ${measure.id} - Rolled : ${measure.rolled} - Pressure : ${measure.pressure}`}
                      secondary={`Created At : ${measure.createdAt}`}
                    />
                  </ListItem>
                );
              })
            ) : (
              <CircularProgress />
            )}
          </List>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </React.Fragment>
  );
};

Measures.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Measures;
