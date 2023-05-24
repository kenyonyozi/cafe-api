const express = require('express');
import mongoose from 'mongoose';

const cors = require('cors');


require('dotenv').config();

const { PORT } = process.env;
const { WELCOME_MESSAGE, DATABASE_URL } = process.env;


const reservationRouter = require('./routes/reservationRouter');

const app = express();
app.use(express.json());


// app.use(cors());
app.use(cors({ origin: true, credentials: true }));

app.use('/reservations', reservationRouter);


// Connect to the MongoDB database
mongoose
    .connect(
        DATABASE_URL
    )
    .then(() => {
        console.log('Connected to database');
    })
    .catch((error) => {
        console.error('Error connecting to database:', error);
    });

app.listen(PORT, () => {
    console.log(`cafePortalProject is listening at http://localhost:${PORT}`);
});


