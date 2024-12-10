import React, { useEffect ,useState} from 'react';
import axios from 'axios';



import AdminHeader from '../../components/Dashbord/Adminheader'
import AdminSidebar from '../../components/Dashbord/AdminSidebar'


const ContactDetails = () => {
    let [data,setData]=useState([]);
    useEffect(() => {
        const fetchData = async () => {
          try {
            const resData = await axios.get('http://localhost:4000/contactUsDetails');
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
            Contact Us Details
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
                    <th>Message</th>
              
                </tr>
            </thead>
            <tbody>
                        {
                            data.map((item) => ( 
                                <tr key={item.email}>
                                    <td className='align-middle text-center'>{item.email}</td>
                                    <td className='align-middle text-center'>{item.name}</td>
                                    <td>
                                 
  <textarea class="form-control" placeholder="" readOnly value={item.message} id="floatingTextarea"></textarea>

                                    </td>
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

export default ContactDetails