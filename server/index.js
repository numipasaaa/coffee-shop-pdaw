import express from 'express';
import userRoutes from './routes/userRoutes.js';
import { checkConnection } from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import cors from 'cors'

const app = express();
app.use(cors());


app.use(express.json()); // Middleware to parse JSON bodies
app.use('/api/users', userRoutes); // Use user routes for API calls
app.use('/api/auth', authRoutes); // Use user routes for API calls

app.listen(process.env.REACT_APP_SERVER_PORT, async () => {
    console.log(`App server now listening on port ${process.env.REACT_APP_SERVER_PORT}`);

    // Check database connection
    try {
        await checkConnection();
    } catch (error) {
        console.log("Failed to initialize the database", error);

    }
});