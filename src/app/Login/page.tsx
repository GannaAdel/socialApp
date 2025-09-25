'use client'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import React from 'react'
import { useFormik } from 'formik'
import { user } from '@/Interfaces/userInterfaces'
import { useDispatch } from 'react-redux'
import { userLogin } from '@/lib/userSlice'
import { store } from '@/lib/store'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import Link from 'next/link'
import * as Yup from 'yup'


export default function Login() {
  let router = useRouter()
  let dispatch = useDispatch<typeof store.dispatch>()

    // let validationSchema = Yup.object().shape({
    //       email: Yup.string().required('Input is required').email('Invalid email'),
    //       password: Yup.string().required('Input is required').matches(/^[A-Z][a-z0-9]{4,9}$/, 'Invalid password'),
    
    //     })
  let formik = useFormik<user>({
    initialValues: {
      email: '',
      password: ''
    },
    // validationSchema,
    onSubmit: (values) => {
      console.log(values);
      dispatch(userLogin(values)).then((resp) => {
        console.log('response', resp);
        if (resp.payload.message === 'success') {
          toast.success('logged in successfuly')
          router.push('/')


        }
      }).catch((err) => {
        console.log('error', err);
        toast.error('email or password is not correct')

      })
    },

  })



  return <>
    <Box sx={{ width: '50%', mx: 'auto', my: '30px' }}>
      <Paper elevation={24} sx={{ p: '20px' }}>
        <form action="" onSubmit={formik.handleSubmit}>

          <Typography sx={{ marginTop: '30px', mx: '20px', }} variant="h4" component="h4">
            Login
          </Typography>
          <TextField onChange={formik.handleChange} value={formik.values.email} id="email" type='text' name='email' label="email" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
          {formik.errors.email && formik.touched.email ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
                        <p>{formik.errors.email}</p>
                
                      </Box> : null}
          <TextField onChange={formik.handleChange} value={formik.values.password} id="password" type='password' name='password' label="password" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
          {formik.errors.password && formik.touched.password ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
                        <p>{formik.errors.password}</p>
                
                      </Box> : null}
          <Link href={'/ChangePassword'}>
            forget password?
          </Link>
          <Button type='submit' variant="contained" sx={{ my: '30px', ml: '20px' }}>Login</Button>

        </form>
      </Paper>
    </Box>
  </>
}
