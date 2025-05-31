import express from 'express';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import mongodb from './db/mongoConnect.js';

const app = express();
const port = 8080;

app.use(express.json());
app
    .use(bodyParser.json())
    .use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        next();
    })
app.use("/", routes);

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