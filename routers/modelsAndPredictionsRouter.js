import express from 'express'
import { createModelQuerySharedStream,createModelIndex, createModelQuery, createModelQueryStream } from '../controllers/modelsAndPredictionsController.js';

const modelsAndPredictionsRouter = express.Router();

modelsAndPredictionsRouter.post('/create_index',createModelIndex) 
modelsAndPredictionsRouter.post('/query',createModelQuery)
modelsAndPredictionsRouter.post('/query-stream',createModelQueryStream)
modelsAndPredictionsRouter.post('/query-shared-stream',createModelQuerySharedStream)

export default  modelsAndPredictionsRouter