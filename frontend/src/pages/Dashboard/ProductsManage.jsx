import React, { useEffect, useState, useRef } from 'react';
import '../../styles/Dashboardcss/categorymanage.css';
import { FaIdBadge } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import axios from 'axios';
import { RxCross1 } from "react-icons/rx";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaPencilAlt } from "react-icons/fa";
import { BiSolidCategory } from "react-icons/bi";
import { FaImages } from "react-icons/fa"
import { AiFillProduct } from "react-icons/ai";
import '@splidejs/splide/dist/css/splide.min.css';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { MdOutlineDeleteSweep } from "react-icons/md";



import AdminHeader from '../../components/Dashbord/Adminheader'
import AdminSidebar from '../../components/Dashbord/AdminSidebar'

const ProductsManage = () => {

    const modalRef = useRef(null);



    const [categoryData, setCategoryData] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [products, setProducts]=useState([]);

    const fileInputRef = useRef(null); // Create a ref for the file input

    const { register, handleSubmit, formState: { errors }, setValue, clearErrors } = useForm();



    useEffect(() => {
        const fetchData = async () => {
            try {
                const resData = await axios.get('http://localhost:4000/categoryData');
                setCategoryData(resData.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
        fetchData();
    }, []);


    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                alert("File size must be less than 10 MB.");
                return;
            }
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage({ file, imageUrl });
            setValue('coverImage', file);
            clearErrors('coverImage');
        }
    };

    const removeImage = (e) => {
        e.stopPropagation();
        setSelectedImage(null);
        setValue('coverImage', null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };


    // add product image


    const selectProductImage = (e) => {
        const files = Array.from(e.target.files);
        const updatedImages = files.map((file) => ({
            file,
            imageUrl: URL.createObjectURL(file)
        }));
        setSelectedImages(updatedImages);
    };
    

    const removeImageS = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };




    const onSubmit = async (data) => {
        console.log(data);
        modalRef.current.click();
    
        const formData = new FormData();
        formData.append("productName", data.productName);
        formData.append("productType", data.productType);
        formData.append("productPrice", data.productPrice);
        formData.append("categoryDetails", data.categoryId);
        formData.append("productDescription", data.productDescription);
    
        if (selectedImage && selectedImage.file) {
            formData.append("coverImage", selectedImage.file);
        }
    
        selectedImages.forEach((image, index) => {
            formData.append(`productImages`, image.file);
        });
    
        try {
            const response = await axios.post("http://localhost:4000/addProduct", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            setRefresh((prev) => !prev);
            console.log("Product added successfully:", response.data);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    


    useEffect(()=>{
        const fetchProducts = async () => {
            try {
                const resPData = await axios.get('http://localhost:4000/productData');
                console.log(resPData,'resPData')
                setProducts(resPData.data);
            } catch (error) {
                console.error("Error fetching category data:", error);
            }
        };
        fetchProducts();

    },[refresh])



    const handleDelete = async (productId) => {
    try {
        const response = await axios.delete(`http://localhost:4000/productData/${productId}`);
        console.log(response.data.message);
        
        setProducts(products.filter(product => product.productId !== productId));
    } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete product.");
    }
};






    return (
        <>
            <AdminHeader />


            <div className="container-fluid">
                <div className="row">
                    <AdminSidebar />
                    <div className="col-md-10">
                        <div className="container my-4 border_top shadow mb-4 rounded-top">
                            <div className="row py-2">

                                <span className='f_16 fw_600 text-center'>Manage Products</span>
                                <hr className='mt-2' />
                            </div>

                            <div className="container my-2">
                                <div className="row">
                                    <div className="col-12 d-flex justify-content-end">
                                        <div className="btn bg-danger text-light f_13 fw_600" data-bs-toggle="modal" data-bs-target="#exampleModal">Add +</div>
                                    </div>
                                </div>
                            </div>
                            <div className="container d-flex justify-content-center table-responsive">
                                <table className="table table-bordered table-striped table-hover" id='categoryTable'>
                                    <thead>
                                        <tr>
                                            <th>Product Id</th>
                                            <th>Product Cover</th>
                                            <th>Product Name</th>
                                            <th>Product Category</th>
                                            <th>Product Type</th>
                                            <th>Product Description</th>
                                            <th>Product Price</th>
                                            <th>Product Images</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
<tbody>
    {
        products.map((item, index) => (
            <tr key={index} className='align-middle'>
                <td>{item.productId}</td>
                <td>
    <img 
        src={`http://localhost:4000/uploads/${item.coverImage}`}
        alt={item.productName} 
        style={{ width: '50px', height: '50px' }} 
    />
</td>

                <td>{item.productName}</td>
                <td>{item.categoryName}</td>
                <td>{item.productType}</td>
                <td>{item.productDescription}</td>
                <td>{item.productPrice}</td>
                <td className=''>
                {item.productImages && item.productImages.length > 0 ? (
                    
                
                                                                                                                       
   <Splide options={{
        type       : 'slide',
        perPage    : 1, // Only one image per slide
        perMove    : 1,
        pagination : true, // Enable pagination if you want to show indicators
        arrows     : true,
        autoplay   : false, // Set to true if you want it to auto slide
        breakpoints : {
            640: {
                perPage: 1,
            },
            1024: {
                perPage: 1,
            },
        },
    }}>
        {  item.productImages.map((image, index) => (
            <SplideSlide key={index}>
                <div className="card" style={{ width: '100%', height: '400px', overflow: 'hidden' }}>
                    <img
                        src={`http://localhost:4000/uploads/${image}`}
                        className="card-img-top"
                        alt={`${item.productName} - ${index + 1}`}
                        style={{ objectFit: 'contain', width: '100%', height: '200px' }} // Fixed height of 50px
                    />
                </div>
            </SplideSlide>
        ))}
    </Splide>
                 ) : ''

}
</td>




               

                <td><MdOutlineDeleteSweep className='f_20 text-danger pointer' 
                                     onClick={() => handleDelete(item.productId)} 
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

{/* Add Product */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content rounded-0 border-0">
                        <div className="modal-header">
                            <h1 className="modal-title f_16 fw-bold text-center w-100" id="exampleModalLabel">Add Product</h1>
                            <button type="button" ref={modalRef} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="row">
                                        <div className="col-12">
                                            <div className="mb-3">
                                                <div>

                                                    <div className="input-group py-2 d-flex justify-content-center">
                                                        <div
                                                            className="image-preview"
                                                            onClick={() => fileInputRef.current.click()}
                                                        >
                                                            {selectedImage ? (
                                                                <>
                                                                    <img src={selectedImage.imageUrl} alt="Selected" className="img-fluid" />
                                                                    <span className="remove-image" onClick={removeImage}>
                                                                        <RxCross1 />
                                                                    </span>
                                                                </>
                                                            ) : (
                                                                <div className="image-overlay">
                                                                    <span className='f_14'>Select Cover image</span>
                                                                </div>
                                                            )}

                                                        </div>

                                                        <input
                                                            id="file-upload"
                                                            type='file'
                                                            className="form-control visually-hidden"
                                                            onChange={(e) => {
                                                                handleImageChange(e);
                                                            }}
                                                            ref={(e) => {
                                                                register('coverImage', { required: "Cover Image is required" });
                                                                fileInputRef.current = e;
                                                            }}
                                                            accept="image/*" // Optional: Limit file types
                                                        />

                                                        {/* <label  htmlFor="file-upload" className="file-upload-label f_13 fw_600 text_g rounded-0 px-3">
                                                            {selectedImage ? selectedImage.file.name : ""}
                                                        </label> */}
                                                    </div>
                                                    {errors.coverImage && (
                                                        <p className="text-danger text-center f_13 fw_600 pt-1 ps-1 m-0">Cover Image is required !</p>
                                                    )}

                                                </div>




                                                <div>
                                                    <div className="input-group py-2">
                                                        <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                                                            <FaIdBadge />
                                                        </span>
                                                        <input
                                                            type='text'
                                                            className="form-control f_13 py-2 fw_600 rounded-0"
                                                            placeholder='Product Name .....'
                                                            {...register('productName', { required: "Product name is required" })}
                                                        />

                                                    </div>
                                                    {errors.productName && <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.productName.message}</p>}

                                                </div>


                                                <div className='d-flex justify-content-center'>
                                                    <div>

                                                        <div className="input-group py-2 pe-1">
                                                            <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                                                                <AiFillProduct />
                                                            </span>
                                                            <input
                                                                type='text'
                                                                className="form-control f_13 py-2 fw_600 rounded-0"
                                                                placeholder='Product Type'
                                                                {...register('productType', { required: "Product type is required" })}
                                                            />

                                                        </div>
                                                        {errors.productType && <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.productType.message}</p>}
                                                    </div>


                                                    <div>

                                                        <div className="input-group py-2 ps-1">
                                                            <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                                                                <MdOutlineCurrencyRupee />
                                                            </span>
                                                            <input
                                                                type='text'
                                                                className="form-control f_13 py-2 fw_600 rounded-0"
                                                                placeholder='Product Price'
                                                                {...register('productPrice', { required: "Product price is required" })}
                                                            />
                                                        </div>
                                                        {errors.productPrice && <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.productPrice.message}</p>}
                                                    </div>
                                                </div>

                                                <div className="input-group py-2">
                                                    <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                                                        <BiSolidCategory />
                                                    </span>
                                                    <select className="form-select f_13 fw_600 text_g rounded-0" {...register('categoryId', { required: "Please select a category" })}>
                                                        <option value="" disabled selected>Select a category</option>
                                                        {categoryData.map(category => (
                                                            <option key={category.categoryId} value={`${category.categoryId}-${category.category}`}>
                                                                {category.category}
                                                            </option>


                                                        ))}
                                                    </select>
                                                </div>
                                                {errors.categoryId && (
                                                    <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">
                                                        {errors.categoryId.message}
                                                    </p>
                                                )}


                                                <div>

                                                    <div className="input-group py-2">
                                                        <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
                                                            <FaPencilAlt />
                                                        </span>
                                                        <textarea
                                                            className="form-control f_13 py-2 fw_600 rounded-0"
                                                            placeholder='Product Description .....'
                                                            {...register('productDescription', { required: "Product description is required" })}
                                                        />
                                                    </div>
                                                    {
                                                        errors.productDescription && <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.productDescription.message}</p>
                                                    }
                                                </div>

                                                <div className="input-group py-2">
    <span className="input-group-text f_13 fw_600 text_g rounded-0 px-3" id="basic-addon1">
        <FaImages />
    </span>
    <input
        id="file-upload"
        type='file'
        className="form-control f_13 py-2 fw_600 rounded-0"
        {...register('productImages', {
            required: "Please select at least one image",
            onChange: selectProductImage 
        })}
        accept="image/*"
        multiple // Allow multiple file selection
    />
</div>
{errors.productImages && (
    <p className="text-danger f_13 fw_600 pt-1 ps-1 m-0">{errors.productImages.message}</p>
)}


                                                {/* Render selected images */}
                                                <div className="image-preview-container d-flex flex-wrap justify-content-center">
    {selectedImages.map((image, index) => (
        <div key={index} className="image-preview-box position-relative m-1">
            <img src={image.imageUrl} alt={`Selected ${index}`} className="img-fluid" />
            <span className="remove-image position-absolute" onClick={() => removeImageS(index)}>
                <RxCross1 />
            </span>
        </div>
    ))}
</div>






                                            </div>
                                        </div>
                                        <div className="col-12">
                                            <button type="submit" className="btn bg-danger rounded-0 f_13 text-light fw_600 w-100">
                                                Add Product
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
    );
};

export default ProductsManage;
