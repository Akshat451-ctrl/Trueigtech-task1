import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../config"; 
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
     let url = BASE_URL+'login';
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

export const signup = createAsyncThunk(
  "auth/signup",
  async (data, { rejectWithValue }) => {
     let url = BASE_URL+'signup';
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

