import React, { useState } from "react";
import "../styles/login.css";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoMdKey } from "react-icons/io";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdOutlineEmail } from "react-icons/md";

const ForgotPass = () => {
  const [otpbox, setOtpBox] = useState(false);
  const [otpsent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setOtpBox(true);

    try {
      if (!otpsent) {
        const res = await axios.post("http://localhost:4000/forgotpass", data);
        if (res.data.success) {
          setOtpSent(true);
          toast.success("OTP has been sent!",{
            style: {
              backgroundColor: "#be7374",
              color: "#fff", 
            }})
        }
      } else if (otpsent && !otpVerified) {
        const verifyForgotOtp = await axios.post(
          "http://localhost:4000/verifyForgotPass",
          data
        );

        if (verifyForgotOtp.data.success) {
          toast.success("OTP Verified Successfully!",{
            style: {
              backgroundColor: "#be7374",
              color: "#fff", 
            }});
          setOtpVerified(true);
          setShowPasswordFields(true); 
        } else {
          toast.error("Invalid OTP. Please try again.");
        }
      } else if (otpVerified) {
       
        const resetPassword = await axios.post(
          "http://localhost:4000/resetPassword",
          data
        );

        if (resetPassword.data.success) {
          toast.success("Password reset successfully!",{
            style: {
              backgroundColor: "#be7374",
              color: "#fff", 
            }});
          navigate("/login"); 
        } else {
          toast.error(resetPassword.data.message || "Failed to reset password.");
        }
      }
    } catch (err) {
      console.log(err);
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center py-5"
      id="login-section"
    >
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-4">
            <div className="container p-4 bg-light">
              <h5 className="fw_600 mt-3 mb-4">Reset Your Password</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                {!otpVerified && (
                  <div className="div mb-3">
                    <div className="input-group">
                      <span
                        className="input-group-text px-3 f_13 py-2 fw_600 text_g rounded-0"
                        id="basic-addon1"
                      >
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
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}

                {otpbox && !otpVerified && (
                  <div className="div mb-3">
                    <div className="input-group">
                      <span
                        className="input-group-text f_13 fw_600 text_g rounded-0 px-3"
                        id="basic-addon1"
                      >
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
                      <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.otp.message}
                      </p>
                    )}
                  </div>
                )}

                {showPasswordFields && (
                  <>
                    <div className="div mb-3">
                      <div className="input-group">
                        <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3">
                          <RiLockPasswordLine />
                        </span>
                        <input
                          type="password"
                          className="form-control f_13 py-2 fw_600 rounded-0"
                          placeholder="New Password"
                          {...register("newPassword", {
                            required: "New password is required",
                            minLength: {
                              value: 6,
                              message: "Password must be at least 6 characters",
                            },
                          })}
                        />
                      </div>
                      {errors.newPassword && (
                        <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>

                    <div className="div mb-3">
                      <div className="input-group">
                        <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3">
                          <RiLockPasswordLine />
                        </span>
                        <input
                          type="password"
                          className="form-control f_13 py-2 fw_600 rounded-0"
                          placeholder="Confirm Password"
                          {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) =>
                              value ===
                              document.querySelector("input[name='newPassword']")
                                .value || "Passwords do not match",
                          })}
                        />
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="btn py-2 text-light btn-login w-100 rounded-0 f_14 fw_600 mb-3"
                >
                  {otpVerified ? "Reset Password" : "Send OTP"}
                </button>
              </form>
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
      />
    </div>
  );
};

export default ForgotPass;
