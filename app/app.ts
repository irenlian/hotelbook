import express from 'express';
import bodyParser from 'body-parser';
import { errors as joiErrors } from 'celebrate';
import cors from 'cors';
import { initDB } from './db/init';
import initRoutes from './routes';
import { domain } from './config';

initDB();
const app = express();

const whitelist = [`${domain}`, 'http://localhost:3000'];
const options:cors.CorsOptions = {
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'X-Access-Token'],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: whitelist,
  preflightContinue: false,
};

app.use(cors(options));

app.use(bodyParser.json());

initRoutes(app);
app.get('/', (req, res) => res.send('Hello world'));

app.use(joiErrors());

export default app;
