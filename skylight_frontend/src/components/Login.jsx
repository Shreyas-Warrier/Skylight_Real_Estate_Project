/* eslint-disable no-unused-vars */
import React from 'react'
import {GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from '@react-oauth/google';
import {useNavigate, Link} from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import shareVideo from '../assets/share.mp4'
import logo from '../assets/rm2.png'

const Login = () => {

  const navigate = useNavigate();
  const clientId = '358895354080-3641s7oqn86e49jf9aouem37qf16ims3.apps.googleusercontent.com'
  
  const handleLogin = (credentialResponse) => {
    console.log(credentialResponse);
    navigate('/home');
  }

  const handleFail = () => {
    console.llog('Login Failed');
  }

  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative w-full h-full'>
          <video
            src={shareVideo}  
            type="video/mp4"
            loop
            controls={false}
            muted
            autoPlay
            className='w-full h-full object-cover'
          />

          <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
              <div className='p-5'>
                  <img src={logo} width='130px' alt='logo' />
              </div>
              <div>
              
              </div>
              <div className="shadow-2xl">
              <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                render={(renderProps) => (
                  <button
                    type="button"
                    className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                  >
                    <FcGoogle className="mr-4" /> Sign in with Google
                  </button>
                )}
                  onSuccess={handleLogin}
                  onError={handleFail}
                  cookiePolicy="single_host_origin"
                />
                
              </GoogleOAuthProvider>

              </div>
                  <br />
              <Link to="/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Register</Link>
              <br />
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Login</Link> 
          </div>
      </div>
    </div>
  )
}

export default Login