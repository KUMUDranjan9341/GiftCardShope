import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Dashboardcss/admin.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faAddressBook, faUserPlus, faList, faImage, faUpload, faBars } from '@fortawesome/free-solid-svg-icons';

const AdminSidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
     <div className=" d-flex ">
               {/* Toggle button for sidebar */}
               <button className="btn  d-md-none bae1a1ab3 tog_button" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
              </button>
             </div>


       <div className={`col-md-2 p-0 m-0 sidebar back_c ${sidebarOpen ? 'show' : ''}`}>
            <div className="sideBar">
              <div className='d-flex justify-content-center'>
                <ul className='p-0'>
                  <p className='f-10 fw-semibold text-secondary'>Dashboard</p>
                  <Link to="/dashboard"><li className='width_100px my-2 f_15 fw-normal ps-3'><span><FontAwesomeIcon icon={faHouse} /></span> Home </li></Link>
                  <p className='f-10 fw-semibold text-secondary'>Components</p>
                  <Link><li className='width_100px my-2 ps-3'><span><FontAwesomeIcon icon={faImage} /></span> Banner</li></Link>
                  <p className='f-10 fw-semibold text-secondary'>Pages</p>
                  <Link to="/manageproduct"><li className='width_100px my-2 ps-3'><span><FontAwesomeIcon icon={faUpload} /></span> Products</li></Link>
                  <Link to='/managecategory'><li className='width_100px my-2 ps-3'> <span><FontAwesomeIcon icon={faList} /></span> Category</li></Link>
                  <Link to='/contactdetails'> <li className='width_100px my-2 ps-3'><span><FontAwesomeIcon icon={faAddressBook} /></span> Contact</li></Link>
                  <Link to='/registrationdetails'><li className='width_100px my-2 ps-3'><span><FontAwesomeIcon icon={faUserPlus} /></span> SignUp</li></Link>
                </ul>
              </div>
            </div>
          </div>

    
    
    
    </>
  )
};


export default  AdminSidebar