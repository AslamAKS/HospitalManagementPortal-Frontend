"use client";

import { CreateBookingContext } from "@/app/context/newbookingcontext";
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
import { useContext, useEffect, useState } from "react";

function PendingBooking({data}) {
  const { refreshBooking, setRefreshBooking } = useContext(CreateBookingContext);

  const [pending, setPending] = useState([])

  useEffect(() => {
    
    let Pending = data.filter((item)=> item.Status=='Pending')
    setPending(Pending)
  }, [data])
  

  let handlePTD = (patient) => {
    let updateData = {
      id:patient.id,
      Status: "PTD",
    };
    axios.put(`http://localhost:8000/booking`,updateData).then((responce)=>alert(responce.data))

    setRefreshBooking(!refreshBooking)
  };

  let handleCancel = (patient) => {
    let updateData = {
      id:patient.id,
      Status: "Canceled",
    };
    axios.put(`http://localhost:8000/booking`,updateData).then((responce)=>alert(responce.data))

    setRefreshBooking(!refreshBooking)
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
            {pending.map((patient) => (
              <TableRow
                key={patient.patient_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.TokenNo}
                </TableCell>
                <TableCell align="left">{patient.PatientId}</TableCell>
                <TableCell align="left">{patient.Patient.PatientName}</TableCell>
                <TableCell align="left">
                <Button variant="contained" color="success" onClick={()=>handlePTD(patient)}>Proceed To Doctor</Button>
                </TableCell>
                <TableCell align="left">
                <Button variant="contained" color="error" onClick={()=>handleCancel(patient)}>Cancel</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default PendingBooking;
