import { createSlice } from "@reduxjs/toolkit";
import { insertpost,getFeed, followUser, exploreUsers, likePost } from "../Api/FeedApi";

const feedSlice = createSlice({
    name: "feedSlice",
    initialState: {
      loading: false,
      feedData:[],
      exploreUsers: [],
      followingData: [],
 
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
        console.log("Get Feed Action Payload:", action.payload);
        state.feedData=action.payload.data.feeds;
        state.followingData=action.payload.data.following;
        console.log("feedData",state.feedData)
      })
      builder.addCase(getFeed.rejected, (state,action) => {
      
        state.loading = false
      })

      builder.addCase(followUser.pending, state => {
        state.loading = true
      })
      builder.addCase(followUser.fulfilled,  (state, action) => {
        state.loading = false
      })
      builder.addCase(followUser.rejected, (state,action) => {
        state.loading = false
      })


        builder.addCase(exploreUsers.pending, state => {
        state.loading = true
      })
      builder.addCase(exploreUsers.fulfilled,  (state, action) => {
        state.loading = false
        state.exploreUsers=action.payload?.data;
      })
      builder.addCase(exploreUsers.rejected, (state,action) => {
        state.loading = false
      })

      builder.addCase(likePost.pending, state => {
        state.loading = true
      })  
    builder.addCase(likePost.fulfilled,  (state, action) => {
        state.loading = false
      })
      builder.addCase(likePost.rejected, (state,action) => {
        state.loading = false
      })
    
    }
  })

 
 
  
  export default feedSlice.reducer;