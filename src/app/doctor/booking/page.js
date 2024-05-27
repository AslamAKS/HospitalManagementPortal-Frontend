"use client";

import PrescriptionPage from "@/app/components/doctor/prescription";
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
import moment from "moment";
import React, { Fragment, useContext, useEffect, useState } from "react";

function DoctorAppoiments() {
  const [appoiments, setAppoiments] = useState([]);
  const [appoiment,setAppoiment]=useState([])
  const {prescriptionPage,setPrescriptionPage,refreshBooking, setRefreshBooking}=useContext(CreateBookingContext);
  useEffect(() => {
    let todayDate = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss.SSS");

    let callBookingDetails = axios
      .get(`http://localhost:8000/booking?date=${todayDate}`)
      .then((responce) => {
        let ptd = responce.data.filter((item) => item.Status == "PTD");
        setAppoiments(ptd);
      });
  }, [refreshBooking]);

  let handlePTD=(patient)=>{
    setPrescriptionPage(true)
    setAppoiment(patient)
  }

  let handleCancel = (patient) => {
    let updateData = {
      id:patient.id,
      Status: "Rejected",
    };
    axios.put(`http://localhost:8000/booking`,updateData).then((responce)=>alert(responce.data))

    setRefreshBooking(!refreshBooking)
  };

  return (
    <Fragment>
      {prescriptionPage?<PrescriptionPage data={appoiment}/>:null}
    <TableContainer
      component={Paper}
      sx={{ height: "100vh", backgroundRepeat: "no-repeat" }}
    >
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
          {appoiments.map((patient) => (
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
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handlePTD(patient)}
                >
                  View
                </Button>
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleCancel(patient)}
                >
                  Cancel
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Fragment>
  );
}

export default DoctorAppoiments;
