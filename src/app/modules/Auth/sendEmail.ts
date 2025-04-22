import nodemailer from "nodemailer";
import config from "../../config/config";

const emailSender = async (email: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: "hasansanim562@gmail.com",
      pass: config.app_password,
    },
    tls: { rejectUnauthorized: false },
  });

  const info = await transporter.sendMail({
    from: '"PH Health Care 👻" <hasansanim562@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Please reset you password expier in 5 minit", // Subject line
    // text: "Hello world?", // plain text body
    html, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

export default emailSender;
