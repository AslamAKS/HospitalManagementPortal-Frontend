"use client";

import * as React from "react";
import Stack from "@mui/material/Stack";
import {
  Button,
  Card,
  Chip,
  Grid,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

export default function DirectionStack() {
  const [intrested, setIntrested] = React.useState("");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [mobile, setMobile] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [subject, setSubject] = React.useState("");

  const children = [
    <ToggleButton value="UI UX Design" key="center" sx={{ color: "white" }}>
      UI UX Design
    </ToggleButton>,
    <ToggleButton value="Web Tech" key="center" sx={{ color: "white" }}>
      Web Tech
    </ToggleButton>,
    <ToggleButton value="Mobile App" key="center" sx={{ color: "white" }}>
      Mobile App
    </ToggleButton>,
    <ToggleButton
      value="Digital Marketing"
      key="center"
      sx={{ color: "white" }}
    >
      Digital Marketing
    </ToggleButton>,
    <ToggleButton value="SEO" key="center" sx={{ color: "white" }}>
      SEO
    </ToggleButton>,
    <ToggleButton value="Other" key="center" sx={{ color: "white" }}>
      Other
    </ToggleButton>,
  ];

  const handleChange = (event, newIntrest) => {
    setIntrested(newIntrest);
  };

  const sendEmail = async () => {
    console.log("in submit");

    let mailbody = {
      name,
      email,
      mobile,
      intrested,
      subject,
      message,
    };

    console.log(mailbody);

    let mailSentStatus = await fetch("/api/sendMail", {
      method: "POST",
      body: JSON.stringify(mailbody),
      headers: { "Content-Type": "application/json" },
    });

    // Handle success or error messages from the server
    // alert(mailsent); // Replace with appropriate UI feedback
    console.log(mailSentStatus);
    setName("");
    setEmail("");
    setMessage("");
    setMobile("");
    setIntrested("");
    setSubject("");
  };

  return (
    <Stack
      direction="row"
      spacing={2}
      height={"100vh"}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
      }}
    >
      <Card
        sx={{
          textAlign: "left",
          color: "white",
          backgroundColor: "#1A2027",
          height: "70vh",
          width: "400px",
          padding: "15px",
          rowGap: "10px",
          backgroundColor: "transparent",
        }}
      >
        <Typography variant="h3" component="div">
          Let's Create
        </Typography>
        <Typography variant="h3" component="div">
          Experiences!
        </Typography>
        <Typography variant="h5" component="div" sx={{ marginTop: "10px" }}>
          Let's Talk!
        </Typography>

        <div className="mt-20">
          <h2 className="mb-6 text-xl font-light ">Contact Us</h2>
          <ul className=" font-medium">
            <li className="mb-4">
              <a href="tel:+918883367373" className="hover:underline 	">
                Phone: +91 88833 67373
              </a>
            </li>
            <li>
              <a href="mailto:info@uxbyte.com" className="hover:underline">
                Email: info@uxbyte.com
              </a>
            </li>
          </ul>
        </div>
        <div className="flex mt-20 sm:justify-center">
          <a href="#" className=" ">
            <FaFacebookF />
            <span className="sr-only">Facebook page</span>
          </a>
          <a href="#" className="  ms-5">
            <FaInstagram />
            <span className="sr-only">Instagram community</span>
          </a>
          <a href="#" className="  ms-5">
            <FaGithub />
            <span className="sr-only">GitHub page</span>
          </a>
          <a href="#" className="  ms-5">
            <FaLinkedinIn />
            <span className="sr-only">LinkedIn account</span>
          </a>
        </div>
      </Card>
      <Card
        sx={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#1A2027",
          height: "70vh",
          width: "650px",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          component="div"
          sx={{ marginTop: "10px", textAlign: "left" }}
        >
          I'am Intrested in!
        </Typography>
        <ToggleButtonGroup
          size="small"
          sx={{ gap: "10px", border: "2px", borderColor: "white" }}
          color="primary"
          value={intrested}
          exclusive
          onChange={handleChange}
          aria-label="Platform"
        >
          {children}
        </ToggleButtonGroup>
        <Grid
          container
          rowSpacing={1}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          marginTop={5}
        >
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Name"
              defaultValue=" "
              placeholder="Your Name"
              fullWidth
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Email"
              defaultValue=" "
              placeholder="Your Email"
              fullWidth
              onChange={(event) => {
                setEmail(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Mobile"
              defaultValue=" "
              placeholder="Your Mobile"
              fullWidth
              onChange={(event) => {
                setMobile(event.target.value);
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              required
              id="outlined-required"
              label="Subject"
              defaultValue=" "
              placeholder=""
              fullWidth
              onChange={(event) => {
                setSubject(event.target.value);
              }}
            />
          </Grid>
        </Grid>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          defaultValue=" "
          fullWidth
          sx={{ marginTop: 2 }}
          onChange={(event) => {
            setMessage(event.target.value);
          }}
        />
        <Chip
          label="Send Message"
          onClick={sendEmail}
          sx={{
            width: "150px",
            height: "50px",
            marginTop: 3,
            backgroundColor: "white",
            color: "black",
            fontSize: 16,
            borderRadius: 2,
          }}
        ></Chip>
      </Card>
    </Stack>
  );
}
