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
import axios from "axios";
import moment from "moment";
import React, { useContext, useState } from "react";

function NewBooking({ data, onRefresh }) {
  const { bookingpage, setBookingPage } = useContext(CreateBookingContext);
  const [patientDetails, setPatientDetails] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClose = () => {
    setBookingPage(false);
  };

  const handleFindUser = async (event) => {
    if (event.target.value.length === 6) {
      let patientId = event.target.value;
      let patientGETResponce = axios
        .get(`http://localhost:8000/patients/byId?pId=${patientId}`)
        .then((responce) => {
          if (responce.status === 200) setPatientDetails(responce.data);
          setIsDisabled(false)
        });
    } else {
      setPatientDetails("");
    }
  };

  const handleBook = () => {
    let todayDate =  moment().format('YYYY-MM-DD 00:00:00:000');

    if(patientDetails){
      let bookingDetails={
        BookingDate:todayDate,
        TokenNo: data,
        PatientId:patientDetails.PatientId,
        Status:"Booked",
        Comments:""
      }

      axios.post(`http://localhost:8000/booking`,bookingDetails).then((responce)=>console.log(responce.data))
    }
    onRefresh()
    setBookingPage(false);
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

          {patientDetails ? (
            patientDetails.PatientId ? (
              <Box sx={{ height: "100px" }}>
                <Typography variant="h5" component="h2" padding={2}>
                  TokenNo: {data}
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
                <Typography
                  variant="button"
                  component="h2"
                  padding={3}
                  sx={{ color: "red" }}
                >
                  "No Patient Found...!"
                </Typography>
              </Box>
            )
          ) : (
            <Box sx={{ height: "100px" }}></Box>
          )}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          disabled={isDisabled}
          onClick={handleBook}
          autoFocus
          color="success"
          size="large"
        >
          Book
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewBooking;
