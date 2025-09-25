'use client'
import { Box, Button, TextField } from '@mui/material'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import SendIcon from '@mui/icons-material/Send';


export default function CreateComment({ postId ,onAdd }: { postId: string ,onAdd: (newComment: any) => void }) {
    // let [comment, setComment]= useState(null)

    let formik = useFormik({
        initialValues: {
            content: '',
            post: postId
        },
        onSubmit: async (val) => {
            console.log(val);
            let { data } = await axios.post('https://linked-posts.routemisr.com/comments',
                val
                ,
                {
                    headers: {
                        token: localStorage.getItem('userToken')
                    }
                })
            console.log(data);
        
            //  setComment(data)
            if (data.message === 'success') {
                toast.success('your comment is shared successfully')
           console.log(data?.comment?._id);
           onAdd(data.comments[0])
           formik.values.content=''
            }
        }
    })


    return <>

        <Box >
            <form onSubmit={formik.handleSubmit} >
               
                <Box  sx={{ display: 'flex' }} >
                <TextField name='content' type='text' onChange={formik.handleChange} value={formik.values.content} placeholder='write a comment...' sx={{ px: '10px', width:'75%'}}  >

                </TextField>
                <Button variant='contained' type='submit'  sx={{width:'25%', marginRight:'10px'}} endIcon={<SendIcon />}>
                    send comment 
                </Button>
                </Box>
            </form>
        </Box>
    </>
}
