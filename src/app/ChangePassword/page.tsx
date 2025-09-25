'use client'
import { ChangePass, userToken} from '@/Interfaces/userInterfaces'
import { store } from '@/lib/store'
import { userReducer } from '@/lib/userSlice'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


export default function ChangePassword() {
  let {token}=useSelector((state:any)=> state.userReducer
    // console.log(x);
    
  )
  let router= useRouter()
  
  let formik= useFormik<ChangePass>({
    initialValues:{
     password:'',
     newPassword:''
    },
    onSubmit:async(val)=>{
 try {
    const { data } = await axios.patch(
      'https://linked-posts.routemisr.com/users/change-password',
      val,
      { headers: { token } }
    );
    console.log(data);
    if(data.message==='success'){
        toast.success('password changed successfuly')
        router.push('/')
      }
  } catch (err: any) {
    console.error("Error:", err.response?.data || err.message);
  }


    }
  })
  return <>
      <Box sx={{ width: '50%', mx: 'auto', my: '30px' }}>
      <Paper elevation={24} sx={{ p: '20px' }}>
        <form action="" onSubmit={formik.handleSubmit}>

          <Typography sx={{ marginTop: '30px', mx: '20px', }} variant="h4" component="h4">
            Change Password
          </Typography>
          <TextField onChange={formik.handleChange} value={formik.values.password} id="password" type='password' name='password' label="password" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
          <TextField onChange={formik.handleChange} value={formik.values.newPassword} id="newPassword" type='password' name='newPassword' label="newPassword" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
          <Button type='submit' variant="contained" sx={{ my: '30px', ml: '20px' }}>Submit</Button>

        </form>
      </Paper>
    </Box>
  
  </>
}
