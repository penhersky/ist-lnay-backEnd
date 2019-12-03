import nodemailer from "nodemailer";
import {EMAIL, PASS, isDevelopment} from "../../../config";

export default async (email: string, body: string, subject: string) => {
  const transporter = nodemailer.createTransport({
    service: `ukr`,
    auth: {
      user: EMAIL,
      pass: PASS
    }
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject,
    text: body
  };
  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    if (isDevelopment) console.log(error);
  }
};
