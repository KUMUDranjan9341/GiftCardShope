import React from 'react';
import '../styles/productCard.css';
import { BiBasket } from "react-icons/bi";
import { MdOutlineZoomIn } from "react-icons/md";
import { FaHeart } from "react-icons/fa";
import {Link} from 'react-router-dom';

const ProductCard = (props) => {
  return (
    <div className="card border-0 position-relative" style={{ width: '17rem', display: 'flex', flexDirection: 'column' }}>
  <div className="card-img-container" style={{ flex: '1' }}>
    <img 
      src={`http://localhost:4000/uploads/${props.img}`}   
      className="card-img-top " 
      alt={props.name} 
      style={{ 
        objectFit: 'contain', 
        height: '200px', 
        width: '100%', 
        borderRadius: '0.25rem' 
      }} 
    />
  </div>
  
  <div className="card-body text-center" style={{ marginTop: 'auto' }}>
    <p className="card-text f_14 fw_600">Price: {props.price}</p>
    <h4 className="card-title f_16">{props.name}</h4>
    <h4 className="card-title f_19" style={{color:'gold'}}>★★★★☆</h4>
  </div>

  <div className="hover-card shadow rounded-pill w-75 f_20 text_g">
    <div className='pb-1'>
      <Link className='text_g' to='/'>
        <BiBasket />
      </Link>
    </div>
    <div className='pb-1'>
      <Link className='text_g' to='/'>
        <MdOutlineZoomIn />
      </Link>
    </div>
    <div className='pb-1'>
      <Link className='text_g' to='/'>
        <FaHeart />
      </Link>
    </div>
  </div>
</div>

  );
}

export default ProductCard;
