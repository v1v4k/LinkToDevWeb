import axiosInstance from "./axiosInstance"

export const getChatHistory = (userId) =>
  axiosInstance.get(`/chat/${userId}`)