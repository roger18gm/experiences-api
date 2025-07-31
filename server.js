import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import mongodb from './db/mongoConnect.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const port = 8080;

app.set('trust proxy', 1); // Trust the first proxy (Render uses one)

// cors header policy
const allowedOrigins = ['https://rawwyurr.web.app', 'http://localhost:5173', 'http://localhost:5000'];

app.use(cors({
    origin: 'https://rawwyurr.web.app',
    credentials: true, // Allow cookies to be sent
}));
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json())


// routes
app.use("/", routes);

// catch all error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

mongodb.initDb((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(process.env.PORT || port, () => {
            console.log(`Server running on port: ${process.env.PORT || port}`);
        });
    }
});