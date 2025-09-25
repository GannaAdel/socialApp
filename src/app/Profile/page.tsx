'use client'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Box, Paper, Typography, TextField, Button } from '@mui/material'
import Image from 'next/image'
import { store } from '@/lib/store'

export default function Profile() {
  let {token}= useSelector((state: ReturnType<typeof store.getState>)=> state.userReducer)
  const [user, setUser] = useState<any>(null)


async function getMyProfile(){
let {data} = await axios.get('https://linked-posts.routemisr.com/users/profile-data', {
    headers:{
        token
    }

})
console.log(data.user);
setUser(data.user)
}

useEffect(()=>{
 getMyProfile()
}, [token])


  if (!user) return <Typography>Couldn't load profile</Typography>

  return (
    <Box sx={{ width: '60%', mx: 'auto', my: '30px' }}>
      <Paper elevation={24} sx={{ p: '20px' }}>
        <Typography variant="h4" component="h4" gutterBottom>
          My Account
        </Typography>

    
        <TextField
          label="Name"
          value={user.name}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Email"
          value={user.email}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Gender"
          value={user.gender}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />
        <TextField
          label="Date of Birth"
          value={user.dateOfBirth?.slice(0, 10)}
          fullWidth
          margin="normal"
          InputProps={{ readOnly: true }}
        />

       
      </Paper>
    </Box>
  )
}