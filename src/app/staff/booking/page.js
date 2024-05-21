"use client";

import NewBooking from "@/app/components/staff/newbooking";
import PendingBooking from "@/app/components/staff/pendingbookings";
import ProccedToDoctorBooking from "@/app/components/staff/proceedtodoctorbooking";
import TodayBooking from "@/app/components/staff/todaybookings";
import { CreateBookingContext } from "@/app/context/newbookingcontext";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Button, Tab } from "@mui/material";
import React, { useContext, useState } from "react";

function Bookings() {
  const { bookingpage, setBookingPage } = useContext(CreateBookingContext);
  const [value, setValue] = useState("");

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
          <TodayBooking />
        </TabPanel>
        <TabPanel value="2">
          <PendingBooking />
        </TabPanel>
        <TabPanel value="3">
          <ProccedToDoctorBooking />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default Bookings;
