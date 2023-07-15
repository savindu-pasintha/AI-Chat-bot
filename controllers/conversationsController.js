import dotenv from "dotenv";
import axios from "../middleware/axiosInstance.js";
dotenv.config();

const url = process.env.DANTE_ATHINA_BASE_URL;

export const createConversation = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/conversations${req.url}`,
      headers: {},
      data: req.body
    };
   await axios
      .request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const getConversations = async (req, res, next) => {
    try {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${url}/conversations`,
        headers: {},
        data: req.body
      };
     await axios
        .request(config)
        .then((response) => {
          res.send(response.data);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.send({ msg: error["response"]["data"], error: error });
    }
  };

  export const deleteAllConversations = async (req, res, next) => {
    try {
      let config = {
        method: "delete",
        maxBodyLength: Infinity,
        url: `${url}/conversations/all`,
        headers: {},
        data: req.body
      };
     await axios
        .request(config)
        .then((response) => {
          res.send(response);
        })
        .catch((error) => {
          throw error;
        });
    } catch (error) {
      res.send({ msg: error["response"], error: error });
    }
  };
