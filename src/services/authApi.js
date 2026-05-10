import axios from "axios";
import { BASE_URL } from "../utils/constants";

const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

const handleError = (err) => {
  throw err.response?.data || { message: "Something went wrong" };
};

export const login = (data) =>
  authAxios
    .post(`/login`, data)
    .then((res) => res.data)
    .catch(handleError);

export const signup = (data) =>
  authAxios
    .post(`/signup`, data)
    .then((res) => res.data)
    .catch(handleError);

export const logout = () =>
  authAxios
    .post(`/logout`, {})
    .then((res) => res.data)
    .catch(handleError);
