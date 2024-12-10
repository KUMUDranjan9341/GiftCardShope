import React, { useEffect, useState ,useContext } from "react";
import "../styles/login.css";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdRemoveRedEye } from "react-icons/md";
import { IoEyeOff } from "react-icons/io5";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { MdOutlineEmail } from "react-icons/md";
import { AuthContext } from '../context/AuthContext';
import loader from '../assets/images/loader.gif';


const Login = () => {
  const { isLoggedIn, login,SERVER_URL } = useContext(AuthContext);
  const [pass, setPass] = useState(false);

  const [showLoader,setShowLoader] = useState(false);

  const navigate=useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    setShowLoader(!showLoader);
    axios.post('http://localhost:4000/login', data)
      .then((res) => {
        setShowLoader(false);
        console.log('res: ', res);
        if (res.status === 200) {
          login(res.data.token);  
          const role = res.data.role;
  
          if (role === 'admin') {
            navigate('/dashboard');  
          } else {
            window.history.back();
          }
  
        } else {
          alert(res.data.message); 
        }
      })
      .catch((err) => {
        setShowLoader(false);
        console.error(err); 
        if (err.response && err.response.data && err.response.data.message) {
          alert(err.response.data.message); 
        } else {
          alert("An error occurred. Please try again."); 
        }
      });
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
              <h5 className="fw_600 mt-3 mb-4">Login</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
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

                <div className="div mb-3">
                  <div className="input-group  position-relative">
                    <span
                      className="input-group-text f_13 fw_600 text_g rounded-0 px-3"
                      id="basic-addon1"
                    >
                      <RiLockPasswordLine />
                    </span>
                    <input
                      type={pass ? "password" : "text"}
                      className="form-control f_13 py-2 fw_600 rounded-0"
                      placeholder="Password..."
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />

                    <div
                      className="pass-eye text_g"
                      onClick={() => setPass(!pass)}
                    >
                      {pass ? <MdRemoveRedEye /> : <IoEyeOff />}
                    </div>
                  </div>

                  {errors.password && (
                    <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                      {errors.password.message}
                    </p>
                  )}
                </div>

{
  !showLoader?(
    <button
    type="submit"
    className="btn py-2 text-light btn-login w-100 rounded-0 f_14 fw_600 mb-3"
  >
    Login
  </button>
  ):(
    <button
    type="submit"
    className="btn py-2 text-light btn-login w-100 rounded-0 f_14 fw_600 mb-3"
    disabled
  >
    <img src={loader} className="loader" alt="loading" />
  </button>
  )
}
               
              </form>

              <div className="f_13 mb-3">
                New user?
                <NavLink to="/signUp" className="text_p fw_600">
                  {" "}
                  Create account
                </NavLink>


                <NavLink to="/forgotpass" className="float-end text_p fw_600">
                  {" "}
                  forgot pass?
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
