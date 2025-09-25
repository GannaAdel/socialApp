'use client'
import { Box, Button, TextField } from '@mui/material'
import React, { useRef } from 'react'
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import toast from 'react-hot-toast';


const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});
export default  function CreatePost() {
    let postBody = useRef<HTMLInputElement>(null)
    let postImage = useRef<HTMLInputElement>(null)

   async function fileDetails() {
        let body = postBody?.current?.value || '';
        let image = postImage?.current?.files?.[0];
        let dataDesign= new FormData()
        dataDesign.append(
            'body',body
        )
        if(image){
            dataDesign.append(
                'image',image
            )
        }
       let {data}= await axios.post('https://linked-posts.routemisr.com/posts', dataDesign , {
            headers:{
                token: localStorage.getItem('userToken')
            }
        })
        console.log(data);
        if(data.message==='success'){
            toast.success('success')
            if(postBody.current){
          postBody.current.value=''}
            if(postImage.current){
          postImage.current.value=''}

        }
        


    }


    return <>
        <Box sx={{ width: '50%', m: 'auto', mt: '30px', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <TextField id='tf' fullWidth multiline minRows={10} sx={{ p: '10px' }} inputRef={postBody} >

            </TextField>
            <Button fullWidth
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
            >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={(event) => console.log(event.target.files)}
                    multiple
                    ref={postImage}
                />
            </Button>
            <Button type='submit' onClick={fileDetails} variant="contained" sx={{ mt: '10px' }} endIcon={<SendIcon />}>
                Send
            </Button>

        </Box>

    </>
}
