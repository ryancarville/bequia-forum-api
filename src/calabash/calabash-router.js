var nodemailer = require("nodemailer");
const creds = require("../config");
const express = require("express");
const calabashRouter = express.Router();
const CalabashServices = "./calabash-service";
calabashRouter.get("/login", (req, res, next) => {
  const db = req.app.get("db");
  const { email } = req.body;
  if (!email) {
    return res.status(401).json({ error: "Must enter a valid email address." });
  }
  CalabashServices.getEmail(db, email)
    .then(user => {
      if (!user) {
        return res
          .status(401)
          .json({ error: "That email address is incorrect." });
      }
      return res.status(200).json({ email: user.email });
    })
    .catch(err => {
      console.log(err);
      next(err);
    });
});
//help contact endpoint
calabashRouter.post("/help", (req, res, next) => {
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
  var name = req.body.fullName;
  var email = req.body.email;
  var reason = req.body.reason;
  var message = req.body.message;
  var content = `name: ${name} \n email: ${email} \n reason: ${reason} \n message: ${message} `;

  var mail = {
    from: email,
    to: creds.EMAIL_USER, // Change to email address that you want to receive messages on
    subject: `URGENT||Guest Help Request regarding: ${reason}`,
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
//contact form email endpoint
calabashRouter.post("/send", (req, res, next) => {
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
    subject: "New Booking Enquiry for Calabash",
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
module.exports = calabashRouter;
