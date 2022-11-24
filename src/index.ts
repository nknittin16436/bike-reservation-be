import express from 'express';
const bodyParser = require('body-parser');
import { bikeRouter, userRouter } from './controllers';
const cookieParser = require('cookie-parser');

import 'module-alias/register';

require('dotenv').config({ path: 'src/config/config.env' });


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));


app.use("/api/v1", userRouter);
app.use("/api/v1", bikeRouter);


export default app;