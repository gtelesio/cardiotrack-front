import * as React from "react";
import Head from "next/head";
import { LayoutDefault } from "src/layouts";
import { NextPageWithLayout } from "src/types/pages/pages.type";
import {
  Button,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Alert from "src/components/alert";

type FormData = {
  pressure: number;
  rolled: number;
};

const formDataDefaultValue: FormData = {
  pressure: 0,
  rolled: 0,
};

const CreateMeasure: NextPageWithLayout = () => {
  const [error, setError] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] =
    React.useState<FormData>(formDataDefaultValue);

  const createMeasureService = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/measures`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      setError(JSON.stringify(error));
    }
    setOpen(true);
  };

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: parseInt(e.target.value),
    });
  };

  const handleSubmit = async () => {
    if (formData.pressure && formData.rolled) {
      await createMeasureService();
      setFormData(formDataDefaultValue);
    }
  };

  return (
    <React.Fragment>
      <Head>
        <title>Cardiotrack - Create Measure</title>
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
            Create Measure
          </Typography>
          <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
            <TextField
              type="number"
              id="rolled"
              label="Rolled"
              onChange={handleChangeForm}
              value={formData.rolled}
            />
          </FormControl>
          <FormControl sx={{ width: "100%", marginBottom: "10px" }}>
            <TextField
              type="number"
              id="pressure"
              label="Pressure"
              onChange={handleChangeForm}
              value={formData.pressure}
            />
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Create
          </Button>
          <Alert
            isOpen={open}
            disagree={`Disagree`}
            agree={`Agree`}
            message={error ? error : `Successful creation`}
            key={`alert-${open}`}
            onClose={(isOpen: boolean) => {
              setOpen(isOpen);
            }}
            title={`Alert`}
          ></Alert>
        </Grid>
        <Grid item xs={2} lg={4}></Grid>
      </Grid>
    </React.Fragment>
  );
};

CreateMeasure.getLayout = function getLayout(page: React.ReactElement) {
  return <LayoutDefault>{page}</LayoutDefault>;
};

export default CreateMeasure;
