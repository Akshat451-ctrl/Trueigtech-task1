import { createSlice } from "@reduxjs/toolkit";
import { login,signup } from "../Api/AuthApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
      loading: false,
      signup_detail:'',
      Login_detail: "",
 
    },
    reducers:{
        signup_details :(state, action)=>{
        state.signup_detail="";
      
        },

        Login_detail :(state, action)=>{
          state.Login_detail="";
          }

    },

    extraReducers: (builder) => {
      builder.addCase(login.pending, state => {
        state.loading = true
      })
      builder.addCase(login.fulfilled,  (state, action) => {
       state.signup_detail=action.payload;
        state.loading = false
      })
      builder.addCase(login.rejected, (state,action) => {
      
        state.loading = false
      })

      builder.addCase(signup.pending, state => {
        state.loading = true
      })
      builder.addCase(signup.fulfilled,  (state, action) => {
       state.signup_detail=action.payload;
        state.loading = false
      })
      builder.addCase(signup.rejected, (state,action) => {
      
        state.loading = false
      })
    
    }
  })

 
  export const { signup_details } = authSlice.actions;
  
  export default authSlice.reducer;