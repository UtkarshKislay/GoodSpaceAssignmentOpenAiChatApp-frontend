import React, { useEffect } from 'react'
import axios from 'axios';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { saveUserInfo } from '../../Redux/action';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:5000/user';

const Login = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const [userInfo, setUserInfo] = useState({
      email: '',
      userName: '',
      password: ''
   });
   const [otpValue, setOtpValue] = useState();
   const [login, setLogin] = useState(false);
   const [otpSent, setOtpSent] = useState(0);
   const [isRegistered, setIsRegistered] = useState(0);

   const [errorMessage, setErrorMessage] = useState({
      userNameAlreadyExist: '',
      emailAlreadyExist: '',
      passwordNotMatched: '',
      userNameNotExist: ''
   });

   useEffect(() => {
      const reset = () => {
         setOtpValue(null);
         setLogin(false);
         setOtpSent(0);
      }
      reset();

   }, [userInfo.email]);


   const handleLogin = async () => {
      try {
         const res = await axios(`${BASE_URL}/login`, {
            method: 'post',
            data: {
               userName: userInfo.userName,
               password: userInfo.password
            }
         });

         const message = res.data.message;
         if (message === 'Login Successfull') {
            const user = res.data.user;
            console.log(user);
            console.log(user.userEmail, " ", user.userName);
            dispatch(saveUserInfo(user));
            navigate('/home');
         } else if (message === 'Password not matched') {

         } else if (message === "UserName not exist") {

         } else {
            //server error
         }
      } catch (err) {
         console.log("error occured in Login: ", err);
      }


   }
   const handleRegisteration = async () => {
      try {
         console.log(userInfo);
         const res = await axios(`${BASE_URL}/register`, {
            method: 'post',
            data: userInfo,
         });
         const message = res.data;
         if (message === 'New user save Successfully') {
            setIsRegistered(1);
         } else if (message === "Email Already Exist") {

         } else if (message == "Username Already Exist") {

         } else {
            //server error
         }
      } catch (err) {
         console.log("Error occured in Registration: ", err);
      }
   }

   const handleGenerateOtp = async () => {
      try {
         const res = await axios(`${BASE_URL}/registration/generate-otp`, {
            method: 'post',
            data: {
               email: userInfo.email,
            }
         });
         if (res.data === 'OTP sent successfully') {
            setOtpSent(1);
         }

      } catch (err) {
         console.log(err);
      }
   }

   const handleVerifyOTP = async () => {
      try {
         console.log("verifyOtp", otpValue);
         console.log("email: ", userInfo.email);
         const res = await axios(`${BASE_URL}/registration/verify-otp`, {
            method: 'Post',
            data: {
               email: userInfo.email,
               otp: otpValue
            }
         });
         console.log(res.data);
         if (res.data === 'Email verfied successfully') {
            setOtpSent(2);
         }

      } catch (err) {
         console.log(err);
      }
   }

   const handleChange = (e) => {
      const { name, value } = e.target;
      setUserInfo(prev => ({
         ...prev,
         [name]: value
      }))
   }

   const handleFormSubmit = (e) => {
      e.preventDefault();
      if (login) {
         handleLogin();
      } else {
         handleRegisteration();
      }
   }



   return (
      <div>

         <div className="userRegistration">
            {!login ? (
               <div className="email">
                  <input type="email" placeholder='Email' value={userInfo.email} onChange={handleChange} name='email' />
                  {otpSent === 0 ? (
                     <div>
                        <button onClick={handleGenerateOtp}>
                           Get OTP
                        </button>
                     </div>
                  ) : otpSent == 1 ? (
                     <div>
                        <input type="number" placeholder='Enter OTP' value={otpValue} onChange={(e) => setOtpValue(e.target.value)} name='otp' />
                        <button onClick={handleVerifyOTP}>
                           Verify OTP
                        </button>
                     </div>
                  ) : otpSent == 2 ? (
                     <div>
                        Email verified Successfully!
                     </div>
                  ) : null}
               </div>
            ) : null}

            <form onSubmit={handleFormSubmit}>
               <div className="userName">
                  <input type="text" placeholder='UserName' value={userInfo.userName} onChange={handleChange} name='userName' required />
               </div>
               <div className="password">
                  <input type="text" placeholder='Password' value={userInfo.password} onChange={handleChange} name='password' required />
               </div>
               <button disabled={otpSent !== 2 && !login}>
                  {login ? 'Login' : 'Register'}
               </button>
               {isRegistered == 1 ? (
                  <div>
                     User Successfully Save, you can login now!
                  </div>
               ) : null}

               <div className="login">
                  <p>{!login ? 'Already Registered,' : 'Not Registered,'} <span onClick={() => {
                     setLogin(1 - login);

                  }}>{!login ? 'Login!' : 'Registration!'}</span></p>
               </div>
            </form>
         </div>

         {/* </form> */}



      </div>
   )
}

export default Login