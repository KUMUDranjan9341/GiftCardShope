import React, { useState } from "react";
import "../styles/login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ImProfile } from "react-icons/im";
import { MdOutlineEmail } from "react-icons/md";
import axios from "axios";
import { IoMdKey } from "react-icons/io";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
  const [pass, setPass] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  // const [otpVerified, setOtpVerified] = useState(false); 
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    if (!otpSent) {
      setShowOtp(true);
      try {
        const response = await axios.post('http://localhost:4000/generate-otp', {
          mobile: data.num, 
          email:data.email
        });

        if (response.data.success) {
          setOtpSent(true);
        } else {
         
          toast.error(response.data.message || 'Failed to send OTP. Please try again.');
        }
      } catch (error) {
        toast.error(error.response?.data?.message || 'An error occurred while sending OTP.');

      }
    } else if (otpSent) {
      try {

        const verifyResponse = await axios.post('http://localhost:4000/verify-otp', {
          mobile: data.num,
          otp: data.otp,
          email:data.email
        });
        if (verifyResponse.data.success) {
          // setOtpVerified(true);
          const registerResponse = await axios.post('http://localhost:4000/register', {
            name: data.name,
            email: data.email,
            num: data.num,
            password: data.password,
          });

          if (registerResponse.data.success) {
            navigate('/login');
          } else {
   

          toast.error(registerResponse.data.message || 'Registration failed. Please try again.');

          }
        } else {
          toast.error(verifyResponse.data.message || 'Invalid OTP. Please try again.');
        }
      } catch (error) {
      
        toast.error(error.response?.data?.message || 'An error occurred while verifying OTP.');

      }
    }
  };

  return (
    
    <div className="container-fluid d-flex justify-content-center align-items-center py-5" id="login-section">
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4">
            <div className="container p-4 bg-light">
              <h5 className="fw_600 mt-3 mb-4">Sign Up</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* Name Input */}
                <div className="div mb-3">
                  <div className="input-group">
                    <span className="input-group-text px-3 f_13 py-2 fw_600 text_g rounded-0" id="basic-addon1">
                      <ImProfile />
                    </span>
                    <input
                      type="text"
                      className="form-control py-2 f_13 fw_600 rounded-0"
                      placeholder="Name..."
                      {...register("name", { required: "Name is required" })}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Input */}
                <div className="div mb-3">
                  <div className="input-group">
                    <span className="input-group-text px-3 f_13 py-2 fw_600 text_g rounded-0" id="basic-addon1">
                      <MdOutlineEmail />
                    </span>
                    <input
                      type="text"
                      className="form-control py-2 f_13 fw_600 rounded-0"
                      placeholder="Email..."
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: "Enter a valid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.email.message}</p>
                  )}
                </div>

                {/* Mobile Number Input */}
                <div className="div mb-3">
                  <div className="input-group">
                    <span className="input-group-text f_13 py-2 fw_600 text_g rounded-0">+91</span>
                    <input
                      type="text"
                      className="form-control f_13 fw_600 rounded-0"
                      placeholder="Mobile no *"
                      {...register("num", {
                        required: "Phone number is required",
                        pattern: {
                          value: /^(?:[789]\d{9})$/,
                          message: "Phone number must be a valid 10-digit mobile number",
                        },
                      })}
                    />
                  </div>
                  {errors.num && (
                    <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.num.message}</p>
                  )}
                </div>

                {/* Password Input */}
                <div className="div mb-3">
                  <div className="input-group position-relative">
                    <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                      <RiLockPasswordLine />
                    </span>
                    <input
                      type={pass ? "password" : "text"}
                      className="form-control f_13 py-2 fw_600 rounded-0"
                      placeholder="Password"
                      {...register("password", { required: "Password is required" })}
                    />
                    <div className="pass-eye text_g" onClick={() => setPass(!pass)}>
                      {pass ? <MdRemoveRedEye /> : <IoEyeOff />}
                    </div>
                  </div>
                  {errors.password && (
                    <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.password.message}</p>
                  )}
                </div>

                {/* OTP Input */}
                {showOtp && (
                  <div className="div mb-3">
                    <div className="input-group">
                      <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                        <IoMdKey />
                      </span>
                      <input
                        type="text"
                        className="form-control f_13 py-2 fw_600 rounded-0"
                        placeholder="Enter OTP..."
                        maxLength="4"
                        {...register("otp", {
                          required: "OTP is required",
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "OTP must be a number",
                          },
                        })}
                      />
                    </div>
                    {errors.otp && (
                      <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.otp.message}</p>
                    )}
                  </div>
                )}

                <div className="f_13 mb-3">
                  By continuing, I agree to the
                  <NavLink to="/terms" className="text_p fw_600"> Terms of Use </NavLink>
                  & <NavLink to="/privacy" className="text_p fw_600"> Privacy Policy</NavLink>
                </div>

                <button type="submit" className="btn py-2 text-light btn-login w-100 rounded-0 f_14 fw_600 mb-3">
                  Create Account
                </button>
              </form>

              <div className="f_13 mb-3">
                Already have an account?
                <NavLink to="/login" className="text_p fw_600"> Login</NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer
      position="bottom-right" 
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      pauseOnHover
      draggable
      theme="colored"
      toastClassName="toast-error" 
      progressClassName="toast-progress-error" 
    />
    </div>
  );
};

export default SignUp;
