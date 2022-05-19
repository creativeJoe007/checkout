import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import ReviewsController from "./routes/ReviewsController.js";
import ReviewSchema from './schema/ReviewSchema.js';

const app  = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', ReviewsController);

export default app;
