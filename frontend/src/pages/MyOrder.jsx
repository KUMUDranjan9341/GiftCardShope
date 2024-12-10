import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import '../styles/myprofile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import card_image from "../assets/images/21.jpg";
import { MdNavigateNext } from "react-icons/md";

const MyOrder = () => {

  const [addresses, setAddresses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:4000/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data) {
          setUserData(response.data);
        }
        setLoading(false);
      } catch (err) {
        console.error('Error fetching profile data:', err);
        setError('Failed to fetch profile data.');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);
  // if (loading) {
  //   return <div className="container my-3">Loading...</div>;
  // }


  return (
    <>
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <h5 className="p-0 m-0">Account</h5>
            <p className="f_13 fw-bold text-success"> {userData ? userData.name : 'No name available'}</p>
            <hr />
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="col-md-2">
            <div className="py-5">
              <ProfileSidebar />
            </div>
          </div>
          <div className="col-md-8">
            <div className="py-5 border px-5">
              <h5>Order Details</h5>
              <hr />
              
                  
              <div className="row mt-2 d p-0 m-0 ">
            <Link to='/itemdetails'>
            <div className="col-12  border border-gray rounded p-21 bg-light bg-gradient text-black my_order">
                <div className="row">
                  {/* <p className="text-end  p-0 m-0 pe-2">
                    {" "}
                    <FontAwesomeIcon className="pointer_text" icon={faXmark} />
                  </p> */}
                  <div className="col-sm-3 col-6  ">
                    <div className=" mt-1 border-0 order_image">
                      <img className="img-fluid" src={card_image} alt="" />
                    </div>
                  </div>

                  <div className="col-sm-8 col-6  p-0">
                    <div className="py-1">
                      <p className="product_name f_14 mb-0 pb-0 fw-bold">
                        The Formal Club
                      </p>
                      <p className="product_tyle f_13 mb-0 pb-0"> toy</p>
                      {/* <p className="product_seller f_13 mb-0 pb-0"> shiani </p> */}
                      {/* <p className="product_price f_14 fw-bold mb-0 pb-0">
                       Rs : 2000
                      </p> */}
                     <p className="product_size f_13 mb-0 pb-0">Size : 9</p>

                     <p className="product_size f_13 mb-0 pb-0">Qty : 2</p>
                    </div>
                  </div>

                  <div className="col-sm-1 col-6  p-0">
                    <div className="icon_height">
                     
                      
                     

                    <MdNavigateNext />
                    </div>
                  </div>
                </div>
              </div></Link>
            </div>   
                    
                    
                  
                
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {/* <div
        className="modal fade"
        id="Profile"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h1 className="modal-title f_16 fw-bold text-center w-100" id="exampleModalLabel">
                Edit Profile
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container">
                <form action="">
                  <div className="form_wrap">
                    <div className="input_wrap">
                      <input className="address_input" type="text" required />
                      <label>Name*</label>
                    </div>

                    <div className="input_wrap my-3">
                      <input className="address_input" type="email" required />
                      <label>Email*</label>
                    </div>

                    <div className="input_wrap my-3">
                      <input className="address_input" type="text" required />
                      <label>Mobile no*</label>
                    </div>

                    <div className="input_wrap my-3">
                      <input className="address_input" type="text" required />
                      <label>Birthday(dd/mm/yyyy)*</label>
                    </div>

                  </div>

                  <div>
                    <button className="btn bg-danger w-100 f_13 fw-bolder text-white">
                      SAVE DETAILS
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default MyOrder;
