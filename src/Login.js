import { Button } from '@mui/material'
import React from 'react'
import "./Login.css"
import { auth, provider } from './Firebase';
import { useStateValue } from './Stateprovider';
import { actionTypes } from './Reducer';
import { Instagram, Twitter } from '@mui/icons-material';

function Login() {
  let [{},dispatch]=useStateValue()
    let singIn =()=>{
     auth.signInWithPopup(provider)
       .then((result)=>
       dispatch({
        type:actionTypes.SET_USER,
        user:result.user,
       })
       )
       .catch((error)=>alert(error.message))
    }
  return (
    <div className='login'>
        <div className='login_container'>
          <div className='logintext'> <img src="./whatsappLogo.png" alt='whatsapp-logo' className='imagelogin'/></div>  
           <div className='logintext'><h1 className='loginheadding'>sing in to whatsapp</h1></div>
          <Button onClick={singIn} id="loginbutton">Sing In With Google</Button>
         <div className='logindevloper'><div className='logininfodev'><a href='https://www.instagram.com/muheer_11/?' className='links'><Instagram id="linkshover"/> instagrame</a> <a href='https://twitter.com/MUHEER_MAQBOOL'className='links'><Twitter id="linkshover"/> twitter</a></div></div> 
        </div>  
    </div>
  )
}

export default Login
