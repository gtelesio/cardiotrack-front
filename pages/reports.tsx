import * as React from "react";
import Head from "next/head";
import { LayoutDefault } from "src/layouts";
import { NextPageWithLayout } from "src/types/pages/pages.type";
import { Grid, Typography } from "@mui/material";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from "react-chartjs-2";

type Measure = {
  createdAt: Date;
  id: string;
  movingAverage: number | null;
  pressure: number;
  rolled: number;
  updatedAt: Date;
};
type DataLine = {
  labels: any;
  datasets: any[];
};
const Reports: NextPageWithLayout = () => {
  const [error, setError] = React.useState("");
  const [options, setOptions] = React.useState({
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  });
  const [labels, setLabels] = React.useState<Date[]>([]);
  const [data, setData] = React.useState<DataLine>({
    labels,
    datasets: [],
  });
  const getMeasuresService = async () => {
    try {
      const req = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/measures?limit=1000&orderBy=createdAt&orderType=desc`,
        {
          method: "GET",
        }
      );
      const measuresData: Measure[] = await req.json();
      const pressureData = measuresData.map((measure) => measure.pressure);
      const rolledData = measuresData.map((measure) => measure.rolled);
      const movingAverageData = measuresData.map(
        (measure) => measure.movingAverage
      );
      const labels = measuresData.map((measure) => measure.createdAt);
      setLabels(labels);
      setData({
        labels,
        datasets: [
          {
            label: "Pressure",
            data: pressureData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Rolled",
            data: rolledData,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
          {
            label: "Moving Average",
            data: movingAverageData,
            borderColor: "rgb(23, 112, 135)",
            backgroundColor: "rgba(23, 112, 135, 0.5)",
          },
        ],
      });
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
        <title>Cardiotrack - Reports</title>
      </Head>
      <Grid
        container
        spacing={2}
        sx={{ marginTop: "25px", marginBottom: "25px" }}
      >
        <Grid item xs={2} lg={2}></Grid>
        <Grid item xs={8} lg={8}>
          <Typography
            textAlign={`left`}
            variant={`h4`}
            marginTop={`25px`}
            marginBottom={`25px`}
          >
            Reports
          </Typography>
          {data.datasets ? <Line options={options} data={data} /> : ""}
        </Grid>
        <Grid item xs={2} lg={2}></Grid>
      </Grid>
    </React.Fragment>
  );
};

Reports.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default Reports;
