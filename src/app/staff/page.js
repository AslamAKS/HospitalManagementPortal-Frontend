import React from "react";
import { Card, CardContent, Stack, Typography } from "@mui/material";
import Link from "next/link";

function StaffHomePage() {
  let menus = [
    {
      menu: "Booking",
      api: "/staff/booking",
      color: "#029600",
    },
    {
      menu: "Pending Booking",
      api: "/staff/pendingbooking",
      color: "#E5E102",
    },
    {
      menu: "New Patient",
      api: "/staff/newpatients",
      color: "#02E5E1",
    },
    {
      menu: "Medicine",
      api: "/staff/patientmedicine",
      color: "#02E58C",
    },
    {
      menu: "Booking History",
      api: "/staff/bookinghistory",
      color: "#81E502",
    },

    {
      menu: "Add Medicine",
      api: "/staff/addmedicines",
      color: "#02D3E5",
    },
  ];

  return (
    <Stack
      spacing={2}
      height={"100vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        background:
          "linear-gradient(354deg, rgba(254,255,110,1) 0%, rgba(255,255,255,1) 78%)",
      }}
    >
      {menus.map((item) => (
        <Link href={item.api}>
          <Card
            variant="outlined"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "10vh",
              width: "90vh",
              borderRadius: "10px",
              boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.2)",
            }}
          >
            <CardContent>
              <Typography variant="h5" >{item.menu}</Typography>
            </CardContent>
          </Card>
        </Link>
      ))}
    </Stack>
  );
}

export default StaffHomePage;
