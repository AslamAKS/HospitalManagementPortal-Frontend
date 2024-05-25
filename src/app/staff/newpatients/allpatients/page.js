"use client";

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
import React, { useEffect, useState } from "react";

function AllPatients() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/patients`)
      .then((responce) => setPatients(responce.data))
      .catch(() => alert("Something went wrong"));
  }, []);

  const handle=()=>{}

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
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Patient ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Age</TableCell>
              <TableCell align="left">Contact No</TableCell>
              <TableCell align="left">Place</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((patient) => (
              <TableRow
                key={patient.patient_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.PatientId}
                </TableCell>
                <TableCell align="left">{patient.PatientName}</TableCell>
                <TableCell align="left">{patient.Age}</TableCell>
                <TableCell align="left">{patient.ContactNo}</TableCell>
                <TableCell align="left">{patient.Place}</TableCell>
                <TableCell align="left">{patient.Address}</TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="success" onClick={handle}>
                    Action1
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="warning" onClick={handle}>
                    Action2
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

export default AllPatients;
