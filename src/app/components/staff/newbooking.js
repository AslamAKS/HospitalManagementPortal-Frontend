"use client";

import { CreateBookingContext } from "@/app/context/newbookingcontext";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";

function NewBooking() {
  const { bookingpage, setBookingPage } = useContext(CreateBookingContext);
  const [patientDetails, setPatientDetails] = useState("");

  const handleClose = () => {
    setBookingPage(false);
  };

  const handleFindUser = async (event) => {
    if (event.target.value.length === 6) {
      let patientId = event.target.value;
      let patientGETResponce = await fetch(
        `http://localhost:8000/patients/byId?pId=${patientId}`,
        {
          method: "GET",
        }
      );
      if(patientGETResponce.status==200){
        console.log(patientGETResponce.status);

        let patient = await patientGETResponce.json();
        setPatientDetails(patient);
      }else{
        console.log(patientGETResponce.status);
        setPatientDetails('No Data Found...!');
      }
      
    } else {
      setPatientDetails("");
    }
  };

  return (
    <Dialog
      open={bookingpage}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ color: "green" }}>
        New Booking
      </DialogTitle>
      <DialogContent>
        <DialogContentText padding={5} textAlign={"center"}>
          <TextField
            required
            id="outlined-required"
            label="Patient ID"
            // type="number"
            inputProps={{ maxLength: 6 }}
            sx={{ width: "300px" }}
            // value={age}
            onChange={handleFindUser}
          />

          {patientDetails? patientDetails.PatientId ? (
            <Box sx={{ height: "100px" }}>
              <Typography variant="h5" component="h2" padding={2}>
                Token No: 01
              </Typography>
              <Typography
                variant="button"
                component="h1"
                sx={{ color: "green" }}
              >
                Name: {patientDetails.PatientName}
              </Typography>
              <Typography variant="button" component="h2">
                Place: {patientDetails.Place}
              </Typography>
            </Box>
          ) : (
            <Box sx={{ height: "100px" }}>
              <Typography variant="button" component="h2" padding={3} sx={{ color: "red" }}>
                {patientDetails}
              </Typography>
            </Box>
          ) : <Box sx={{ height: "100px" }}>
          
        </Box>}

        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button onClick={handleClose} autoFocus color="success" size="large">
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewBooking;
