

import express from 'express'

import { jwtAuthMiddleware } from '../middleware/jwtAuthMiddleware.js';
import { getUsersController, userDeleteController, userLoginController, userRegistrationController} from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.get('/login',jwtAuthMiddleware,getUsersController);
userRouter.post('/reg', userRegistrationController);
userRouter.post('/login',jwtAuthMiddleware,userLoginController);
userRouter.delete('/:email',jwtAuthMiddleware,userDeleteController)

export default  userRouter


