import axiosInstance from "./axiosInstance";

export const getUserById = (userId) => axiosInstance.get(`/user/${userId}`);

export const getConnectionStatus = (userId) =>
  axiosInstance.get(`/user/connection-status/${userId}`);

export const sendConnectionRequest = (status, toUserId) =>
  axiosInstance.post(`/sendConnectionRequest/${status}/${toUserId}`);
