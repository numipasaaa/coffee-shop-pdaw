const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcryptjs');
const saltRound = 10;
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json())
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
    session({
        key: 'userId',
        secret: 'jwtSecret',
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60 * 60 * 24,
        },
    })
);

const db = mysql.createConnection({
    host: process.env.MYSQL_HOST_IP || 'localhost',
    user: process.env.MYSQL_USER || 'admin',
    password: process.env.MYSQL_PASSWORD || 'admin',
    database: process.env.MYSQL_DATABASE || 'coffee-shop-db',
    connectionLimit:10,
    queueLimit:0,
    waitForConnections:true
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to database');
    }
});

app.post('/signup', (req, res) => {
    const { name, username, email, password } = req.body;

    // Hash password before storing
    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ success: false, message: 'Error hashing password' });
        }

        const sql = 'INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)';
        db.query(sql, [name, username, email, hash], (err, result) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ success: false, message: 'Error inserting data' });
            }
            res.status(200).json({ success: true, message: 'User created successfully' });
        });
    });
});

app.post('/register', (req, res) => {
    const { username, password, email, full_name } = req.body;

    bcrypt.hash(password, saltRound, (err, hash) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ success: false, message: 'Error hashing password' });
        }

        // Fix parameter array structure
        db.query(
            "INSERT INTO users (full_name, username, email, password) VALUES (?, ?, ?, ?)",
            [full_name, username, email, hash],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ success: false, message: 'Error registering user' });
                }
                res.status(200).json({ success: true, message: 'User registered successfully' });
            }
        );
    });
});

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];

    if (!token) {
        return res.status(401).json({ auth: false, message: "Token required" });
    }

    jwt.verify(token, "jwtSecret", (err, decoded) => {
        if (err) {
            console.log(err);
            return res.status(401).json({ auth: false, message: "Failed to authenticate" });
        }

        req.username = decoded.username;
        next();
    });
};

app.get('/isUserAuth', verifyJWT, (req, res) => {
    res.json({ auth: true, message: "You are authenticated. Congrats!" });
});

app.get("/login", (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user });
    } else {
        res.json({ loggedIn: false });
    }
});

app.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password.trim();

    if (!email || !password) {
        return res.status(400).json({ auth: false, message: "Email and password required" });
    }

    console.log("Login attempt for email:", email);

    db.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (err, result) => {
            if (err) {
                console.error("Database query error: ", err);
                return res.status(500).json({ auth: false, message: "Server error" });
            }
            console.log("Query results:", JSON.stringify(result, null, 2));
            if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (error) {
                        return res.status(500).json({ auth: false, message: "Error verifying password" });
                    }
                    console.log("Password comparison result:", response ? "Match" : "Mismatch");
                    if (response) {
                        const username = result[0].username;
                        const token = jwt.sign({ username }, "jwtSecret", {
                            expiresIn: 300,
                        });

                        req.session.user = result;
                        res.json({ auth: true, token: token, result: result });
                    } else {
                        res.status(401).json({ auth: false, message: "Wrong username/password" });
                    }
                });
            } else {
                res.status(404).json({ auth: false, message: "No user exists with that email" });
            }
        }
    );
});

// app.post('/login', (req, res) => {
//     const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
//     const values = [req.body.email, req.body.password];
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error(err);
//             return res.status(500).send('Error');
//         }
//         if (result.length > 0) {
//             return res.status(200).send('Success');
//         } else {
//             return res.status(404).send('Failed');
//         }
//     });
// })

app.listen(process.env.REACT_APP_SERVER_PORT || 8000, () => {
    console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT || 8000}`);

    // Check database connection
    // try {
    //     await checkConnection();
    // } catch (error) {
    //     console.log("Failed to initialize the database", error);
    // }
});