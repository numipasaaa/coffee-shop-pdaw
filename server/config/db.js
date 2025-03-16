const mysql = require('mysql');

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
    try {
        const connection=await pool.getConnection();
        console.log("Database Connection Successfull!!");
        connection.release();

    } catch (error) {
        console.log("Error connecting to database!");
        throw error;

    }
}

export {pool,checkConnection};

