/* eslint-disable linebreak-style*/
/*eslint-disable */

const nodemailer = require('nodemailer');
const dbconn = require('./db');
const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'nella28@ethereal.email',
        pass: 'rQtsyMm5JdPZYfcBKC'
    }
});

exports.send = (req, res) => {
  let mailOptions = {
    from: req.body.from,
    to:  req.body.to,
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
  };

  let successmailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: 'This message delivered successfully!',
    text: 'Message delivered successfully to ' + req.body.to
  };

  let failuremailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: 'This message delivery failed!',
    text: 'Message delivery failed to ' + req.body.to
  };

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    // delivery report failure!
    dbconn.saverecord(req,res,'failed');
    transporter.sendMail(failuremailOptions, function(error, info){
    if (error) {
      res.send("Message delivery failed status "+ error);
    } else {
      res.send("Message delivery failed.");
    }
  });
  } else {
    // Email sent successfully!
    dbconn.saverecord(req,res,'success');
    // sent delivery report to owner!
    transporter.sendMail(successmailOptions, function(error, info){
    if (error) {
       res.send("Message delivered success status" +error);
    } else {
       res.send("Message delivered success.");
    }
  });
  }
});
};