"use client";

import NewMedicine from "@/app/components/staff/newmedicine";
import { CreateBookingContext } from "@/app/context/newbookingcontext";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

function AddMedicine() {
  const { addMedicine, setAddMedicine, refreshMedicine, setRefreshMedicine } =
    useContext(CreateBookingContext);
  const [medicines, setMedicines] = useState([]);

  useEffect(() => {
    let callMedicineDetails = axios
      .get(`http://localhost:8000/medicine`)
      .then((responce) => {
        setMedicines(responce.data);
      });
  }, [refreshMedicine]);

  const newMedicine = () => {
    setAddMedicine(true);
  };

  const handleEdit = (medicine) => {};

  const handleRemove = (medicine) => {};

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundRepeat: "no-repeat",
        width: "100%",
        color: "white",
        textAlign: "center",
        padding: "10px",
      }}
    >
      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{ marginBottom: "10px" }}
        onClick={newMedicine}
      >
        Add New Medicine
      </Button>
      {addMedicine ? <NewMedicine /> : null}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell align="left">Medicine Name</TableCell>
              <TableCell align="left">Manufacturer</TableCell>
              <TableCell align="left">Form</TableCell>
              <TableCell align="left">Expiry Date</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicines.map((medicine, index) => (
              <TableRow
                key={medicine.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index}
                </TableCell>
                <TableCell align="left">{medicine.Medicine}</TableCell>
                <TableCell align="left">{medicine.Manufacturer}</TableCell>
                <TableCell align="left">{medicine.Form}</TableCell>
                <TableCell align="left">{medicine.ExpiryDate}</TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleEdit(medicine)}
                  >
                    Edit
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => handleRemove(medicine)}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default AddMedicine;
