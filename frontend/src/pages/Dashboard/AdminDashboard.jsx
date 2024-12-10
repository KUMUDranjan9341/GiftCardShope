import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiSearch } from "react-icons/ci";
import '../../styles/Dashboardcss/admin.css';



import AdminHeader from '../../components/Dashbord/Adminheader'
import AdminSidebar from '../../components/Dashbord/AdminSidebar'

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>

<AdminHeader/>

      <div className="container-fluid admin p-0 m-0">
        <div className="row p-0 m-0">
          

          {/* Sidebar */}
          <AdminSidebar/>
        {/*  */}
        {/* main  */}
        <div className="col-md-10 p-0 m-0">
          <div className="showbar">
<div className="row py-3  p-0 m-0">
  <div className="col-md-4 py-2">
    <div className=" d-flex justify-content-between  h_70 align-items-center rounded bg1">
      <div><p className='f_15 fw-bolder m-0 px-2'>Total Order</p></div>
      <div><p className='order_count f_15 fw-bolder m-0 px-2'>2000</p></div>
    </div>
  </div>
  <div className="col-md-4 py-2">
  <div className=" d-flex justify-content-between h_70 align-items-center rounded bg2">
      <div><p className='f_15 fw-bolder m-0 px-2'>Client</p></div>
      <div><p className='order_count f_15 fw-bolder m-0 px-2'>2000</p></div>
    </div>
  </div>
  <div className="col-md-4 py-2">
  <div className="d-flex justify-content-between h_70 align-items-center rounded bg3">
      <div><p className='f_15 fw-bolder m-0 px-2'>Followers</p></div>
      <div><p className='order_count f_15 fw-bolder m-0 px-2'>2000</p></div>
    </div>
  </div>
</div>

<div className="row py-3  p-0 m-0">

 <div className="col-12 ">
  <div className='bg-light rounded my-4 border_top shadow mb-4s'>
    <div className='table_head py-3'>
      <div className='row table_search d-flex justify-content-between p-0 m-0'>
        <div className="col-md-4">
          <p className='ps-2 f_15 fw-bolder '>Order Details....</p>
        </div>
        <div className="col-md-4">
        <form className="d-flex" role="search">
              <div className='d-flex align-items-center'><CiSearch className='fw-bold f_16' /></div>
              <input className="form-control mx-2 text_g border-0 f_13 fw-bold outline-0" type="search" placeholder="Search..." aria-label="Search"/>
            </form>
        </div>

     
      </div>
    </div>
 <div className='table-responsive'>
 <table className='w-100 p-3 table-bordered border-gray table table-striped text-center table-hover '>
    <thead className='border-bottom table-info py-2' >
      <tr className='py-2'>
      <th>Sl. No.</th>
      <th>Name</th>
      <th>City</th>
      <th>Status</th>
      <th>Action</th>
      </tr>

    </thead>
    <tbody className='f_15'>
      <tr>
        <td>1</td>
        <td>KUMUD</td>
        <td>New Delhi</td>
        <td > <span className='completed p-1'>COMPLETED</span> </td>
        <td> <button className='btn_details' >Details</button> </td>
      </tr>

      <tr>
        <td>2</td>
        <td>KUMUD</td>
        <td>New Delhi</td>
        <td > <span className='Pending p-1'>PENDING</span>  </td>
        <td> <button className='btn_details'>Details</button> </td>
      </tr>

      <tr>
        <td>3</td>
        <td>KUMUD</td>
        <td>New Delhi</td>
        <td > <span className='Progress p-1'>PROGRESS</span>  </td>
        <td> <button className='btn_details'>Details</button> </td>
      </tr>
    </tbody>
  </table>
 </div>
  </div>
 </div>
  
  </div>
  
          </div>
        </div>
      </div>
    </div>

    
    
    
    </>
  )
};


export default  AdminDashboard