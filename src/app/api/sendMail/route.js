import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  port: 465,
  secure: true,
  auth: {
    user: "aslam@uxbyte.in",
    pass: "Aslamuxb@hostinger1",
  },
});

export async function POST(req, res) {

  if(req.method==="POST"){
  const data = await req.json();
  console.log(data);
  

  let mailConetnt = `<p><b>${data.name}</b> wnts to talk to you. <br><b>Intrested in</b> : ${data.intrested}<br> <br><b>Subject</b> : ${data.subject}<br> <br><b>Message</b> : ${data.message} <br> <br><b>Contact Info</b>: <br> <br><b>Email</b> : ${data.email}<br> <br><b>Contact No</b> : ${data.mobile} <br> <br></p>`;

  const mailObject = {
    from: "aslam@uxbyte.in",
    to: data.email,
    subject: `${data.name} wants to talk to you`,
    html: mailConetnt,
  };

  try {
    const info =await transporter.sendMail(mailObject);
    console.log("Email sent:", info.response);
    return NextResponse.json("Email Sent Successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json("Email Sent Failed");
  }
}
return NextResponse.json('NO POST')
}