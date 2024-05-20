import express from 'express';
import { dashboardController } from '../controllers/dashboardController.js';

const dashboardRoute = express.Router();

dashboardRoute.get("/get", dashboardController);

export default dashboardRoute;