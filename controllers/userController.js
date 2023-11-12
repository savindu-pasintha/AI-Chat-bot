
// import { data } from "../data.js";
// import UserModel from "../model/userModelSchema.js";
// import jwt from 'jsonwebtoken'
// import dotenv from "dotenv";
// import axios from "../middleware/axiosInstance.js";
// dotenv.config();

// const url = process.env.DANTE_ATHINA_BASE_URL;


// export const getUsers = async (req, res, next) => {
 
//   try {
//     let config = {
//       method: "get",
//       maxBodyLength: Infinity,
//       url: `${url}/users/me`,
//       headers: {},
//       data: req.body
//     };
//    await axios
//       .request(config)
//       .then((response) => {
//         res.send(response.data);
//       })
//       .catch((error) => {
//         throw error;
//       });
//   } catch (error) {
//     res.send({ msg: error["response"]["data"], error: error });
//   }
// };

// export const getUsersController = (req, res) => {
//   try {
//     UserModel.find({}, (err, data) => {
//       if (err) {
//         res
//           .status(200)
//           .json({ msg: "Error in mongodb server", error: err, data: data });
//       } else {
//         res.status(200).json({ msg: "yes", error: err, data: data });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       token: null,
//       error: error,
//       data: null,
//       msg: "Inernal Server Error",
//     });
//   }
// };

// export const userRegistrationController = (req, res) =>{
//  try {
//    const { email, password } = req.body;
//    const userData = { email: btoa(email), password: btoa(password) };
//    const userModel = UserModel(userData);
//    userModel.save((err, data) => {
//     if (err) {
//       if (err.code === 11000) {
//         res.status(400).json({ token: null, msg: 'Email already exists', data: data , error: err,});
//       } else {
//         res.status(500).json({ token: null,msg: 'Error in mongo server', error: err, data: data });
//       }
//     } else {
//       const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });
//       res.status(200).json({ token, error: null, data: data ,msg: 'ok', error: err,});
//     }
//    });
  
//  } catch (error) {
//    res.status(500).json({ token: null,  error: error, data: null , msg: "Inernal Server Error" });
//  }
// }

// export const userLoginController = (req, res) =>{  
//   try {
//     const { email, password } = req.body;
//     const userData = { email: btoa(email), password: btoa(password) };
//     UserModel.findOne(userData,  (err, data) =>{
//       if (err) {
//           res.status(400).json({ token: null, msg: 'Error in mongo server', data: data , error: err,});
//       } else {
//         const token = jwt.sign(userData, process.env.JWT_SECRET_KEY, { expiresIn: "4h" });
//         res.status(data ? 200 : 404)
//         .json({ token: data ? token : null,
//            error: null, data: data ,msg: data ? 'ok' : 'User not found', error: err,});
//       }
//     })
//   } catch (error) {
//     res.status(500).json({ token: null,  error: error, data: null , msg: "Inernal Server Error" });
//   }
// }

// export const userDeleteController = (req, res) => {
//   try {
//     const { email } = req.params;
//     const todoData = {  email: btoa(email) };
//     UserModel.findOneAndDelete(todoData, (err, data) => {
//       if (err) {
//         res.status(400).json({
//           token: null,
//           msg: "Error in mongodb server",
//           data: data,
//           error: err,
//         });
//       } else {
//         res
//           .status(data ? 200 : 404)
//           .json({ error: null, data: data, msg: data ? "ok" : `${JSON.stringify(todoData)} document not found for delete`, error: err });
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       error:error,
//       data: null,
//       msg: "Inernal Server Error",
//     });
//   }
// };

