import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import review_photo from '../assets/images/profile_dummy.jpg'
import product_photo from '../assets/images/21.jpg'

import "../styles/product_preview.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ProductPreview = () => {

  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1); 
  const [productDetails,setProductDetails] = useState([]);

  const increaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1); 
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1); 
    }
  }

  const navigate=useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/productPreview/${productId}`);
        setProductDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchData();
  }, [productId]);




  const handleAddToCart = async () => {
    const token = localStorage.getItem('token'); // Get token from storage
    if (!token) {
      navigate('/login')
      return;
    }

    try {
      await axios.post(
        `http://localhost:4000/cartAdd`,
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } } 
      );
      alert("Product added to cart successfully!");
      navigate('/cart')
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };





  return (
    <>
    
      <div className="container-fluid p-3">
        <div className="row p-0 m-0 ">
          <div className="col-md-12">
            <p>
              <Link className='product_page' to="/">SHIANI</Link> &gt;
              <span><Link className='product_page' to="/Product">Products</Link></span> &gt; 
              <span>{productDetails.categoryName}</span>&gt; 
              <span><b>{productDetails.productName}</b></span>
            </p>
          </div>

          <div className="col-md-5 border border-danger">
            <div className='overflow-hidden text-center'>
              <img className='w-50 img_fluid img_scall' src={`http://localhost:4000/uploads/${productDetails.coverImage}`}alt="product_image" />
            </div>
            <div className='product_image'></div>
          </div>
          <div className="col-md-7">
            <div className="row">
              <h2 className='product_name'>{productDetails.productName}</h2>
              <p className=''><span className='product_price f_20'>₹ {productDetails.productPrice}</span> <del> ₹ 8000</del></p>
              <hr className='dotted-line' />
              <p><h4 className="card-title f_19" style={{color:'gold'}}>★★★★☆</h4> (customer review)</p>
              <hr className='dotted-line' />
              <p className='product_intro'>
                {productDetails.productDescription}
              </p>
              <hr className='dotted-line' />
            </div>

            <div className="row d-flex p-0 m-0">
              <div className="col-md-2"><p className='quantity mt-2'>Quantity:</p></div>
              <div className="col-md-3">
                <div className='q border_gray'>
                 <Link> <div onClick={decreaseQuantity} className={`div ${quantity === 1 ? 'text-secondary opacity-25' : 'text-dark'}`}><FontAwesomeIcon className='' icon={faMinus} /></div></Link>
                  <div className="div">{quantity}</div> 
                 <Link> <div onClick={increaseQuantity} className=" p-2"><FontAwesomeIcon className='text-black' icon={faPlus} /></div></Link>
                </div>
              </div>
              <div className="col-md-3">
                <button className='btn fw-bolder cart_button b_doted' onClick={handleAddToCart}>ADD TO CART</button>
              </div>
              
              
            </div>
            <hr className='dotted-line' />
            <div className="row p-0 m-0">
              <div className="col-md-3">
                <p><span>SKU:</span> <span className='sku text-secondary'>N/A-348</span></p>
              </div>
              <div className="col-md-6">
                <p><span>Categories:</span> <span className='categories text-secondary'>{productDetails.categoryName}</span> </p>
              </div>
              <div className="col-md-3">
                <p><span>Tag:</span> <span className='tag text-secondary'> Healthy, Skin</span></p>
              </div>
            </div>
            {/* <hr  className='dotted-line'/> */}
          </div>

        </div>
<hr />
        {/*  */}

        <div className="row d-flux justify-content-center">
          <div className="col-md-10">

          <ul class="nav nav-pills mb-3 d" id="pills-tab" role="tablist">
    <div className='p-2 '>
  <li class="nav-item preview" role="presentation">
    <Link class=" active t_black review_text f_16" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true"> DESCRIPTION
    </Link>
  </li>
    </div>
    <div className='p-2'>
  <li class="nav-item preview" role="presentation">
    <Link class="t_black review_text f_16" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false"> ADDITIONAL INFORMATION</Link>
  </li>
    </div>
   <div className='p-2'>
  <li class="nav-item preview" role="presentation">
   <Link class="t_black review_text f_16" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false"> REVIEWS</Link>
  </li>
   </div>
</ul>



          <hr  className='dotted-line'/>

    <div class="tab-content" id="pills-tabContent">
      {/* Description */}
  <div class="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
<p className='description text-secondary'>{productDetails.productDescription} </p>

  </div>
  {/* Additional information */}
  <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
  <table  class="table table-striped table-bordered border-gray">
  {/* <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
     
    </tr>
  </thead> */}
  <tbody>
    <tr className='tr_hright'>
      {/* <th scope="row">1</th>
      <td>Mark</td> */}
      <td className='f_16'><b>Stand Up</b></td>
      <td className='text-secondary'>35″L x 24″W x 37-45″H(front to back wheel)</td>
    </tr>
    <tr>
      {/* <th scope="row">2</th>
      <td>Jacob</td> */}
      <td className='f_16'><b>Folded (w/o wheels)</b></td>
      <td className='text-secondary'>@32.5″L x 18.5″W x 16.5″H</td>
    </tr>

    <tr>
      {/* <th scope="row">2</th>
      <td>Jacob</td> */}
      <td className='f_16'><b>Folded (w/ wheels)</b></td>
      <td className='text-secondary'>32.5″L x 24″W x 18.5″H</td>
    </tr>
   
  </tbody>
</table>


  </div>
  {/* Reviews */}
  <div class="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
<div className="row">
  <div className="col-md-12">
    <div className="row review_height">
      <div className="col-1">
        <div className='review_photo '>
          <img className='w-100 rounded-circle' src={review_photo} alt="review_photo" />
        </div>
      </div>
    <div className="col-11">
      <p className='review_content text-secondary '>
      The team @gift-ribbon were prompt in responding, flexible with the size I was after, shipped the artwork immediately – but most importantly we loved the piece.
      </p>
      <div>
        <p className=''>
         <span className='review_name px-2'> <b>Chung Pham</b></span> 
         <span className='review_date'>.May 10, 2021</span>
          </p>
      </div>
    </div>
    <hr className='dotted-line mt-2' />  
    </div>

    <div className="row review_height">
      <div className="col-1">
        <div className='review_photo '>
          <img className='w-100 rounded-circle' src={review_photo} alt="review_photo" />
        </div>
      </div>
    <div className="col-11">
      <p className='review_content text-secondary '>
      The team @gift-ribbon were prompt in responding, flexible with the size I was after, shipped the artwork immediately – but most importantly we loved the piece.
      </p>
      <div>
        <p className=''>
         <span className='review_name px-2'> <b>Chung Pham</b></span> 
         <span className='review_date'>.May 10, 2021</span>
          </p>
      </div>
    </div>
    <hr className='dotted-line mt-2' />  
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
}

export default ProductPreview;
