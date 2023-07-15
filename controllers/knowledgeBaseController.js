import dotenv from "dotenv";
import axios from "../middleware/axiosInstance.js";
dotenv.config();

const url = process.env.DANTE_ATHINA_BASE_URL;

export const createKnowledgeBaseUsingUrlsAndSave = async (req, res, next) => {
  try {
   let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases${req.url}`,
       headers: {
        Accept: "application/json",
      },
    };
    await axios
      .request(config)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const createKnowledgeBaseUsingFilesAndSave = (req, res, next) => {
  try {
    const { knowledge_base_name } = req.query;
    const files = req.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      formData.append("files", file.buffer, {
        filename: file.originalname,
        contentType: file.mimetype,
      });
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases/files?knowledge_base_name=${knowledge_base_name}`,
      headers: {
        Accept: "application/json",
      },
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
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const addUrlsToUSpecificKnowledgeBase = async (req, res, next) => {
  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases${req.url}`,
      headers: {
        Accept: "application/json",
      },
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

export const retriveKnowledgeBasesBellongWithAuthenticatedUser = async (
  req,
  res,
  next
) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases`,
      headers: {
        Accept: "application/json",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const deleteSpecificKnowledgeBase = async (req, res, next) => {
  try {
    const { knowledge_base_id } = req.query; 
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases/${knowledge_base_id}`,
      headers: {
        Accept: "application/json",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        res.send({ knowledge_base_id: knowledge_base_id });
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const deleteSpecificKnowledgeBaseAllFiles = async (req, res, next) => {
  try {
    const { knowledge_base_id } = req.query;
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases/${knowledge_base_id}/files`,
      headers: {
        Accept: "application/json",
      },
    };

    await axios
      .request(config)
      .then((response) => {
        res.json(JSON.stringify(response.data));
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};

export const deleteSpecificKnowledgeBaseSpecificFile = async (
  req,
  res,
  next
) => {
  try {
    const { file_id } = req.query;
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `${url}/knowledge-bases/files/${file_id}`,
      headers: {},
    };
    await axios
      .request(config)
      .then((response) => {
        res.send(JSON.stringify(response.data));
      })
      .catch((error) => {
        throw error;
      });
  } catch (error) {
    res.send({ msg: error["response"]["data"], error: error });
  }
};
