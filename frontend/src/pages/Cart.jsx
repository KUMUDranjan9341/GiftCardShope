import React, { useState,useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import card_image from "../assets/images/21.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faXmark } from "@fortawesome/free-solid-svg-icons";
const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  
  const [showLess, setShowLess] = useState(false);
  const [refresh, setRefresh] = useState(false);


  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/cart', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`, 
          },
        });
  
  
          setCartItems(response.data);
          console.log(response.data);
           
      
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
  
    fetchCartData();
  }, [refresh]);


  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/cart/remove/${itemId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      if (response.status === 200) {
        setRefresh(!refresh);
        alert('Item removed from cart');
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert('Failed to remove item');
    }
  };


  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      console.log("Updating quantity:", { itemId, newQuantity });
  
      // Update UI immediately
      const updatedItems = cartItems.items.map(item =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems({ items: updatedItems });
  
      // Send update request to backend
      const response = await axios.put(
        `http://localhost:4000/api/cart/update/${itemId}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
  
      if (response.status === 200) {
        console.log("Quantity updated successfully:", response.data);
        setRefresh(!refresh); // Refetch updated cart
      } else {
        throw new Error("Backend update failed");
      }
    } catch (error) {
      console.error("Error updating quantity:", error.response?.data || error.message);
      alert("Failed to update quantity");
    }
  };
  

  



  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState(""); 
  const [error, setError] = useState(""); 

  const handlePincodeChange = (event) => {
    setPincode(event.target.value);
  };

 
  const checkPincode = async () => {
    if (!/^\d{6}$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      setLocation("");
      return;
    }
  
    setError("");
    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
  
      const data = await response.json();
      console.log("API Response:", data);
  
      // Handle possible empty or error response
      if (data && data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
        const { Name, District, State } = data[0].PostOffice[0];
        
        // Format location with city, district, and state
        let locationString = `${Name}, ${District}, ${State}`;
        
        // Set the location state
        setLocation(locationString);
      } else {
        setLocation("");
        setError("Pincode not found.");
      }
    } catch (err) {
      console.error("Error in Fetch:", err);
      setLocation("");
      setError("Error fetching location data. Please try again.");
    }
  };
  
  
  
  
  
  


  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 text-center ">
            <p className="fs_13">
              {" "}
              <span className="fw-bolder  text-success">
                <u>BAG</u>{" "}
              </span>
              <span>--------</span>
              <span className=" fw-bolder ">ADDRESS</span>
              <span>--------</span> <span className="fw-bolder ">PAYMENT</span>{" "}
            </p>
            <hr className="dotted-line" />
          </div>
        </div>

        <div className="row d-flex justify-content-center p-0">
          {/* left side */}
          <div className="col-md-5  p-2 ">
            {/* service start */}
            <div className="border border-gray rounded p-2 bg-light bg-gradient">
              <div className="row p-0 m-0">
                <div className="col-12 ">
                  <div className="row q ">
                    <div className="col-md-6">
                      <p className="fw-bolder f_14 mt-2">
                        Check delivery time & service
                      </p>
                        {/* Display Area Name or Error */}
                  {location && (
                    <p className="text-success m-0 p-0 f_13"> {location}</p>
                  )}
                  {error && <p className="text-danger mt-2 f_12">{error}</p>}
                    </div>
                    <div className="col-md-6">
               <div className="border  rounded bg_ece8e3">
                      <input
                          className="p-1 border-0 bg_ece8e3 w_80 px-2 f_14"
                          type="number"
                          placeholder="Pincode"
                          min="100000"
                          max="999999"
                          step="1"
                          value={pincode}
                          onChange={handlePincodeChange}
                        />
                        <span
                          className="text-danger pointer_text f_12 fw-medium"
                          onClick={checkPincode}
                        >
                          CHECK
                        </span>

                        {/* <button className='border-0'>check</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* service end */}

            {/* offer start */}

            <div className="border border-gray rounded p-2 bg-light bg-gradient mt-2">
              <div className="row p-0 m-0">
                <div className="col-12 ">
                  <p className="fw-bolder f_14 mt-2">Available offers</p>
                </div>
                <div className="col-12">
                  <p className="f_12">
                    .10% Discount on kotak mank credit and debit card on a
                    minimum spend of 2500
                  </p>

                  {/* accord */}
                  <div className="accordion" id="accordionExample">
                    <div className="accordion-item bg-light border-0">
                      {!showLess && (
                        <p
                          id="headingTwo"
                          className="fw-bolder text-danger pointer_text"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          onClick={() => {
                            setShowLess(!showLess);
                          }}
                        >
                          {" "}
                          Show more
                        </p>
                      )}

                      {/* <h2 className="accordion-header" id="headingTwo">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
     <p className='fw-bolder text-danger'>  Show more</p>
      </button>
    </h2> */}
                      <div
                        id="collapseTwo"
                        className="accordion-collapse collapse p-0 m-0"
                        aria-labelledby="headingTwo"
                        data-bs-parent="#accordionExample"
                      >
                        <div className="accordion-body">
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                          <p className="f_12">
                            .10% Discount on kotak mank credit and debit card on
                            a minimum spend of 2500
                          </p>
                        </div>
                      </div>

                      {showLess && (
                        <p
                          id="headingTwo"
                          className="fw-bolder text-danger pointer_text"
                          data-bs-toggle="collapse"
                          data-bs-target="#collapseTwo"
                          aria-expanded="false"
                          aria-controls="collapseTwo"
                          onClick={() => {
                            setShowLess(!showLess);
                          }}
                        >
                          {" "}
                          Show Less
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* offer end */}
            {/* selectband remove start */}
{/* 
            <div className="row mt-2 d p-0 m-0 ">
              <div className="col-12  border border-gray rounded p-21 bg-light bg-gradient">
                <div className="row">
                  <div className="col-6">
                    <p className="f_12 fw-bolder mt-1">
                      {" "}
                      <span>0 /4 </span> <span>ITEMS SELECTED</span>
                    </p>
                  </div>

                  <div className="col-6 text-center d-flex justify-content-end">
                    <button className="border-0 bg-light f_12 fw-bolder">
                      {" "}
                      REMOVE
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* selectband remove end  */}

            {/* items in cart satrt 1 */}


            {
  cartItems && cartItems.items && Array.isArray(cartItems.items) && cartItems.items.map((item, index) => (
    <div key={index} className="row mt-2 p-0 m-0">
      <div className="col-12 border border-gray rounded p-2 bg-light bg-gradient">
        <div className="row">
        <p className="text-end p-0 m-0 pe-2 pointer" onClick={() => removeFromCart(item._id)}>
            <FontAwesomeIcon className="pointer_text" icon={faXmark} />
          </p>
          <div className="col-sm-3 col-6 pb-3">
            <Link to={`/productpreview/${item.productId}`}>
            <div className="card_image mt-1">
              <img
                className="img-fluid w-100"
                src={`http://localhost:4000/uploads/${item.productDetails.image}` || card_image}  // Using product image or fallback
                alt={item.productDetails.name || 'Product'}
              />
            </div>
            </Link>

          </div>

          <div className="col-sm-9 col-6 pb-3 p-0">
            <div className="py-1">
              <p className="product_name f_15 mb-0 pb-0 fw-bold">
                {item.productDetails.name}
              </p>
              <p className="product_tyle f_14 mb-0 pb-0"> Toy</p> {/* Replace "toy" with dynamic type if necessary */}
              <p className="product_seller f_13 mb-0 pb-0"> Seller: {item.productDetails.seller || 'Unknown'}</p>
              <p className="product_price f_14 fw-bold mb-0 pb-0">
                ₹{item.price}
              </p>
              <div className="d-flex">
                <div className="pe-3">
                  <select
                    className="fs_13 fw-bolder text-secondary"
                    aria-label="Default select example"
                    defaultValue="S"  // Set a default value if needed
                  >
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                  </select>
                </div>

                <div>
                <select
  className="fs_13 fw-bolder text-secondary"
  aria-label="Quantity select"
  value={item.quantity}  // Current quantity of the item
  onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
>
  {[1, 2, 3, 4, 5].map((qty) => (
    <option key={qty} value={qty}>
      {qty}
    </option>
  ))}
</select>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))
}



         

          </div>

          {/* right side  */}
          <div className="col-md-5 ">
            {/* price details start */}
            <div className="border border-gray rounded p-2 bg-light bg-gradient">
              <div className="row p-0 m-0">
                <div className="col-12 ">
                  <p className="fw-bolder f_12 mt-2">PRICE DETAILS</p>
                </div>
                <div className="col-6 ">
                  <p className="f_13 ">Total MRP</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">{cartItems.totalPrice}</p>
                </div>

                {/* <div className="col-6">
                  <p className="f_13 ">Discount on MRP</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">- 2100</p>
                </div>

                <div className="col-6">
                  <p className="f_13 ">Coupon Discount</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Apply Coupon</p>
                </div> */}

                <div className="col-6">
                  <p className="f_13 ">Platform Fee </p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Free</p>
                </div>

                <div className="col-6">
                  <p className="f_13 ">Shipping Fee</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 ">Free</p>
                </div>

                <hr />
                <div className="col-6">
                  <p className="f_12 fw-bolder">Total Amount</p>
                </div>
                <div className="col-6 text-end">
                  <p className="f_13 fw-bolder">{cartItems.totalPrice}</p>
                </div>

                <div>
                  <Link to="/cartaddress">
                    <button
                      to="Cart_address"
                      type="button"
                      className="btn btn-danger w-100 fs_13 fw-bolder"
                    >
                      PLACE ORDER
                    </button>
                  </Link>
                </div>
              </div>
            </div>
            {/* price details end */}
          </div>
        </div>
      </div>
      {/* <div className="card">
            <div className="row">
                <div className="col-md-8 cart">
                    <div className="title">
                        <div className="row">
                            <div className="col"><h4><b>Shopping Cart</b></h4></div>
                            <div className="col align-self-center text-right text-muted">3 items</div>
                        </div>
                    </div>    
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/1GrakTl.jpg" /></div>
                            <div className="col">
                                <div className="row text-muted">Shirt</div>
                                <div className="row">Cotton T-shirt</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/ba3tvGm.jpg" /></div>
                            <div className="col">
                                <div className="row text-muted">Shirt</div>
                                <div className="row">Cotton T-shirt</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                        </div>
                    </div>
                    <div className="row border-top border-bottom">
                        <div className="row main align-items-center">
                            <div className="col-2"><img className="img-fluid" src="https://i.imgur.com/pHQ3xT3.jpg" /></div>
                            <div className="col">
                                <div className="row text-muted">Shirt</div>
                                <div className="row">Cotton T-shirt</div>
                            </div>
                            <div className="col">
                                <a href="#">-</a><a href="#" className="border">1</a><a href="#">+</a>
                            </div>
                            <div className="col">&euro; 44.00 <span className="close">&#10005;</span></div>
                        </div>
                    </div>
                    <div className="back-to-shop"><a href="#">&leftarrow;</a><span className="text-muted">Back to shop</span></div>
                </div>
                <div className="col-md-4 summary">
                    <div><h5><b>Summary</b></h5></div>
                    <hr />
                    <div className="row">
                        <div className="col ps-0" >ITEMS 3</div>
                        <div className="col text-right">&euro; 132.00</div>
                    </div>
                    <form>
                        <p>SHIPPING</p>
                        <select><option className="text-muted">Standard-Delivery- &euro;5.00</option></select>
                        <p>GIVE CODE</p>
                        <input id="code" placeholder="Enter your code" />
                    </form>
                    <div className="row " >
                        <div className="col">TOTAL PRICE</div>
                        <div className="col text-right">&euro; 137.00</div>
                    </div>
                    <button className="btn">CHECKOUT</button>
                </div>
            </div>
            
        </div> */}
    </>
  );
};
export default Cart;
