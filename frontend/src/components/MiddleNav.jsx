import React from "react";
import {Link} from 'react-router-dom'
import { FaShippingFast } from "react-icons/fa";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { TbShoppingCartPause } from "react-icons/tb";
import logo from '../assets/images/logo.png';

const MiddleNav = () => {
  return (
    <>
      <div className="container-fluid d-xl-block d-none d-lg-block">
        <div className="row mx-4">
          <div className="col-md-3 py-5 text-center">

            <img src={logo} className="w-25" alt="shiani creations"/>
          </div>
          <div className="col-md-3 py-5 d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <div className="f_35 me-2">
                <FaShippingFast className="mt_n1" />
              </div>
              <div className="text-nowrap ">
                <div className="f_13 text_g">Free standard shipping</div>
                <div className="f_18 fw_600">on all orders over $99</div>
              </div>
              <div className="">
                <div className="border_img"></div>
              </div>
            </div>
          </div>

          <div className="col-md-3 py-5 d-flex justify-content-center">
            <div className="d-flex align-items-center">
              <div className="f_35 me-2">
                <TfiHeadphoneAlt className="mt_n1" />
              </div>
              <div className="text-nowrap">
                <div className="f_13 text_g">support@example.com</div>
                <div className="f_18 fw_600">012 - 345 - 6789</div>
              </div>
              <div className="">
                <div className="border_img"></div>
              </div>
            </div>
          </div>

          <div className="col-md-3 py-5 d-flex justify-content-center align-items-center">
             <Link to="/cart">
            <div className="d-flex align-items-center">
             <div className="f_35 me-2">
                <TbShoppingCartPause className="mt_n1 text-black" />
              </div>
              <div className="text-nowrap">
                <div className="f_13 text_g">Cart : 0 items</div>
                <div className="f_18 fw_600"></div>
              </div>
            </div>
             </Link>
          </div>
        </div>
      </div>


      <div className="container-fluid d-xl-block d-none d-lg-block">
        <div className="row mx-4 border-d"></div>
      </div>
    </>
  );
};

export default MiddleNav;
