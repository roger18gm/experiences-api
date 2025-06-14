import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import mongodb from './db/mongoConnect.js';
import session from 'express-session';
import passport from 'passport';
import passportConfig from './db/passport.js';
import MongoStore from 'connect-mongo';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// passport oauth google config
passportConfig(passport);

const app = express();
const port = 8080;

app.set('trust proxy', 1); // Trust the first proxy (Render uses one)

// cors header policy
app.use(express.json());
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })

// session store
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
    cookie: {
        secure: process.env.MODE === 'prod', // only set true in production
        httpOnly: true,
        sameSite: 'lax'
    }
}))

app.use(passport.initialize());
app.use(passport.session());

// static htmls should go after passport but before routes 
app.use(express.static(path.join(__dirname, 'views')))

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