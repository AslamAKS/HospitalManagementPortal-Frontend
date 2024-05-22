"use client"

import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

function NewPatients() {

  const [patientId,setPatientId]=useState("");
  const [name,setName]=useState("");
  const [age,setAge]=useState("");
  const [contact,setContact]=useState("");
  const [place,setPlace]=useState("");
  const [address,setAddress]=useState("");

  const registerUser=async()=>{
    let user = {
      PatientId:patientId,
      PatientName:name,
      Age:age,
      ContactNo:contact,
      Place:place,
      Address:address
    }

    console.log(user);

    let saveUser=await fetch('http://localhost:8000/patients',{
      method:'POST',
      body:JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json',
      }
    })

    console.log(saveUser);

    if(saveUser.status==400) alert(await saveUser.json())
    if(saveUser.status==200) alert('done')
  }

  const cancel=()=>{
    setPatientId('')
    setName('');
    setAge('')
    setContact('')
    setPlace('')
    setAddress('')
  }

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
          boxShadow:'0 4px 8px 0 rgba(0,0,0,0,0.2)',
            padding:5
        }}
      >
        <Typography variant="h3">New Patient</Typography>
        <TextField
          required
          id="outlined-disabled"
          label="Patient ID"
          // defaultValue="Patient ID"
          value={patientId}
              onChange={(event) => {
                setPatientId(event.target.value);
              }}
        />
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
          <Grid item xs={6} >
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
          <Grid item xs={12} gap={'10px'}>
          <Button variant="contained" color="error" onClick={cancel}>Cancel</Button>
        <Button variant="contained" color="success" onClick={registerUser}>Register</Button>
          </Grid>
        </Grid>
        
      </Stack>
    </Container>
    // </div>
  );
}

export default NewPatients;
