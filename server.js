const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");

const PORT = process.env.PORT || 5000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(express.json());



app.get("/", function(req, res) {
    res.render("home")
});

app.post("/", function(req, res) {
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "omayowagold@gmail.com",
            pass: "rfxgvfrxowwjlfpv"
        }
    });

    const mailOptions = {
        from: req.body.email,
        to: "omayowagold@gmail.com",
        subject: 'New message from ' + req.body.email + " " + req.body.subject,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error);
            res.send("error");
        } else {
            console.log("Email sent:" + info.response);
            res.send("success")
        }
    })

});

app.listen(PORT, function() {
    console.log("Server started on port " + PORT);
  });