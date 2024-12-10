import React, { useEffect } from 'react';
import { preLoaderAnim } from "../animations";
import '../styles/preloader.css';



const Preloader = () => {
    useEffect(()=>{
        preLoaderAnim()
        },[])
  return (
    <div className='preloader'>
        <div className="texts-container">
            <span>Anitoonz,</span>
            <span>We</span>
            <span>Shape</span>
            <span>Your</span>
            <span>Thoughts</span>
        </div>
    </div>
  )
}

export default Preloader