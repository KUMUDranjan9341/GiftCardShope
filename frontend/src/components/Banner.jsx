import React, { useEffect,useState } from "react";
import img1 from "../assets/images/h1-slider2.jpg";
import img from '../assets/images/img1.png';
import '../styles/banner.css';
import img3 from '../assets/images/img3.png';
import '../styles/mediaQueries.css';
import { TfiGift } from "react-icons/tfi";
import { HiGiftTop } from "react-icons/hi2";
import d from '../assets/images/d.avif';
import d2 from '../assets/images/d2.jpg'
import { Link } from "react-router-dom";
import axios from 'axios'
const Banner = () => {


  const [categoryData,setcategoryData]=useState([])
  

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
  }, []);


  return (
    <>
      <div className="container-fluid banner  p-3 my-3">
        <div className="row mx-md-5">
          <div className="col-md-3 order-2 mt-5 mt-md-0 order-md-1">
            <div className="div bg_p py-4 px-4 text_p rounded-2 f_16 fw_600 ">
          

              {
                            categoryData.map((item) => ( 
                          
                              <Link to={`/product/${item.categoryId}`}>
                                <div className="div-li py-3">{item.category}</div>
                              </Link>
                           
                            ))
                        }



             
            </div>
          </div>
          <div className="col-md-9 order-1 order-md-2">
            <div className="container-fluid p-0 rounded-2">
              <div
                id="carouselExampleIndicators"
                class="carousel slide rounded-2"
              >
                <div class="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="0"
                    class="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div class="carousel-inner rounded-3">
                  <div class="carousel-item active rounded-3">
                    <div className="container-fluid position-relative h-fx  w-100  b1 rounded-3">
          
                    <img src={img} alt="img" className="mt-5 img-fluid img-animation"></img>


<div className="overlay text-center my-2">
  <h6 className="my-2">&#215; New Arrivals &#215;</h6>
  <h1 className="fw-bold my-2">Send Your Love</h1>
  <h6 className="my-2">From </h6>
<Link to='#productsSection'>
  <button className="btn rounded-pill f_16 my-2 py-3 px-5 fw_600 bg-light gft-btn" >Send Gift</button>
</Link>
</div>
                    
                    </div>
                  </div>
                  <div class="carousel-item  rounded-3">
                    <div className="container-fluid h-fx">

                  <img src={img1} class="d-block w-100 h-100 rounded-3 img-slide-animation" alt="..." />
                  <div className="overlap d-flex justify-content-center align-items-center">
  <div className="typography-animation">
    <h1 className="fw-bold">Unique Gifts</h1>
    <h5>FOR EVERY OCCASION</h5>
  </div>
</div>


</div>

                  </div>
                  <div class="carousel-item rounded-3">
                    <div className="container-fluid w-100 h-fx b1 rounded-3">
                    <img src={img3} alt="img" className="mt-5 img-fluid img-animation"></img>

                    <div className="overlay text-center my-2">
  <h6 className="my-4">&#215; Stationary &#215;</h6>
  <h1 className="fw-bold my-2">Sale 50% Off</h1>
  <h6 className="my-2">OFFICE & STATIONARY </h6>

</div>
       
                    </div>
                  </div>
                </div>
                <button
                  class="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    class="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Previous</span>
                </button>
                <button
                  class="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    class="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span class="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="row mx-md-5 my-3">
        <div className="col-md-3 order-2 mt-5 mt-md-0 order-md-1">
          <div className="container-fluid mtl-30 bg-light rounded-2 shadow">
            <div className="row">
<div className="col-12 ">
  <div className="graph1 py-5">
  <TfiGift className="f_35 tbh" />
  </div>
  <div className="f_18 text-center fw_600">Delivering Quality Gifts</div>
  <div className="f_14 text-center text_g">info on its origin</div>

  <div className="div border-b mx-3 my-3"></div>
</div>
            </div>


            <div className="row">
<div className="col-12 ">
  <div className="graph2 py-5">
  <HiGiftTop  className="f_35 tbh" />
  </div>
  <div className="f_18 text-center fw_600">Gifts for all occasions
  </div>
  <div className="f_14 text-center text_g">Variants and technical</div>

  <div className="div border-b mx-3 my-3"></div>
</div>
            </div>
          </div>
        </div>


        <div className="col-md-9 order-1 order-md-2">
          <div className="container-fluid my-5">
            <div className="row">
              <div className="col-md-8">
                <div className="container-fluid overflow-hidden position-relative rounded-3 zoom-div height_350">
                <img src={d} alt="r" className="rounded-3 "></img>
                <div className="ovl">

                <h6 className="">Clearance Sale</h6>
                <h2 className="fw_600">Women's Day</h2>

                <div className="sliding-btn pointer mt-5 f_13 fw_600">
                  
                  SHOP NOW
                  <div className="dashed mx-5 mt-2"></div>
                </div>
                </div>
                </div>
              </div>
              <div className="col-md-4">
              <div className="container-fluid overflow-hidden rounded-3 zoom-div position-relative height_350">
                <img src={d2} alt="r" className="rounded-3"></img>

                <div className="holiday-offer bg-light">

<h6 className="">Holiday Offers</h6>
<h2 className="fw_600">Sale 50% Off</h2>


</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
