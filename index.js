import express from 'express';
import mongoose from 'mongoose'
import logger from 'morgan'
import cors from 'cors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { DynamoDBClient, BatchExecuteStatementCommand,CreateTableCommand ,GetItemCommand,ScanCommand } from "@aws-sdk/client-dynamodb";

import homeRouter from './routers/homeRouter.js';
import knowledgeBasesRouter from './routers/knowledgeBasesRouter.js';
import profileRouter from './routers/profileRouter.js';
import messagesRouter from './routers/messagesRouter.js';
import conversationsRouter from './routers/conversationsRouter.js';
import modelsAndPredictionsRouter from './routers/modelsAndPredictionsRouter.js';
import userRouter from './routers/userRouter.js';
// import todoRouter from './routers/todoRouter.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var app = express();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_ORIGIN }));
app.use(logger("dev"));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");

app.use("/",homeRouter)
app.use("/api",homeRouter)
app.use("/api/kb",knowledgeBasesRouter)
app.use("/api/profile",profileRouter)
app.use("/api/m",messagesRouter)
app.use("/api/conversations",conversationsRouter)
app.use("/api/model",modelsAndPredictionsRouter)
app.use("/api/users",userRouter)
// app.use("/api",todoRouter)

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

const config = {
  aws_table_name: 'dynamodb-test',
  aws_local_config: {
    //Provide details for local configuration
  },
  aws_remote_config: {
    accessKeyId: '##AKIA2OPTEDEYD3XO6Q7W',
    secretAccessKey: '##CHDjqNYOPPzk4GT+Pr21oBS2KwoJKF1qaE7M4UmE',
    region: 'us-east-1',
  }
};
try{
  const client = new DynamoDBClient(config.aws_remote_config);
  console.log("aws dynamodb connected")

  const params = {
    TableName: "table1",
    Key: {
      primary_key : 0
    },
  };
  // const getItemCommand = new GetItemCommand(params);
  // const data = await client.send(getItemCommand);
  // console.log("red Item:", data.Item);

  const scanCommand = new ScanCommand(params);
  const data = await client.send(scanCommand);
  console.log("Items:", data.Items);
  console.log("create table",response)
 
}catch(err){
  console.log("error ",err)
}finally{
  console.log("final block .")
}

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});


