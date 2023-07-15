import express from 'express'
import { getStatus, homeController } from '../controllers/homeController.js';

const homeRouter = express.Router();

homeRouter.get('/', homeController);
homeRouter.get('/status',getStatus)

export default  homeRouter


