import express, { json } from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/errorHandlerMiddleware';
import router from './routes/index';
import cors from 'cors';
import fileUpload from "express-fileupload";

const app = express();
app.use(json());
app.use(cors())
app.use(fileUpload());
app.use(router);
app.use(errorHandler);

export default app;
