import express from 'express'
import { addTodoController, deleteTodoController, getTodosController, updateTodoController } from '../controllers/todoController.js';
import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';

const todoRouter = express.Router();

todoRouter.get('/todos/:userId',jwtAuthMiddleware, getTodosController);
todoRouter.post('/todo',jwtAuthMiddleware, addTodoController);
todoRouter.delete('/todo/:id',jwtAuthMiddleware, deleteTodoController);
todoRouter.patch('/todo/:id',jwtAuthMiddleware,updateTodoController)

export default  todoRouter