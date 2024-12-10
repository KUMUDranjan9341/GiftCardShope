import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import '../styles/myprofile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import axios from "axios";
import { useForm } from "react-hook-form";
import loader from '../assets/images/loader.gif';

const MyAddress = () => {
  const modalRef = useRef(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const onSubmit = async (data) => {
    modalRef.current.click();
    try {
      setShowLoader(true);

      const payload = {
        address: {
          name: data.name,
          mobileNo: data.mobile,
          pinCode: data.pincode,
          address: data.address,
          locality: data.locality,
          city: data.city,
          state: data.state,
        },
      };

      await axios.post("http://localhost:4000/api/address", payload, {
        headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` },
      });

      setShowLoader(false);
      setRefresh(!refresh);
    } catch (error) {
      console.error("Error submitting address:", error);
      setShowLoader(false);
    }
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/address', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setAddresses(response.data.addresses);
      } catch (e) {
        console.error('Error fetching addresses:', e);
      }
    };

    fetchAddresses();
  }, [refresh]);

  const handleRemoveAddress = async (addressId) => {
    try {
      await axios.post(
        "http://localhost:4000/api/address/remove",
        { addressId },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setRefresh(!refresh);
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  // if (loading) {
  //   return <div className="container my-3">Loading...</div>;
  // }

  return (
    <>
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <h5 className="p-0 m-0">Account</h5>
            <p className="f_13 fw-bold text-success">
              {userData ? userData.name : 'No name available'}
            </p>
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
              <div className="d-flex justify-content-between">
                <div>
                  <h5>Saved Addresses</h5>
                </div>
                <div className="px-2">
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                    className="btn btn-danger fw-medium f_12"
                  >
                    ADD NEW ADDRESS
                  </button>
                </div>
              </div>
              <hr />
              {addresses && addresses.length > 0 ? (
                addresses.map((item, index) => (
                  <div
                    key={index}
                    className={`border border-gray rounded p-2 bg-light bg-gradient mt-2 ${
                      selectedAddress === item._id ? 'shadow' : 'pointer'
                    }`}
                    onClick={() => handleAddressChange(item._id)}
                  >
                    <div className="row p-0 m-0">
                      <div className="col-12">
                        <input
                          className="d-none"
                          type="radio"
                          name="address"
                          onChange={() => handleAddressChange(item._id)}
                          checked={selectedAddress === item._id}
                        />
                        <span className="fw-bolder f_14 mt-2 address ps-2">
                          {item.name}
                        </span>
                      </div>
                      <div className="col-12">
                        <div className="p-3">
                          <p className="f_12 p-0 m-0">{item.address}</p>
                          <p className="pincode f_12 p-0">
                            <span className="state">{item.state}</span>,{" "}
                            <span className="pincode">{item.pinCode}</span>
                          </p>
                          <p className="f_12 p-0">
                            Mobile:{" "}
                            <span className="mobile_number fw-bolder">
                              {item.mobileNo}
                            </span>
                          </p>

                          {selectedAddress === item._id && (
                            <div>
                              <button
                                className="btn border f_12 me-2 fw-bolder"
                                onClick={() => handleRemoveAddress(item._id)}
                              >
                                REMOVE
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div>No addresses found.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add New Address Modal */}
      <div
        className="modal fade"
        id="exampleModal2"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title f_16" id="exampleModalLabel">
                ADD NEW ADDRESS
              </h5>
              <button
                ref={modalRef}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                  <p className="f_13 fw_">CONTACT DETAILS</p>
                  <div className="form_wrap">
                    <div className="input_wrap">
                      <input
                        className="address_input"
                        type="text"
                        {...register("name", { required: "Name is required" })}
                      />
                      <label>Name*</label>
                    </div>
                    {errors.name && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.name.message}
                      </p>
                    )}

                    <div className="input_wrap my-3">
                      <input
                        className="address_input"
                        type="text"
                        {...register("mobile", {
                          required: "Mobile number is required",
                          pattern: {
                            value: /^[0-9]{10}$/,
                            message: "Mobile number must be 10 digits",
                          },
                        })}
                      />
                      <label>Mobile no*</label>
                    </div>
                    {errors.mobile && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.mobile.message}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <p className="f_13 fw_">ADDRESS</p>
                  <div className="form_wrap">
                    <div className="input_wrap">
                      <input
                        className="address_input"
                        type="text"
                        {...register("pincode", {
                          required: "Pincode is required",
                          pattern: {
                            value: /^[0-9]{6}$/,
                            message: "Pincode must be 6 digits",
                          },
                        })}
                      />
                      <label>Pin Code*</label>
                    </div>
                    {errors.pincode && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.pincode.message}
                      </p>
                    )}

                    <div className="input_wrap my-3">
                      <input
                        className="address_input"
                        type="text"
                        {...register("address", { required: "Address is required" })}
                      />
                      <label>Address*</label>
                    </div>
                    {errors.address && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.address.message}
                      </p>
                    )}

                    <div className="input_wrap my-3">
                      <input
                        className="address_input"
                        type="text"
                        {...register("locality", { required: "Locality is required" })}
                      />
                      <label>Locality*</label>
                    </div>
                    {errors.locality && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.locality.message}
                      </p>
                    )}

                    <div className="input_wrap my-3">
                      <input
                        className="address_input"
                        type="text"
                        {...register("city", { required: "City is required" })}
                      />
                      <label>City*</label>
                    </div>
                    {errors.city && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.city.message}
                      </p>
                    )}

                    <div className="input_wrap my-3">
                      <input
                        className="address_input"
                        type="text"
                        {...register("state", { required: "State is required" })}
                      />
                      <label>State*</label>
                    </div>
                    {errors.state && (
                      <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-between">
                  <div>
                    {/* <button
                      type="button"
                      className="btn btn-light"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button> */}
                  </div>

                  <div className='my-2 w-100'>
                    <button type="submit" className="btn btn-danger w-100 fs_13 fw-bolde">
                      {showLoader ? (
                        <img src={loader} alt="Loading..." className="loader" />
                      ) : (
                        "Save Address"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAddress;
