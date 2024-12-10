import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Dashboardcss/categorymanage.css';
import { FaIdBadge } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { MdOutlineDeleteSweep } from "react-icons/md";


import AdminHeader from '../../components/Dashbord/Adminheader'
import AdminSidebar from '../../components/Dashbord/AdminSidebar'


const CategoryManage = () => {
  const modalRef = useRef(null);

    const [categoryData,setcategoryData]=useState([])
    const [refresh, setRefresh] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();


      const onSubmit = async (data) => {
        try {

        modalRef.current.click();

    
          let res = await axios.post('http://localhost:4000/manageCategory', data);
          if (res.status === 200 && res.data.success) {
            console.log("Category added successfully:", res.data);
            alert("Category added successfully!");
            setRefresh(prev => !prev);
            
          }
        } catch (error) {
          if (error.response && error.response.status === 400) {
            console.error("Error:", error.response.data.error);
            alert("Category already exists!");
          } else {
            console.error("An error occurred:", error.message);
            alert("Failed to add category. Please try again.");
          }
        }
      };
      

      useEffect(() => {
        const fetchData = async () => {
          try {
            const resData = await axios.get('http://localhost:4000/categoryData');
            console.log(resData.data);
            setcategoryData(resData.data)
          } catch (error) {
            console.error("Error fetching category data:", error);
          }
        };
      
        fetchData();
      }, [refresh]);


      const deleteCategory = async (categoryId) => {
        try {

          const res = await axios.delete(`http://localhost:4000/deleteCategory/${categoryId}`);
          if (res.status === 200) {
            console.log("Category deleted successfully:", res.data);
            setRefresh(prev => !prev);
            // setcategoryData(prevData => prevData.filter(item => item.categoryId !== categoryId));
          }
        } catch (error) {
          console.error("Error deleting category:", error);
        }
      };

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
            Manage Categories
            </span>
        <hr className='mt-2'/>
        </div>

    <div className="container  my-2">
        <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <div className="btn bg-danger text-light f_13 fw_600" data-bs-toggle="modal" data-bs-target="#exampleModal">Add +</div>
            </div>
        </div>
    </div>
    <div className="container d-flex justify-content-center">
        {/* <div className="table-responsive"> */}

        <table className="table table-bordered table-striped table-hover" id='categoryTable'>
            <thead>
                <tr>
                    <th>Category Id</th>
                    <th>Category Name</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                        {
                            categoryData.map((item) => ( 
                                <tr key={item.categoryId}>
                                    <td>{item.categoryId}</td>
                                    <td>{item.category}</td>
                                    <td><MdOutlineDeleteSweep className='f_20 text-danger pointer' 
                                     onClick={() => deleteCategory(item.categoryId)} 
                                    /></td>
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
   

    {/* </div> */}


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content rounded-0 border-0">
          <div className="modal-header">
            <h1 className="modal-title f_16 fw-bold text-center w-100" id="exampleModalLabel">Add Category</h1>
            <button type="button" ref={modalRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                  <div className="col-12">
                    <div className="mb-3">
                      <div className="input-group">
                        <span
                          className="input-group-text f_13 fw_600 text_g rounded-0 px-3"
                          id="basic-addon1"
                        >
                          <FaIdBadge />
                        </span>
                        <input
                          type='text'
                          className="form-control f_13 py-2 fw_600 rounded-0"
                          placeholder='Type category name here ...'
                          {...register("categoryName", {
                              required: "Category name is required",
                          })}
                        />
                      </div>
                      {errors.categoryName && (
                        <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                          {errors.categoryName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn bg-danger rounded-0 f_13 text-light fw_600 w-100">
                      Add Category
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CategoryManage;
