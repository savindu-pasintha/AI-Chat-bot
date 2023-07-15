# install project dependancies : npm install   
# connect with  atlas mongodb cloud
# replace the .env MONGODB_CONNECTION_URL
# start server : npm run dev | npm start
# check http://localhost:5000
### I refered this article for the terraform deployment in aws : https://earthly.dev/blog/deploy-dockcontainers-to-awsecs-using-terraform/
![image](https://github.com/savindu-pasintha/Backend-NodeJs/assets/64083148/8740d2be-8bca-438f-aeff-f6223944b3ae)
![image](https://github.com/savindu-pasintha/Backend-NodeJs/assets/64083148/ea668c3e-08f7-4c5e-866e-f4603c8dcb2a)


export const name;  or export {name}
import {name} from 'file'
export default name
import name from 'file.js'

Two ways have to connect mongodb
// 1 Connect to MongoDB
mongoose.set('strictQuery', false);
mongoose
  .connect(process.env.MONGODB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the application on connection error
  });

// 2
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("mongodb database Connected successfully");
});

// Notes 
import express from 'express';//By importing the express module, you gain access to various features and functionalities provided by Express.js, such as routing, middleware, request handling, and more.
import mongoose from 'mongoose'//connect mongodb
import logger from 'morgan'//monitor and analyze HTTP requests in your Node.js applications.
import cors from 'cors'// fix cross origin resourse error
import bodyParser from 'body-parser'// request body data and parse it into a more usable format
import cookieParser from 'cookie-parser'//parsing cookies from incoming requests and attaching them to the req.cookies property.
import dotenv from 'dotenv';

app.use(bodyParser.json({ limit: '10mb' }));: This line sets up middleware to parse JSON requests. It increases the limit of the request body size to 10MB, allowing larger JSON payloads to be processed.

app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));: This line sets up middleware to parse URL-encoded requests. It also increases the limit of the request body size to 10MB and enables extended mode, which allows nested objects in URL-encoded data.

app.use(express.json());: This line is an alternative way to parse JSON requests using built-in middleware provided by Express. It enables parsing of JSON data in the request body.

app.use(express.urlencoded({ extended: false }));: This line is an alternative way to parse URL-encoded requests using built-in middleware provided by Express. It enables parsing of URL-encoded data in the request body.

app.use(cors({ origin: process.env.CLIENT_ORIGIN }));: This line enables Cross-Origin Resource Sharing (CORS) middleware. It allows requests from the specified origin (provided by process.env.CLIENT_ORIGIN) to access resources on the server. CORS is necessary when making requests from a different domain or port than the server.

app.use(logger("dev"));: This line sets up a logging middleware using the morgan library with the "dev" format. It logs HTTP requests and related information, such as the request method, URL, status code, response time, and more.

app.use(cookieParser());: This line sets up middleware to parse cookies from incoming requests. It enables reading and parsing of cookies sent by clients in the request headers.

mongoose.set('strictQuery', false);: This line sets the 'strictQuery' option of Mongoose to false. By default, Mongoose throws an error when an undefined property is used in a query. Setting it to false allows queries with undefined properties to be executed without errors.

mongoose.connect(process.env.MONGODB_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true }): This line connects to the MongoDB database using the MONGODB_CONNECTION_URL specified in the environment variables. It also passes an options object with the useNewUrlParser and useUnifiedTopology options set to true. These options ensure that Mongoose uses the new URL parser and the new server discovery and monitoring engine.

.then(() => { ... }): If the database connection is successful, the promise is resolved, and the callback function is executed. It logs a success message and starts the Express server.

app.listen(process.env.PORT, () => { ... }): This line starts the Express server and listens on the port specified in the PORT environment variable. It logs a message indicating the server is running and specifies the URL where the server is accessible.

.catch((error) => { ... }): If there is an error connecting to the database, the promise is rejected, and the callback function is executed. It logs an error message and exits the Node.js process with a status code of 1, indicating an error.
