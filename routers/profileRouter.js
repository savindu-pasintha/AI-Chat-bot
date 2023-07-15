import express from 'express'
import { getProfileData } from '../controllers/profileController.js';

const profileRouter = express.Router();

profileRouter.get('/',getProfileData)

export default  profileRouter