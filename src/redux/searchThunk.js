import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export const searchUsers = createAsyncThunk(
  "search/searchUsers",
  async (query, thunkAPI) => {
    try {
      const res = await axios.get(`${BASE_URL}/user/search?query=${query}`, {
        withCredentials: true,
      });

      return res.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
