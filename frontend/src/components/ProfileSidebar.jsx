import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import '../styles/myprofile.css';

import myProfile from '../components/ProfileSidebar.jsx'


const ProfileSidebar = () => {
  

  return (
    <>
     
<div className="container">
    <div className="row">
        <div>
            <Link> <p className='text-black f_14'>Overview</p>
            </Link>
           
        </div>
        <hr />

        <div>
            <p className='f_10 text-secondary'>ORDERS</p>
           <Link to="/myorder">
           <p className='text-black f_14'>Orders & Returns</p></Link>
        </div>
        <hr />

        <div>
            <p className='f_10 text-secondary'>ACCOUNT</p>
           <Link to="/myprofile"> <p className='text-black f_14'>Profile</p></Link>
            <Link to="/myaddress"><p className='text-black f_14'>Addresses</p> </Link> 
        </div>
        <hr />

    </div>
</div>
     
    </>
  );
};

export default ProfileSidebar;


