import { initState } from "@/Interfaces/PostInterface";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export let getAllPosts = createAsyncThunk('postSlice/getAllPosts', async () => {
    let { data } = await axios.get('https://linked-posts.routemisr.com/posts?limit=50&page=30',
        {
            headers:
            {
                token: localStorage.getItem('userToken')
            }
        }
    )
    return data;
})

export let getSinglePost = createAsyncThunk('postSlice/getSinglePost', async (id:string) => {
    let { data } = await axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
    return data;
})



let initialState: initState = {
    isLoading: false,
    allPosts: null,
    isError: false,
    singlePost: null
}
let postSlice = createSlice({
    name: 'postSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
            builder.addCase(getAllPosts.pending, (state, action) => {
                state.isLoading = true,
                state.isError = false
            }),
            builder.addCase(getAllPosts.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.allPosts = action.payload.posts
                console.log(action.payload.posts);

            }),
            builder.addCase(getAllPosts.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true

            })

            builder.addCase(getSinglePost.pending, (state, action) => {
                state.isLoading = true,
                state.isError = false
            }),
            builder.addCase(getSinglePost.fulfilled, (state, action) => {
                state.isLoading = false,
                state.isError = false,
                state.singlePost=action.payload.post
                // console.log(action);

            }),
            builder.addCase(getSinglePost.rejected, (state, action) => {
                state.isLoading = false,
                state.isError = true

            })
    }

})
export let postReducer = postSlice.reducer