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

function ProccedToDoctorBooking({data,onRefresh}) {
  
  let ptd = data.filter((item)=> item.Status=='PTD')

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
            {ptd.map((patient) => (
              <TableRow
                key={patient.patient_id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {patient.TokenNo}
                </TableCell>
                <TableCell align="left">{patient.PatientId}</TableCell>
                <TableCell align="left">{patient.Patient.PatientName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ProccedToDoctorBooking;
