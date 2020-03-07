var nodemailer = require("nodemailer");
const creds = require("../config");
const express = require("express");
const router = express.Router();
var transport = {
  host: "patriots.unisonplatform.com", // Don’t forget to replace with the SMTP host of your provider
  port: 465,
  auth: {
    user: creds.EMAIL_USER,
    pass: creds.EMAIL_PASS
  }
};

var transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

router.post("/send", (req, res, next) => {
  var name = req.body.fullName;
  var email = req.body.email;
  var arrivalDate = req.body.arrivalDate;
  var departureDate = req.body.departureDate;
  var defender = req.body.defender;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n arrival date: ${arrivalDate} \n departure date: ${departureDate} \n defender: ${defender} \n message: ${message} `;

  var mail = {
    from: email,
    to: creds.EMAIL_USER, // Change to email address that you want to receive messages on
    subject: "New Message from Contact Form",
    text: content
  };

  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({
        status: "fail"
      });
    } else {
      res.json({
        status: "success"
      });
    }
  });
});
