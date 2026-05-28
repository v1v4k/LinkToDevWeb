import axios from "axios";
import { BASE_URL } from "../utils/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401 && !window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data);
  },
);

export default axiosInstance;
