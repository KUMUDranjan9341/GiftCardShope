import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from "../components/ProductCard";
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        console.log(response.data);
        
        setProducts(response.data); 
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="container-fluid product_back py-3">
      <div className="row">
        {products.map((product) => (
          <div className="col-md-3 d-flex justify-content-center my-2" key={product.productId}>
            <Link className='border border' to={`/productpreview/${product.productId}`}>
              <ProductCard 
                name={product.productName} 
                price={`₹${product.productPrice}`} 
                img={product.coverImage} 
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Products;
