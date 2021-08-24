import express from 'express';
import bodyParser from 'body-parser';
import 'express-async-errors';
import './db/init';
import { errors as joiErrors } from 'celebrate';
import cors from 'cors';
import initRoutes from './routes';
import { domain } from './config';
import errorHandling from './middlewares/errorHandling';

const app = express();

const whitelist = [`${domain}`, 'http://localhost:3000'];
const options: cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: whitelist,
  preflightContinue: false,
};

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(express.static(__dirname + '/images'));

app.use(joiErrors());
app.use(errorHandling);

export default app;
