import express from 'express'
import { getSuggestions } from '../controllers/messagesController.js';

const messagesRouter = express.Router();
messagesRouter.post('/suggestion',getSuggestions) 

export default  messagesRouter