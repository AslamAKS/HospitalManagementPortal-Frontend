"use client";

import NewBooking from "@/app/components/staff/newbooking";
import PendingBooking from "@/app/components/staff/pendingbookings";
import ProccedToDoctorBooking from "@/app/components/staff/proceedtodoctorbooking";
import TodayBooking from "@/app/components/staff/todaybookings";
import { CreateBookingContext } from "@/app/context/newbookingcontext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

function Bookings() {
  const { bookingpage, setBookingPage } = useContext(CreateBookingContext);
  const [value, setValue] = useState("1");
  const [bookings, setBookings] = useState([]);
  const [ptd, setPtd] = useState([]);
  const [pending, setPending] = useState([]);

  useEffect(async () => {
    let todayDate = moment().utc().startOf('day').format('YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
    let selectBookingDetails = await fetch(`http://localhost:8000/booking?date=${todayDate}`,{
      method:'GET'
    });
    let bookingDetails = await selectBookingDetails.json()
    console.log('-----------------',bookingDetails);
    let Booked = bookingDetails.filter((item)=> item.Status=='Booked')
    setBookings(Booked)

    let PTD = bookingDetails.filter((item)=> item.Status=='PTD')
    setPtd(PTD)

    let Pending = bookingDetails.filter((item)=> item.Status=='Pending')
    setPending(Pending)

    console.log('how data come ? ',bookings);
  }, [bookings,ptd,pending]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newBooking = () => {
    setBookingPage(true);
  };

  return (
    <Box
      sx={{
        height: "100vh",
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
        onClick={newBooking}
      >
        New Booking
      </Button>
      {bookingpage ? <NewBooking /> : null}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Today Booking" value="1" />
            <Tab label="Pending Booking" value="2" />
            <Tab label="Proceed To Doctor" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TodayBooking data={bookings}/>
        </TabPanel>
        <TabPanel value="2">
          <PendingBooking data={ptd}/>
        </TabPanel>
        <TabPanel value="3">
          <ProccedToDoctorBooking data={pending}/>
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Bookings;
