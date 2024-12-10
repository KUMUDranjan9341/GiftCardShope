import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import "../styles/product.css";
import axios from 'axios';
import ProductCard from "../components/ProductCard";


const Product = () => {
  // State to track the range slider value
  const [price, setPrice] = useState(200);

  const [oneCategory,setcategoryData]=useState([])
  const [moreCategory,setmoreCategoryData]=useState([])
  const [products, setProducts] = useState([]);


  // Function to handle range slider change
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const param=useParams()

  useEffect(() => {
    const fetchCategory = async () => {
      if (!param.categoryId) {
        console.error("categoryId is undefined");
        return;
      }
  
      try {
        const res = await axios.get(`http://localhost:4000/fetchCategory/${param.categoryId}`);
        console.log(res.data);
        setcategoryData(res.data.requestedCategory.category)
        setmoreCategoryData(res.data.otherCategories)
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };
  
    fetchCategory();
  }, [param.categoryId]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/fetchProductByCategory/${param.categoryId}`);
        console.log(response.data);
        
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  },[param.categoryId]);


  return (
    <>
      {/* Header */}
      <div className="container-fluid product p-3">
        <div className="row p-0 m-0">
          <div className="col-md-12">
            <p>Shiani Creations &gt; <span className='text-danger'><b>{oneCategory}</b></span> </p>
          </div>

          {/* Product Categories */}
          <div className="col-md-3">
            <div>
              <h3 className='mt-2'>Product categories</h3>
              <hr />
              <ul className='p-0 m-0'>
  {moreCategory.map((item, index) => (
    <Link key={item._id} to={`/product/${item.categoryId}`}>
      <li>{item.category}</li>
      <hr className="dotted-line" />
    </Link>
  ))}
</ul>


              {/* Filter by Price */}
              <div>
                <h3>Filter by Price</h3>
                <div>
                  {/* Range slider */}
                  <div className="range-slider grad range_">
                    <input  className='w-100'
                      type="range" 
                      min="0" 
                      max="10000" 
                      step="50" 
                      value={price} 
                      onChange={handlePriceChange} // Call handler on change
                    />
                    {/* <output>{price}</output>  */}
                    <div className='range-slider__progress w-100'></div>
                    <p>Price: <span>₹ 100 - ₹ {price}</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="col-md-9">
            <div className="row select">
              <div className="col-4">
                <p>Showing all 9 results</p>
              </div>
              <div className="col-4">
                <select className="form_select" aria-label="Default select example">
                  <option selected>Default Sorting</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </select>
              </div>
            </div>
            <hr />



            <div className="container">
        <div className="row">
          {/* <div className="col-md-3"> */}
          {products.map((product) => (
            <Link to={`/productpreview/${product.productId}`}>
                          <div className="" key={product.productId}>
              <ProductCard 
                name={product.productName} 
                price={`₹${product.productPrice}`} 
                img={product.coverImage} 
              />
            </div>
            </Link>

          ))}
          {/* </div> */}
        </div>
      </div>





          </div>
        </div>
      </div>

      {/* Footer */}
    </>
  );
};

export default Product;
