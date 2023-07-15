import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const axiosInstance = axios.create({
  baseURL: process.env.DANTE_ATHINA_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = process.env.DANTE_ATHINA_TOKEN;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.Token = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
