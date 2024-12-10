import React, { useState,useEffect,useRef } from "react";
import { Link } from "react-router-dom";
import "../styles/cart.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import loader from '../assets/images/loader.gif';



const CartAddress = () => {
  const modalRef = useRef(null);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const [refresh, setRefresh] = useState(false);

  const [showLoader,setShowLoader] = useState(false);
  const [addresses, setAddresses] = useState([]);


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, 
          },
        });
  
  
          setCartItems(response.data);
          console.log(response.data);
           
      
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
  
    fetchCartData();
  }, [refresh]);


  const handleAddressChange = (address) => {
    setSelectedAddress(address);
  };

  const onSubmit = async (data) => {
    modalRef.current.click();

    try {
      setShowLoader(true);
  
      // Ensure `address` structure matches schema
      const payload = {
        address: {
          name: data.name,
          mobileNo: data.mobile,
          pinCode: data.pincode,
          address: data.address,
          locality:data.locality,
          city: data.city,
          state: data.state,
        }
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
        setAddresses(response.data.addresses); // Set the addresses in state
      } catch (e) {
        console.error('Error fetching addresses:', e);
      }
    };

    fetchAddresses();
  }, [refresh]); 
  

  const handleRemoveAddress = async (addressId) => {
    try {
      // Make an API request to remove the address
      await axios.post(
        "http://localhost:4000/api/address/remove",
        { addressId }, // Send the address ID to be removed
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, // Send JWT token for authentication
          },
        }
      );
  
      // Optionally, you can refresh the address list or update the state
      setRefresh(!refresh); // This will trigger the useEffect to reload the addresses
    } catch (error) {
      console.error("Error removing address:", error);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center">
            <p className="fs_13">
              <span className="fw-bolder ">
                <Link className="text_dark" to="/Cart">
                  BAG
                </Link>
              </span>
              <span>--------</span>
              <span className="text-success fw-bolder ">
                <u>ADDRESS</u>
              </span>
              <span>--------</span>
              <span className="fw-bolder ">PAYMENT</span>
            </p>
            <hr className="dotted-line" />
          </div>
        </div>

        <div className="row d-flex justify-content-center p-0">
          {/* Left Side */}
          <div className="col-md-7 p-2">
            {/* Address section */}
            <div className="border border-gray rounded p-2 bg-light bg-gradient">
              <div className="row p-0 m-0">
                <div className="col-12">
                  <div className="d-flex justify-content-between">
                    <div>
                      <p className="fw-bolder f_14 mt-2">
                        Select Delivery Address
                      </p>
                    </div>
                    <div className="px-2">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal2"
                        type="submit"
                        className="btn btn-danger fw-medium f_12"
                      >
                        ADD NEW ADDRESS
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row mt-2">
              <p className="f_10 fw-bolder">DEFAULT ADDRESS</p>
            </div>

            {/* Address 1 */}

            {
  addresses &&
    addresses.map((item, index) => (
      <div
        key={index}
        className={`border border-gray rounded p-2 bg-light bg-gradient mt-2 ${
          selectedAddress === item._id ? "shadow" : "pointer"
        }`}
      >
        <div
          className="row p-0 m-0"
          onClick={() => handleAddressChange(item._id)} // Pass the unique address ID
        >
          <div className="col-12">
            <input
              type="radio"
              name="address"
              onChange={() => handleAddressChange(item._id)} // Set the address ID
              checked={selectedAddress === item._id} // Compare with the unique address ID
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
                    onClick={() => handleRemoveAddress(item._id)} // Pass the address ID to remove
                  >
                    REMOVE
                  </button>
                  {/* <button
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal3"
                    className="btn border f_12 fw-bolder"
                  >
                    EDIT
                  </button> */}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    ))
}


           


            {/* Edit and Add Address Modals can remain the same */}
          </div>

          {/* Right Side */}
          <div className="col-md-4">
            {/* price details start */}
            <div className="border border-gray rounded p-2 bg-light bg-gradient">
              <div className="row p-0 m-0">
                <div className="col-12 ">
                  <p className="fw-bolder f_12 mt-2">PRICE DETAILS</p>
                </div>
                <div className="col-6 ">
                  <p className="f_13 ">Total MRP</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">{cartItems.totalPrice}</p>
                </div>

                {/* <div className="col-6">
                  <p className="f_13 ">Discount on MRP</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">- 2100</p>
                </div>

                <div className="col-6">
                  <p className="f_13 ">Coupon Discount</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Apply Coupon</p>
                </div> */}

                <div className="col-6">
                  <p className="f_13 ">Platform Fee </p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Free</p>
                </div>

                <div className="col-6">
                  <p className="f_13 ">Shipping Fee</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Free</p>
                </div>

                <hr />
                <div className="col-6">
                  <p className="f_12 fw-bolder">Total Amount</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 fw-bolder">{cartItems.totalPrice}</p>
                </div>

                <div>
                  <Link to="/cartaddress">
                    <button
                      to="Cart_address"
                      type="button"
                      className="btn btn-danger w-100 fs_13 fw-bolder"
                    >
                      PLACE ORDER
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* price details end */}
          </div>
        </div>
      </div>

      {/* edit address start */}

      <div
        className="modal fade"
        id="exampleModal3"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title f_16" id="exampleModalLabel">
                EDIT ADDRESS
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form action="">
                <div>
                  <p className="f_13 fw_">CONTACT DETAILS</p>

                  <div class="form_wrap">
                    <div class="input_wrap">
                      <input className="address_input" type="text" required />
                      <label> Name*</label>
                    </div>

                    <div class="input_wrap my-3">
                      <input className="address_input" type="text" required />
                      <label>Mobile no*</label>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="f_13 fw_">ADDRESS</p>

                  <div class="form_wrap">
                    <div class="input_wrap">
                      <input className="address_input" type="text" required />
                      <label> Pincode*</label>
                    </div>

                    <div class="input_wrap my-3">
                      <input className="address_input" type="text" required />
                      <label>Address (House No, Street,Area)*</label>
                    </div>

                    <div class="input_wrap my-3">
                      <input className="address_input" type="text" required />
                      <label>Locality/Town*</label>
                    </div>
                    <div className="d-flex justify-content-between">
                      <div class="input_wrap my-3">
                        <input className="address_input" type="text" required />
                        <label>City/Dist*</label>
                      </div>

                      <div class="input_wrap my-3">
                        <input className="address_input" type="text" required />
                        <label>state*</label>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="">
                  <p className="f_13 fw_">SAVE ADDRESS AS</p>
                  <button className="f_11 border  rounded p-1 w_15">
                    HOME
                  </button>
                  <button className="f_11 border  rounded ms-4 p-1 w_15">
                    WORK
                  </button>
                </div> */}
              </form>
            </div>
            <div className="modal-footer modale_footer">
              <div className="mt-2">
                <button type="button" className="btn btn-danger w-100">
                  ADD ADDRESS
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* edit address end  */}

      {/* add address start */}

      <div
        className="modal fade"
        id="exampleModal2"
        tabindex="-1"
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
              {...register("name", {
                required: "Name is required",
              })}
            />
            <label>Name*</label>
          </div>
          {errors.name && (
            <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.name.message}</p>
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
            <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.mobile.message}</p>
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
            <label>Pincode*</label>
          </div>
          {errors.pincode && (
            <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.pincode.message}</p>
          )}

          <div className="input_wrap my-3">
            <input
              className="address_input"
              type="text"
              {...register("address", { required: "Address is required" })}
            />
            <label>Address (House No, Street, Area)*</label>
          </div>
          {errors.address && (
            <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.address.message}</p>
          )}

          <div className="input_wrap my-3">
            <input
              className="address_input"
              type="text"
              {...register("locality", { required: "Locality is required" })}
            />
            <label>Locality/Town*</label>
          </div>
          {errors.locality && (
            <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.locality.message}</p>
          )}

          <div className="d-flex justify-content-between">
            <div className="input_wrap my-3">
              <input
                className="address_input"
                type="text"
                {...register("city", { required: "City/District is required" })}
              />
              <label>City/Dist*</label>
            </div>
            {errors.city && (
              <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.city.message}</p>
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
              <p className="text-danger mb-3 f_13 fw_600 pt-1 ps-1 m-0">{errors.state.message}</p>
            )}
          </div>
        </div>
      </div>
    <div className="modal-footer modale_footer">
              <div className="mt-2">
                {/* <button type="submit" className="btn btn-danger w-100">
                  ADD ADDRESS
                </button> */}

{
  !showLoader?(
    <button
    type="submit"
    className="btn py-2 text-light btn-danger w-100 rounded-0 f_14 fw_600 mb-3"
  >
                  ADD ADDRESS
    
  </button>
  ):(
    <button
    type="submit"
    className="btn py-2 text-light btn-danger w-100 rounded-0 f_14 fw_600 mb-3"
    disabled
  >
    <img src={loader} className="loader" alt="loading" />
  </button>
  )
}
              </div>
            </div>
    </form>

            </div>
           
          </div>
        </div>
      </div>
      {/* add address end  */}
    </>
  );
};

export default CartAddress;
