import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './userSlice';
import { postReducer } from './postSlice';
import { commentReducer } from './commentSlice';

export let store = configureStore({
reducer:{
    userReducer,
    postReducer,
    commentReducer

}
})