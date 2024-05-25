"use client";

import {
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
import { useEffect, useState } from "react";

function TodayBooking({ data, onRefresh }) {
  const [booked, setBooked] = useState([])

  useEffect(()=>{

    let Booked = data.filter((item) => item.Status == "Booked");
    setBooked(Booked)

  },[data])


  let handlePTD = (patient) => {
    let updateData = {
      BookingDate: patient.BookingDate,
      TokenNo:patient.TokenNo,
      PatientId:patient.PatientId,
      Status: "PTD",
      Commets:patient.Commets
    };
    axios.put(`http://localhost:8000/booking`,updateData).then((responce)=>alert(responce.data))

    onRefresh()
  };

  let handlePending = (patient) => {
    let updateData = {
      BookingDate: patient.BookingDate,
      TokenNo:patient.TokenNo,
      PatientId:patient.PatientId,
      Status: "Pending",
      Commets:patient.Commets
    };
    axios.put(`http://localhost:8000/booking`,updateData).then((responce)=>alert(responce.data))

    onRefresh()
  };

  return (
    <div className="overflow-x-auto">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Booking No</TableCell>
              <TableCell align="left">ID</TableCell>
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Action</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {booked.map((patient) => (
              <TableRow
                key={patient.patient_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.TokenNo}
                </TableCell>
                <TableCell align="left">{patient.PatientId}</TableCell>
                <TableCell align="left">
                  {patient.Patient.PatientName}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="success"
                    onClick={()=>handlePTD(patient)}
                  >
                    Proceed To Doctor
                  </Button>
                </TableCell>
                <TableCell align="left">
                  <Button variant="contained" color="warning" onClick={()=>handlePending(patient)}>
                    Move To Pending
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TodayBooking;
