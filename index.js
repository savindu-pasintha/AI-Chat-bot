import express from 'express';
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import axiosInstance from'./middleware/axiosInstance.js';

import homeRouter from './routers/homeRouter.js';
import todoRouter from './routers/todoRouter.js';
import userRouter from './routers/userRouter.js';

dotenv.config();

var app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(logger("dev"));
app.use(cookieParser());

// app.use("/",homeRouter)
app.use("/api",homeRouter)
app.use("/api",todoRouter)
app.use("/api/user",userRouter)

app.get('/', async (req, res) => {
  try {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://api.athena-ai.co/profile',
      headers: { 
        'Authorization': ''
      }
    };
    
    axiosInstance.request(config)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      throw error
    });

  }catch(err){
    res.send(err)
  }
});

// try{
//   mongoose.set('strictQuery', false);
//   mongoose
//     .connect(process.env.MONGODB_CONNECTION_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     })
//     .then(() => {
//       console.log('MongoDB connected successfully');
//       // app.listen(process.env.PORT, () => {
//       //   console.log(`Server running on http://localhost:${process.env.PORT}`);
//       // });
//     })
//     .catch((error) => {
//       console.error('MongoDB connection error:', error);
//       process.exit(1); 
//     });
// }catch(err){

// }

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});


