import { createSlice } from "@reduxjs/toolkit";
import { insertpost,getFeed } from "../Api/FeedApi";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
      loading: false,
      feedData:[],
      
 
    },
    reducers:{},

    extraReducers: (builder) => {
      builder.addCase(insertpost.pending, state => {
        state.loading = true
      })
      builder.addCase(insertpost.fulfilled,  (state, action) => {
        state.loading = false
      })
      builder.addCase(insertpost.rejected, (state,action) => {
      
        state.loading = false
      })

       builder.addCase(getFeed.pending, state => {
        state.loading = true
      })
      builder.addCase(getFeed.fulfilled,  (state, action) => {
        state.loading = false
        state.feedData=action.payload.data;
        console.log("feedData",state.feedData)
      })
      builder.addCase(getFeed.rejected, (state,action) => {
      
        state.loading = false
      })


    
    }
  })

 
 
  
  export default feedSlice.reducer;