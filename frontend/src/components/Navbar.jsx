import React,{useContext} from 'react';
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import "../styles/header.css";
import Product from "../pages/Product"; 
import Home from "../pages/Home";
import Conatct from "../pages/Contact";   
import { AuthContext } from '../context/AuthContext';


const Navbar = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <nav className="navbar navbar-expand-lg mx-4">
        <div className="container-fluid">
          <Link className="navbar-brand" href="#"></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item position-relative f_16 mx-3 fw_600">
                
                <Link className="nav-link px-4 bg_p text_p active" aria-current="page" to="/">Home</Link>
                <div className='bx1'></div>
                <div className='bx2'></div>
                <div className='bx3'></div>
                <div className='bx4'></div>
              </li>
              {/* <li className="nav-item dropdown mx-3 position-relative">
                <Link className="nav-link px-4 fw_600 dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="">
                Shop
                </Link>
                <div className='bx1'></div>
                <div className='bx2'></div>
                <div className='bx3'></div>
                <div className='bx4'></div>
                <ul className="mega-menu">
                  <li>
                    <div className="row p-4">
                      <div className="col-lg-4">
                        <h6 className="">Category 1</h6>
                        <ul className="list-unstyled">
                          <li><Link className="dropdown-item" to="/product">Products</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 2</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 3</Link></li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <h6 className="dropdown-header">Category 2</h6>
                        <ul className="list-unstyled">
                          <li><Link className="dropdown-item" href="#">Action 4</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 5</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 6</Link></li>
                        </ul>
                      </div>
                      <div className="col-lg-4">
                        <h6 className="dropdown-header">Category 3</h6>
                        <ul className="list-unstyled">
                          <li><Link className="dropdown-item" href="#">Action 7</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 8</Link></li>
                          <li><Link className="dropdown-item" href="#">Action 9</Link></li>
                        </ul>
                      </div>
                    </div>
                  </li>
                </ul>
              </li> */}
              <li className="nav-item mx-3 position-relative">
                
                <Link className="nav-link px-4 fw_600 " aria-disabled="true"to="/Contact">Contact</Link>
                <div className='bx1'></div>
                <div className='bx2'></div>
                <div className='bx3'></div>
                <div className='bx4'></div>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <div className='d-flex align-items-center'><CiSearch className='fw-bold f_16' /></div>
              <input className="form-control mx-2 text_g border-0 f_13 fw-bold outline-0" type="search" placeholder="Search..." aria-label="Search"/>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
