// const mysql = require('mysql');
import mysql from 'mysql';
const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
});

const checkConnection = async()=> {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error("Error connecting to database:", err);
            throw err;
        }
        if (connection) {
            console.log("Database Connection Successful!!");
            connection.release();
        } else {
            console.log("Failed to get a database connection.");
        }
    });
}

export {pool, checkConnection};

