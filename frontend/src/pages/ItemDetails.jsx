import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import '../styles/myprofile.css';
import ProfileSidebar from '../components/ProfileSidebar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
import card_image from "../assets/images/21.jpg";
import { MdNavigateNext } from "react-icons/md";
import { RiCustomerService2Fill } from "react-icons/ri";
import { LuBox } from "react-icons/lu";

const ItemDetails = () => {
 

  return (
    <>

  
      <div className="container my-3">
        <div className="row d-flex justify-content-center">
          <div className="col-md-10">
            <h5 className="p-0 m-0">Account</h5>
            <p className="f_13 fw-bold text-success">KUMUD RANJAN</p>
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
              <h5>Item Details</h5>
              <hr />
              
                  
              <div className="row d p-0 m-0">
            {/* <Link> */}
            <div className=" rounded  text-black items_details">
               
                <div className='d-flex justify-content-end'>
                    {/* <div className="col border border-danger"> */}
                    <Link>
                   <div className='text-black d-flex'>
                   <span className='f_15 fw-bolder mt-3 me-2'>Help </span><span className='help mt-3'> <RiCustomerService2Fill /></span>
                   </div>
                    </Link>
                    {/* </div> */}
                
                </div>
               
                <div  className="d-flex justify-content-center">
                <div className=' items_box'>
                   <div className="  order_image">
                      <img className="img-fluid" src={card_image} alt="" />
                      </div>
                      <div className="py-1 text-center">
                      <p className="product_name f_14 mb-0 pb-0 fw-bold">
                        The Formal Club
                      </p>
                      <p className="product_tyle f_13 mb-0 pb-0"> toy</p>
                     
                     <p className="product_size f_13 mb-0 pb-0">Size : 9</p>

                     <p className="product_size f_13 mb-0 pb-0">Qty : 2</p>
                    </div>
                   </div>
                </div >

                <div className='deliver d-flex  align-items-center bg1 my-2'>
  <div className='px-2 '>
  <span className='f_15 text-light'><LuBox /></span>
  </div>
 <div>
 <p className='m-0 p-0 f_13 text-light fw-bolder'>Delivered</p>
 <p className='m-0 p-0 f_11 text-light'>On Thu, 8 Jun</p>
 </div>
                </div>


                <div className='deliver_address  mt-2 bg-light rounded border my-2  '>
                    <div className='py-2 px-2'>
                    <p className='f_14 fw-bolder p-0 m-0 '>Delivery Address</p>
                    </div>

                    <div className="p-3 pt-0 pb-0 text-secondary">
                        <p className="f_12 p-0 m-0 fw-bolder">KUMUD RANJAN</p>
                    <p className="f_12 p-0 m-0">
                      AIKM PG Ramphal Chawk Near InstaMart Dwarka Sec-07
                    </p>
                    <p className="pincode f_12 p-0">
                      <span className="state">New Delhi</span> ,{" "}
                      <span className="pincode">110077</span>
                    </p>
                    <p className="f_12 p-0">
                      Mobile:{" "}
                      <span className="mobile_number fw-bolder">
                        {" "}
                        7903372049
                      </span>
                    </p>

                  </div>
 
                </div>

                <div className='price_details  mt-2 bg-light rounded border my-2'>
                    <div className='py-2 px-2'>
                    <p className='f_14 fw-bolder p-0 m-0'>Total Order Price</p>
                    </div>

                    <div className="p-3 pt-0 pb-0 d-flex  justify-content-between">
                   <div>
                   <p className="f_12 p-0 m-0 text-secondary">
                    You saved ₹ <span className='text-success fw-bolder'>975.00</span> on this order
                    </p>
                   </div>

                   <div>
                   <p className="f_14 p-0 m-0 fw-bolder">
                     ₹ <span className=' '> 1,499.00 </span>  
                    </p>
                    <p  className="f_13 p-0 m-0 fw-bolder text-danger cursor_pointer"   data-bs-toggle="modal"
                        data-bs-target="#price">View Breakup</p>
                   </div>
                   
                  </div>
                  <div className='p-3 '>
                    <button className='btn border f_13 py-2 fw-bolder w-100 invoice'>Get Invoice</button>
                  </div>
 
                </div>
               
                <div className='price_details  mt-2 bg-light rounded border my-2 mb-4 py-3'>
                   

                    <div className="p-3 pt-0 pb-0">
                   <div>
                   <p className="f_13 p-0 m-0 text-secondary">
                    Order ID <span className=''># </span> <span>123456789</span>
                    </p>
                   </div>

                  
                  </div>
                 
 
                </div>
                    
                
              </div>
              {/* </Link> */}
            </div>   
                    
                    
                  
                
            </div>
          </div>
        </div>
      </div>


      {/* Price details */}

   
      <div
        className="modal fade"
        id="price"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-0 border-0">
            <div className="modal-header">
              <h1 className="modal-title f_16 fw-bold  w-100" id="exampleModalLabel">
               
Payment Information
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

            <table className="table ">
                <tbody className='f_13'>
                  <tr>
                    <td className='text-secondary'><span className='product_qtn'>1</span> <span className='px-1'>x</span>  
                        <span className='product_name'>
                        Anouk Men Ethnic Motifs Printed Kurta
                        </span>
                        </td>
                    <td className='fw-bolder text-secondary'> <span>₹</span> 1,499.00</td>
                  </tr>
                  <tr>
                    <td className='text-secondary'>Discount</td>
                    <td className='fw-bolder text-secondary'> <span>₹ -</span> 975.00</td>
                  </tr>
                
                  <tr>
                    <td className='text-secondary'>Discounted Price</td>
                    <td className='fw-bolder text-secondary'> <span>₹</span> 524.00
                    .00</td>
                  </tr>
                  <tr>
                    <td className='text-secondary'>Shipping Fee</td>
                    <td className='fw-bolder text-secondary'> <span>₹</span> 10.00</td>
                  </tr>
                  <tr>
                    <td className='fw-bolder'>Total Paid</td>
                    <td className='fw-bolder'> <span>₹</span> 534.00.00</td>
                  </tr>

                  {/* <tr>
                  <div className='w-100'>
                    <button className='btn border f_13 py-2 fw-bolder w-100 invoice'>Get Invoice</button>
                  </div>
                  </tr> */}
                 
                  </tbody>
                      </table>
             
            </div>
          </div>
        </div>
      </div>

    
    </>
  );
};

export default ItemDetails;
