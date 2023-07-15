import dotenv from "dotenv";
import axios from "../middleware/axiosInstance.js";
dotenv.config();

const url = process.env.DANTE_ATHINA_BASE_URL;

export const createModelIndex = async (req, res, next) => {
  console.log(req.url)
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/model${req.url}`,
      headers: {},
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

export const createModelQuery = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/model${req.url}`,
      headers: {},
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

export const createModelQueryStream = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/model${req.url}`,
      headers: {},
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

export const createModelQuerySharedStream = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/model${req.url}`,
      headers: {},
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
