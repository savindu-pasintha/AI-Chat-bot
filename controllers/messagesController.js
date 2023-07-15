import dotenv from "dotenv";
import axios from "../middleware/axiosInstance.js";
dotenv.config();

const url = process.env.DANTE_ATHINA_BASE_URL;

export const createKnowledgeBaseUsingUrlsAnsSave = (req, res, next) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}`,
      headers: {},
    };

    axios
      .request(config)
      .then((response) => {
        res.send(response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send(error);
  }
};
