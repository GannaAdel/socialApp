import axios from 'axios';
import { Comment, initCommentState } from './../Interfaces/PostInterface';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from 'react-hot-toast';




export let updateComment = createAsyncThunk('commentSlice/updateComment', async ({ commentId, commContent }: { commentId: string; commContent: string }) => {
    let { data } = await axios.put(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        content: commContent
    }
        ,
        {
            headers: {
                token: localStorage.getItem('userToken')
            }

        })
    console.log(data);
    return data
})

export let deleteComment = createAsyncThunk('commentSlice/deleteComment', async (commentId: string) => {
    let { data } = await axios.delete(`https://linked-posts.routemisr.com/comments/${commentId}`, {
        headers: {
            token: localStorage.getItem('userToken')
        }
    })
    return data

}
)
let initialState: initCommentState = {
    singleComment: null
}

let commentSlice = createSlice({
    name: 'CommentSlice',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.singleComment = action.payload
            //  console.log(action.payload);
            if (action.payload.message === 'success') {
                toast.success('comment deleted successfully')
            }

        }),
            builder.addCase(updateComment.fulfilled, (state, action) => {
                state.singleComment = action.payload
                console.log(action);
                if (action.payload.message === 'success') {
                    toast.success('comment updated successfully')
                    

                }

            })
    }

})
export let commentReducer = commentSlice.reducer