"use client";

import { Box, Card, CardContent, Typography } from "@mui/material";
import { LiaStethoscopeSolid } from "react-icons/lia";
import { FaHospitalUser } from "react-icons/fa6";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [wish, setWish] = useState("");

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setWish("Good Morning");
    } else if (currentHour >= 12 && currentHour < 17) {
      setWish("Good Afternoon");
    } else if (currentHour >= 17 && currentHour < 21) {
      setWish("Good Evening");
    } else {
      setWish("Good Night");
    }
  }, []);

  return (
    <Box
      height="100vh"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <Typography variant="h1" color={"black"} width={600}>
        {wish}
      </Typography>
      <Link href="/doctor">
        <Card
          sx={{
            background:
              "linear-gradient(360deg, rgba(171,218,255,1) 30%, rgba(242,242,242,1) 90%)",
            width: 300,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 5,
            boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <LiaStethoscopeSolid size={150} />
            Doctor
          </CardContent>
        </Card>
      </Link>
      <Link href="/staff">
        <Card
          sx={{
            background:
              "linear-gradient(360deg, rgba(171,218,255,1) 30%, rgba(242,242,242,1) 90%)",
            width: 300,
            height: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: 5,
            boxShadow: "0 5px 10px 0 rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent>
            <FaHospitalUser size={150} />
            Staff
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
}
