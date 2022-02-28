import express from 'express';
import routes from './src/routes/crmRoutes';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import RateLimit from 'express-rate-limit';
import cookieSession from 'cookie-session';

const app = express();
const PORT = 4000;

// HTTP protection & Helmet setup 
app.use(helmet());

// Rate limit setup 
//  Set time of IP request
const limiter = new RateLimit({
    windowMs: 15 * 60 * 1000,  // 15 minutes
    max: 100,  // Limit of number of request per IP
    delayMs: 0  // Disable dilays 
});

// Cookie Setup 
app.use(cookieSession({
    name: "darshan borse",
    keys: "Darshan@123",
    maxAge: 24 * 60 * 60 * 1000 //24 hour
}));

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://127.0.0.1/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`Your server is running on port ${PORT}`)
);