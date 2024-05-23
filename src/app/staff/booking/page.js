"use client";

import NewBooking from "@/app/components/staff/newbooking";
import PendingBooking from "@/app/components/staff/pendingbookings";
import ProccedToDoctorBooking from "@/app/components/staff/proceedtodoctorbooking";
import TodayBooking from "@/app/components/staff/todaybookings";
import { CreateBookingContext } from "@/app/context/newbookingcontext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";

function Bookings() {
  const { bookingpage, setBookingPage } = useContext(CreateBookingContext);
  const [value, setValue] = useState("1");
  const [bookings, setBookings] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [tokenNo, setTokenNO] = useState(0);

  useEffect(() => {
    let todayDate = moment().startOf('day').format('YYYY-MM-DD HH:mm:ss.SSS')

    let callBookingDetails = axios
      .get(`http://localhost:8000/booking?date=${todayDate}`)
      .then((responce) => {
        console.log(responce.data);
        setBookings(responce.data);
        let lastElement = responce.data.at(-1);
        if (lastElement) {
          console.log("yes last elment");
          let tokenNumber = lastElement.TokenNo + 1;
          setTokenNO(tokenNumber);
        } else {
          setTokenNO(1);
          console.log("no last elment");
        }
      });
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle the refresh state to trigger useEffect
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const newBooking = () => {
    setBookingPage(true);
  };

  return (
    <Box
      sx={{
        height:'100vh',
        backgroundRepeat:"no-repeat",
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
      {bookingpage ? (
        <NewBooking data={tokenNo} onRefresh={handleRefresh} />
      ) : null}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Today Booking" value="1" />
            <Tab label="Pending Booking" value="2" />
            <Tab label="Proceed To Doctor" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <TodayBooking data={bookings} onRefresh={handleRefresh} />
        </TabPanel>
        <TabPanel value="2">
          <PendingBooking data={bookings} onRefresh={handleRefresh} />
        </TabPanel>
        <TabPanel value="3">
          <ProccedToDoctorBooking data={bookings} onRefresh={handleRefresh} />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Bookings;
