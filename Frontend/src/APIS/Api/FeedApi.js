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
      const response = (await axios.post(url, data)).data;
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

export const exploreUsers = createAsyncThunk(
  "exploreUsers",
  async (data, { rejectWithValue }) => {
     let url = BASE_URL+'exploreUsers';
    try {
      const response = (await axios.post(url, data)).data;

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

export const followUser = createAsyncThunk(
  "followUser",
  async (data, { rejectWithValue }) => {
    let url = BASE_URL + 'user/' + data.followedUserId + '/follow';
    try {
      const response = (await axios.post(url, data)).data;
    console.log(response, "Follow user response");
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

export const likePost = createAsyncThunk(
  "likePost",
  async (data, { rejectWithValue }) => {
    let url = BASE_URL + 'post/' + data.postId + '/like';
    try {
      const response = (await axios.post(url, data)).data;
    console.log(response, "Follow user response");
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



