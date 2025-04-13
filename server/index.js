const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
});

app.post('/signup', (req, res) => {
    const sql = 'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)';
    const values = [req.body.name, req.body.username, req.body.email, req.body.password];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error inserting data');
        }
        res.status(200).send('User created successfully');
    });
})

app.post('/login', (req, res) => {
    const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
    const values = [req.body.email, req.body.password];
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error');
        }
        if (result.length > 0) {
            return res.status(200).send('Success');
        } else {
            return res.status(404).send('Failed');
        }
    });
})

app.listen(process.env.REACT_APP_SERVER_PORT, () => {
    console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);

    // Check database connection
    // try {
    //     await checkConnection();
    // } catch (error) {
    //     console.log("Failed to initialize the database", error);
    // }
});



// import express from 'express';
// import userRoutes from './routes/userRoutes.mjs';
// import { checkConnection } from './config/db.mjs';
// import authRoutes from './routes/authRoutes.mjs'
// import cors from 'cors'
// import dotenv from 'dotenv'
//
// dotenv.config();
// const app = express();
// app.use(cors());
//
//
// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/api/users', userRoutes); // Use user routes for API calls
// app.use('/api/auth', authRoutes); // Use user routes for API calls
//
// app.listen(process.env.REACT_APP_SERVER_PORT, async () => {
//     console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);
//
//     // Check database connection
//     try {
//         await checkConnection();
//     } catch (error) {
//         console.log("Failed to initialize the database", error);
//
//     }
// });