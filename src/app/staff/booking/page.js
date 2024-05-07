"use client";

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

function Booking() {
  // const [p,setP]=useState([])

  let patients = [
    {
      token_no: "1",
      patient_name: "Aslam",
      patient_id: "286693",
    },
    {
      token_no: "2",
      patient_name: "Aslam",
      patient_id: "286693",
    },
    {
      token_no: "3",
      patient_name: "Aslam",
      patient_id: "286693",
    },
  ];
  //   setP(patient)

  //   const handleProceed=(token_no)=>{
  //     patient = patient.filter(item => item.token_id !== token_no);
  //     setP(patient)
  //   }

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
            {patients.map((patient) => (
              <TableRow
                key={patient.patient_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.token_no}
                </TableCell>
                <TableCell align="left">{patient.patient_id}</TableCell>
                <TableCell align="left">{patient.patient_name}</TableCell>
                <TableCell align="left">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    //   onClick={handleProceed(patient.patient_id)}
                  >
                    Proceed To Doctor
                  </a>
                </TableCell>
                <TableCell align="left">
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    //   onClick={handleProceed(patient.patient_id)}
                  >
                    Move To Pending
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Booking;
