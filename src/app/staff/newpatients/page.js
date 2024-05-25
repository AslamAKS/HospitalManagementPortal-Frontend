"use client";

import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function NewPatients() {
  const [patientId, setPatientId] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [place, setPlace] = useState("");
  const [address, setAddress] = useState("");
  const [defaultId, setDefaultId] = useState("");
  const [existingUSer, setExistingUSer] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    let patientIdGET = axios
      .get("http://localhost:8000/patients/newpatient")
      .then((responce) => setDefaultId(responce.data + 1));
  }, []);

  const registerUser = async () => {
    if (
      (patientId.length === 6 || defaultId) &&
      name != "" &&
      age != "" &&
      contact != "" &&
      place != "" &&
      address != ""
    ) {
      let user = {
        PatientId: patientId ? patientId : defaultId,
        PatientName: name,
        Age: age,
        ContactNo: contact,
        Place: place,
        Address: address,
      };

      console.log(user);

      let saveUser = axios
        .post("http://localhost:8000/patients", user)
        .then((responce) => alert(`done,${responce.data}`))
        .catch(() => alert(`failed,${responce.data}`));

      console.log(saveUser);
    } else {
      if (patientId != "" && patientId.length !== 6) {
        setExistingUSer("Invalid Id, Must Have Exactly 6 Digits.");
      } else {
        setExistingUSer("Please Fill All Feilds.");
      }
    }
  };

  const handleFindUser = async (event) => {
    setDefaultId("");
    setPatientId(event.target.value);
    if (patientId && event.target.value.length === 6) {
      let patientId = event.target.value;
      let patientGETResponce = axios
        .get(`http://localhost:8000/patients/byId?pId=${patientId}`)
        .then((responce) => {
          if (responce.data) {
            setIsDisabled(true);
            setExistingUSer("This Id Alredy Exist...!");
          } else {
            setIsDisabled(false);
            setExistingUSer("");
          }
        });
    } else {
      setIsDisabled(false);
      setExistingUSer("");
    }
  };

  const cancel = () => {
    setPatientId("");
    setName("");
    setAge("");
    setContact("");
    setPlace("");
    setAddress("");
    setDefaultId("");
    setExistingUSer("");
    setIsDisabled(false)
  };

  return (
    <Container
      maxWidth
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(354deg, rgba(254,255,110,1) 0%, rgba(255,255,255,1) 78%)",
      }}
    >
      <Stack
        spacing={2}
        height={"80vh"}
        width={"130vh"}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "black",
          boxShadow: "0 4px 8px 0 rgba(0,0,0,0,0.2)",
          padding: 5,
        }}
      >
        <Typography variant="h3" padding={3}>New Patient</Typography>

        <TextField
          required
          id="outlined"
          label="Patient ID"
          // defaultValue={defaultId}
          value={defaultId ? defaultId : patientId}
          onChange={handleFindUser}
        />
        <Box sx={{ height: "25px" }}>
          <Typography
            variant="button"
            component="h2"
            padding={3}
            sx={{ color: "red" }}
          >
            {existingUSer}
          </Typography>
        </Box>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }}>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              fullWidth
              autoFocus
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Age"
              fullWidth
              value={age}
              onChange={(event) => {
                setAge(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Contact No"
              fullWidth
              value={contact}
              onChange={(event) => {
                setContact(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Place"
              fullWidth
              value={place}
              onChange={(event) => {
                setPlace(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="outlined-multiline-static"
              label="Address"
              multiline
              rows={4}
              fullWidth
              value={address}
              onChange={(event) => {
                setAddress(event.target.value);
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button variant="contained" color="error" onClick={cancel}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="success"
              onClick={registerUser}
              disabled={isDisabled}
            >
              Register
            </Button>
          </Grid>
          <Grid item xs={12} sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}>
            <Link href="newpatients/allpatients">
              <Chip label="All Patients" color="success" onClick={handleFindUser} />
            </Link>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
}

export default NewPatients;
