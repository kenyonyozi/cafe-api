const express = require('express');
import mongoose from 'mongoose';
// import express, { Application } from 'express';
const reservationRouter = require('./routes/reservationRouter');
const sendEmail = require('./nodemailer/emailTransporter'); // Import the sendEmail function
const app = express();
app.use(express.json());
const port = 5000;

app.use('/reservations', reservationRouter);

// Route to trigger sending the email
// app.get('/send-email', (req, res) => {
//     // sendEmail(); // Call the sendEmail function
//     sendEmail('davidm@sprintug.com', 'New Reservation', 'reservationEmail', {
//         name: 'matovu',
//         email: 'davidmatovu88@gmail.com',
//         numberOfPeople: 4,
//     });

//     res.send('Email sent successfully');
// });

// Connect to the MongoDB database
mongoose
    .connect(
        'mongodb+srv://david:david@cluster0.bkgfjsx.mongodb.net/reservation-portal'
    )
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

app.listen(port, () => {
    console.log(`cafePortalProject is listening at http://localhost:${port}`);
});
