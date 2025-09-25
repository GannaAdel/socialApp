'use client'
import { Comment } from '@/Interfaces/PostInterface'
import { Avatar, Box, Button, Card, CardContent, CardHeader, IconButton, TextField, Typography } from '@mui/material'
import { red } from '@mui/material/colors'
import Image from 'next/image'
import React, { useState } from 'react'
import user from '../../../assets/user.jpg'
import { useDispatch } from 'react-redux'
import { deleteComment, updateComment } from '@/lib/commentSlice'
import { store } from '@/lib/store'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import UpdateIcon from '@mui/icons-material/Update';


export default function CommentCard({ currentComment, Delete ,Update }: { currentComment: Comment,  Delete: (id: string) => void , 
   Update: (params: { commentId: string; commContent: string }) => void}) {
  let dispatch = useDispatch<typeof store.dispatch>()
  
  const [editShow, setEditShow] = React.useState(false);
  const [newContent, setNewContent] = React.useState(currentComment.content)

  function handleImage(imgSrc: string) {
    if (imgSrc.includes('undefined')) {
      return user
    } else {
      return imgSrc
    }
  }

  return <>

    <Box>

      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image src={handleImage(currentComment?.commentCreator?.photo)} alt={currentComment?.commentCreator?.name} width={100} height={100} />
          </Avatar>
        }

        title={currentComment?.commentCreator?.name}
        subheader={currentComment?.createdAt}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {currentComment?.content}

        </Typography>
        <Button  sx={{color:'red'}} onClick={() => {
          Delete(currentComment._id)
        }}><DeleteIcon/></Button>


        {
          !editShow ?
            (<Button  sx={{color:'black'}} onClick={() => {
              setEditShow(true)
            }}><EditIcon/></Button>) : <>
              <TextField fullWidth
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                size="small"
              />


              <Button  sx={{color:'green'}} onClick={() => {
                Update({ commentId: currentComment._id, commContent: newContent || '' })
                setEditShow(false)
              }}>
                <UpdateIcon/>
              </Button>

            </>

        }




      </CardContent>
    </Box>

  </>
}
