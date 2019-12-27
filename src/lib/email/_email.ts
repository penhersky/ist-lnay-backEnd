import nodemailer from "nodemailer";
import {EMAIL, PASS} from "../../config";

export default async (email: string, body: string, subject: string) => {
  try {
    const transporter = nodemailer.createTransport(
      {
        host: "smtp.ukr.net",
        port: 465,
        secure: true,
        auth: {
          user: EMAIL,
          pass: PASS
        }
      },
      {
        from: EMAIL
      }
    );

    transporter.sendMail(
      {
        to: email,
        subject: subject,
        text: body
      },
      (error, info) => {
        console.log(error, info);
      }
    );
  } catch (error) {
    console.log(error);
  }
};
