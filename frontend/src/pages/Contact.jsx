import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { FaUser, FaEnvelope, FaCommentDots } from 'react-icons/fa';
import '../styles/contact.css';


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [status, setStatus] = useState('');

 
  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:4000/contact', data
       
      );
      toast.success (response.data.message); 
      reset();
    } catch (error) {
      toast.error('Error:', error.response ? error.response.data.message : 'Unknown error');
      toast.error('Message not sent, please try again.');
    }
  };

  return (
    <>
      <div className="container-fluid p-3 contact">
        <div className="row r-0 m-0 d-flex justify-content-center">
          <div className="col-md-12 ">
            <p>Gifymo &gt; <span className="text-danger"><b>Contact</b></span> </p>
          </div>
          <div className="col-md-3 ">
            <h3 className="text-center">We are here to help!</h3>
            <hr className="dotted-line" />
          </div>
        </div>

        <div className="row p-0 m-0 tech">
          <div className="col-md-5">
            <div>
              <h2>Get in Touch</h2>
              <p>Contact us to find out more or how we can help you better.</p>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="contact_form py-3">
                  <div className="input_group">
                    <span><FaUser className="input-icon" /></span>
                    <input
                      {...register('name', { required: 'Name is required' })}
                      className="contact_input ms-2"
                      type="text"
                      placeholder="Name"
                    />
                    {errors.name && <p className="error">{errors.name.message}</p>}
                  </div>
                </div>

                <div className="contact_form py-3">
                  <div className="input_group">
                    <span><FaEnvelope className="input-icon" /></span>
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: 'Invalid email address',
                        }
                      })}
                      className="contact_input ms-2"
                      type="email"
                      placeholder="email@example.com"
                    />
                    {errors.email && <p className="error">{errors.email.message}</p>}
                  </div>
                </div>

                <div className="contact_form pb-3">
                  <p className="mb-0">Say something ...</p>
                  <textarea
                    {...register('message', { required: 'Message is required' })}
                    className="ms-2 w-100 bg_g"
                    rows={10}
                    placeholder=""
                  ></textarea>
                  {errors.message && <p className="error">{errors.message.message}</p>}
                </div>

                <div className="contact_form pb-3 submit">
                  <button type="submit" className="btn">
                    <p className="mb-0 b_doted">SUBMIT</p>
                  </button>
                </div>
              </form>
              {status && <p className="status-message">{status}</p>}
            </div>
          </div>

          <div className="col-md-5">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.344431278781!2d77.02473757396231!3d28.619437475671866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85134102c64d85ad%3A0x69064f3edd54013!2sFHG%20Technologies!5e0!3m2!1sen!2sin!4v1729513790139!5m2!1sen!2sin"
              width="100%" height="300" allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

            <div className="py-4">
              <h4>Opening hours :</h4>
              <p>Address: <span>Dwarka Mor</span></p>
              <p>Phone: <span>826-668-9643 / 826-668-1983</span> </p>
              <p>Email: <span>info.service@example.com</span> </p>
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
    </>
  );
};

export default Contact;
