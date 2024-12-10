import React from "react";
import { Link } from "react-router-dom";
import "../styles/footer.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF} from '@fortawesome/free-brands-svg-icons'; 
import { faInstagram } from '@fortawesome/free-brands-svg-icons'; 
import { faYoutube } from '@fortawesome/free-brands-svg-icons'; 
import {faPinterest } from '@fortawesome/free-brands-svg-icons'; 

const Footer = () => {
  return (
    <>
      <div className="container_fluid bg_W r p-4 footer">
        <div className="row py-5 footer_d">
          <div className="col-md-3 col-sm-12">
           <div className="ms-md-3"> 
           <h5>Our Store</h5>
            <p>
              We promise we’ll get back to you promptly– your gifting needs are
              always on our minds!
            </p>
            <h6 className="mt-5">Monday – Friday 8am – 6pm pts.</h6>
           </div>
          </div>
          <div className="col-md-2">
            
            <div className="text-start information">
              {/* <ul> */}
              <h5 className="">Information</h5>
               <Link> <p>My account</p></Link>
                <Link><p>Track Orders</p></Link>
                <Link><p>Reminder Service</p></Link>
                <Link><p>Shipping & Returns</p></Link>
               <Link> <p>Sign Up</p></Link>
              {/* </ul> */}
            </div>
          </div>
          <div className="col-md-2">
            
            <div className="text-start services">
             
              {/* <ul> */}
              <h5 className="">Services</h5>
                <Link><p> Size Charts</p></Link>
                <Link><p>Contact Us</p></Link>
                <Link><p>How To Order</p></Link>
               <Link> <p>FAQ</p></Link>
                {/* <li></li> */}
              {/* </ul> */}
            </div>
          </div>
          <div className="col-md-3">
            <div>
            <h5>Newsletter Sign-Up</h5>
            <p className="text-gray">For News & Special Offers</p>
            <div className="news border p-3 w-100">
              <input type="text" placeholder="email@fhg@gamil.com" />
            </div>
            <Link className="link_style" to="">
              <div className="w-25 submit py-2">
                <p className="b_doted f_18">SUBMIT</p>
              </div>
            </Link>
            </div>
          </div>
        </div>
        <div className="row p-0 m-0">
          <div className="col-12">
            <div className="hr_line"></div>
          </div>
        </div>
        <div className="row py-3 mt-3">
          <div className="col-md-6">
            <p>
              Copyright© 2024 <b>FHG Solution</b>. <span>All Rights Reserved.</span>
            </p>
          </div>
          <div className="col-md-6">
            <div className="row  p-0 m-0 footer_logo">
              <div className="col-1 mx-1">
                <Link>
                <div className="logo face_book d-flex justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faFacebookF} size="1x" /> 
                </div>
                </Link>
              </div>
              <div className="col-1 mx-1">
                <Link>
                <div className="logo ista_gram d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faInstagram} size="1x" />
                </div>
                </Link>
              </div>
              <div className="col-1 mx-1">
                <Link>
                <div className="logo youtu_be d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faYoutube} size="1x" />
                </div>
                </Link>
              </div>
              <div className="col-1 mx-1">
                <Link>
                <div className="logo Pin d-flex justify-content-center align-items-center">
                <FontAwesomeIcon icon={faPinterest} size="1x" />
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
