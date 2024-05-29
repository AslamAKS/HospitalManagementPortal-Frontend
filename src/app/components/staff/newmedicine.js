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
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import axios from "axios";
import React, { useContext, useState } from "react";

function NewMedicine({ data }) {
  const { addMedicine, setAddMedicine, refreshMedicine, setRefreshMedicine } =
    useContext(CreateBookingContext);
  const [medicine, setMedicine] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [form, setForm] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);

  const handleClose = () => {
    setAddMedicine(false);
  };

  //   if (medicine == "" || manufacturer == "" || form == "" || expiryDate == "") {
  //     setIsDisabled(true);
  //   } else {
  //     setIsDisabled(false);
  //   }

  const handleAdd = () => {
    let medicineDetails = {
      Medicine: medicine,
      Manufacturer: manufacturer,
      Form: form,
      ExpiryDate: expiryDate,
    };

    let saveMedicine = axios
      .post(`http://localhost:8000/medicine`, medicineDetails)
      .then((responce) => alert(JSON.parse(responce.data)));
    setRefreshMedicine(!refreshMedicine);
    setAddMedicine(false);
  };

  return (
    <Dialog
      open={addMedicine}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title" sx={{ color: "green" }}>
        Add New Medicine
      </DialogTitle>
      <DialogContent >
        <DialogContentText sx={{display:'inline-block',justifyContent:'center',alignItems:'center'}}>
          <TextField
            required
            id="outlined-required"
            label="Medicine Name"
            sx={{ width: "300px", padding: "5px" }}
            onChange={(event) => setMedicine(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Manufacturer"
            sx={{ width: "300px", padding: "5px" }}
            onChange={(event) => setManufacturer(event.target.value)}
          />
          <TextField
            required
            id="outlined-required"
            label="Form"
            sx={{ width: "300px", padding: "5px" }}
            onChange={(event) => setForm(event.target.value)}
          />
          {/* <TextField
            required
            id="outlined-required"
            label="Expiry Date"
            sx={{ width: "300px" }}
            onChange={(event) => setExpiryDate(event.target.value)}
          /> */}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Expiry Date" sx={{ width: "300px",padding: "5px" }}/>
          </LocalizationProvider>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="error">
          Cancel
        </Button>
        <Button
          disabled={isDisabled}
          onClick={handleAdd}
          autoFocus
          color="success"
          size="large"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default NewMedicine;
