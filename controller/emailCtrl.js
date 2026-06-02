const nodemailer = require("nodemailer");

const asyncHandler = require("express-async-handler");

const sendEmail = asyncHandler(async (data, req, res) => {
  // create reusable transporter object using the default SMTP transport
  // console.log(data);
  
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL, // generated ethereal user
      pass: process.env.NODEMAILER_PASSWORD, // generated ethereal password
    },
  });

  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL, // sender address
      to: data.to, // list of receivers
      subject: data.subject,
      html: data.htm,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
});

module.exports = sendEmail;
