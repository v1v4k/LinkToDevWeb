import axiosInstance from "./axiosInstance";

export const updateProfile = (data) =>
  axiosInstance.patch("/profile/edit", data);
