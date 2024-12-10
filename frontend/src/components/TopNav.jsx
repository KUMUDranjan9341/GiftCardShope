import React, { useContext } from 'react';
import "../styles/topNav.css";
import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import { CiLogout } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import { RiArrowDropDownLine } from "react-icons/ri";

const TopNav = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  const modalElement = document.getElementById("exampleModal");
  if (modalElement) {
    modalElement.classList.remove("show");
    modalElement.style.display = "none";
    const backdrop = document.querySelector(".modal-backdrop");
    if (backdrop) backdrop.remove();  // Remove backdrop
  }

  return (
    <>
      <div className="container-fluid py-3 top-nav d-xl-block d-none d-lg-block">
        <div className="container">
          <div className="row">
            <div className="col-12 d-flex flex-wrap justify-content-between">
              <div className="div text_g f_13 fw_600">
                <IoLocationSharp />
                <span className="ms-2">Dwarka Mor, New Delhi</span>
              </div>
              <div className="div f_13 fw_600 text_g d-flex">
                {!isLoggedIn ? (
                  <Link to="/login">
                    <span className="mx-3 text-dark">Sign In / Register</span>
                  </Link>
                ) : (
                  <div className="dropdown">
                    <span
                      className="mx-2 text-dark pointer"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <FaUser />
                      <RiArrowDropDownLine />
                    </span>

                    {/* dropdown */}
                    <ul className="dropdown-menu mt-3" aria-labelledby="dropdownMenuButton1">
                      <li><Link className="dropdown-item f_13" to="/myprofile">My Profile</Link></li>
                      <li><a className="dropdown-item f_13" data-bs-toggle="modal" data-bs-target="#exampleModal">Logout</a></li>
                    </ul>
                    {/* dropdown end */}
                  </div>
                )}

                <span className="mx-2">About Us</span>
                <span className="mx-2">FAQ</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for logout */}
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title f_13 fw-bold" id="exampleModalLabel">Logout <CiLogout /></h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body f_13 fw_600">
              Are you sure you want to log-out?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger f_13 fw_600" onClick={logout}>Log out</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TopNav;
