import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config"; 
export const insertpost = createAsyncThunk(
  "insertpost",
  async (data, { rejectWithValue }) => {
     let url = BASE_URL+'insertFeed';
    try {
      const response = (await axios.post(url,data)).data;

      if (response.status === "success") {
        return response; 
      } else {
        return rejectWithValue(response); 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const getFeed = createAsyncThunk(
  "getFeed",
  async (data, { rejectWithValue }) => {
     let url = BASE_URL+'getFeed';
    try {
      const response = (await axios.get(url)).data;
console.log("Feed fetch response:", response);
      if (response.status === "success") {
        return response; 
      } else {
        return rejectWithValue(response); 
      }
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



