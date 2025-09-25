'use client'
import { user, userToken } from '@/Interfaces/userInterfaces';
import  axios  from 'axios';
import { createAsyncThunk, createSlice ,} from "@reduxjs/toolkit";

export let userLogin=createAsyncThunk('userSlice/userLogin',async (values:user)=>{
let {data}= await axios.post('https://linked-posts.routemisr.com/users/signin', values)
return data
}) 

let initialState:userToken={
 token: localStorage.getItem('userToken'),
 isError:false
    
};
 let UserSlice =createSlice({
    name:'userSlice',
    initialState,
     
    reducers:{

    },
    extraReducers:(builder)=>{
      builder.addCase(userLogin.fulfilled,(state,action)=>{
        console.log(action);
        
        state.token= action.payload.token
        localStorage.setItem('userToken',action.payload.token)
  
      })
    
    }


})
export let userReducer= UserSlice.reducer