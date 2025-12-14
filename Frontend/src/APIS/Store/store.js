import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/AuthSlice";
import feedReducer from "../Slice/FeedSlice";


export const store = configureStore({
    reducer:{
        authSlice:authReducer,
        feedSlice:feedReducer
    }
});
