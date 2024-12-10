import React, { useEffect ,useState} from 'react';
import axios from 'axios';


import AdminHeader from '../../components/Dashbord/Adminheader'
import AdminSidebar from '../../components/Dashbord/AdminSidebar'

const RegistrationDetails = () => {


    let [data,setData]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const resData = await axios.get('http://localhost:4000/registrationDetails');
            console.log(resData.data);
            setData(resData.data)
          } catch (error) {
            console.error("Error fetching category data:", error);
          }
        };
      
        fetchData();
      }, []);






  return (
    <>

<AdminHeader/>

<div className="container-fluid">
  <div className="row">
  <AdminSidebar/>
  <div className="col-md-10">
  <div className="container my-4 border_top shadow mb-4 rounded-top">
        <div className="row py-2">
            <span className='f_16 fw_600 text-center'>
            Account Details
            </span>
        <hr className='mt-2'/>
        </div>
    <div className="container  d-flex justify-content-center">
               {/* <div className="table-responsive"> */}

               <table className="table table-bordered table-striped table-hover" id='categoryTable'>
            <thead>
                <tr>
                    <th>Email</th>
                    <th>Name</th>
                    <th>Number</th>
                    <th>Role</th>
                </tr>
            </thead>
            <tbody>
                        {
                            data.map((item) => ( 
                                <tr key={item.email}>
                                    <td>{item.email}</td>
                                    <td>{item.name}</td>
                                    <td>{item.number}</td>
                                    <td>{item.role || 'N/A'} </td>
                                </tr>
                            ))
                        }
                    </tbody>
        </table>
        </div>

    </div>
  </div>
  </div>
</div>

    </>
  )
}

export default RegistrationDetails