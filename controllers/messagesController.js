import dotenv from "dotenv";
import axios from "../middleware/axiosInstance.js";
dotenv.config();

const url = process.env.DANTE_ATHINA_BASE_URL;

export const getSuggestions = async (req, res, next) => {
 
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}${req.url}`,
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
