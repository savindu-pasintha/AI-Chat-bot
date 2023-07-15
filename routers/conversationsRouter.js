import express from 'express'
import { createConversation, deleteAllConversations, getConversations } from '../controllers/conversationsController.js';

const conversationsRouter = express.Router();

conversationsRouter.get('/',getConversations)
conversationsRouter.post('/',createConversation) 
conversationsRouter.delete('/all',deleteAllConversations)

export default  conversationsRouter