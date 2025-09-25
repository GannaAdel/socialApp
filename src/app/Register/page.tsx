'use client'
import { userRegister } from '@/Interfaces/userInterfaces'
import { store } from '@/lib/store'
import { Box, Button, FormControl, FormControlLabel, FormLabel, Paper, Radio, RadioGroup, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useFormik } from 'formik'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import * as Yup from 'yup'


export default function Register() {


  let dispatch = useDispatch<typeof store.dispatch>()
  let router=useRouter()

     let validationSchema = Yup.object().shape({
        name: Yup.string().required('Input is required').min(3, 'min 3 letters').max(15, 'max 15 letters'),
        email: Yup.string().required('Input is required').email('Invalid email'),
        password: Yup.string().required('Input is required').matches(/^[A-Z][a-z0-9]{4,9}$/, 'Invalid password'),
        rePassword: Yup.string().required('Input is required').oneOf([Yup.ref('password')], 'Enter the same password'),
        dateOfBirth: Yup.date().required('Input is required').max(new Date(), 'Date of birth cannot be in the future')
      })

  let formik = useFormik<userRegister>({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      dateOfBirth: '',
      gender: ''


    },
    validationSchema,
    onSubmit: async (val: userRegister) => {
      console.log(val);
     try {
       let { data } = await axios.post('https://linked-posts.routemisr.com/users/signup', val)
      console.log(data);
      if(data.message==='success'){
        toast.success('password changed successfuly')
        router.push('Login')
      }

     } catch (error) {
      toast.error('error')
     }
    },
  })

  
  return <>
    <Box sx={{ width: '50%', mx: 'auto', my: '30px' }}>
      <Paper elevation={24} sx={{ p: '20px' }}>
        <form action="" onSubmit={formik.handleSubmit} >

          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography sx={{ marginTop: '30px', mx: '20px', }} variant="h4" component="h4">
              Sign up
            </Typography>
            <TextField onChange={formik.handleChange} value={formik.values.name} id="name" type='text' name='name' label="name" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
              {formik.errors.name && formik.touched.name ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red' ,p:'5px' , mt:'10px' , color:'white'}}  role="alert">
              <p>{formik.errors.name}</p>
      
            </Box> : null}
            <TextField onChange={formik.handleChange} value={formik.values.email} id="email" type='text' name='email' label="email" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
             {formik.errors.email && formik.touched.email ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
              <p>{formik.errors.email}</p>
      
            </Box> : null}
            <TextField onChange={formik.handleChange} value={formik.values.password} id="password" type='password' name='password' label="password" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
             {formik.errors.password && formik.touched.password ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
              <p>{formik.errors.password}</p>
      
            </Box> : null}
            <TextField onChange={formik.handleChange} value={formik.values.rePassword} id="rePassword" type='password' name='rePassword' label="rePassword" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
             {formik.errors.rePassword && formik.touched.rePassword ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
              <p>{formik.errors.rePassword}</p>
      
            </Box> : null}
            <TextField onChange={formik.handleChange} value={formik.values.dateOfBirth} id="dateOfBirth" type='date' name='dateOfBirth' label="dateOfBirth" variant="outlined" sx={{ marginBlock: '10px', width: '100%', }} />
             {formik.errors.dateOfBirth && formik.touched.dateOfBirth ? <Box sx={{display:'flex' , justifyContent:"center" , alignItems:'center' , bgcolor:'red', p:'5px' , mt:'10px' , color:'white'}}  role="alert">
              <p>{formik.errors.dateOfBirth}</p>
      
            </Box> : null}
            <FormControl >
              <FormLabel id="gender">Gender</FormLabel>
              <RadioGroup
                aria-labelledby="gender"
                name="gender"
                value={formik.values.gender}
                onChange={formik.handleChange}
              >
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
            <Button type='submit' variant="contained" sx={{ my: '30px', ml: '20px' }}>Register</Button>

          </Box>

        </form>
      </Paper>
    </Box>
  </>
}
