import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/cart.css";
import { Link } from "react-router-dom";
import card_image from "../assets/images/21.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showLess, setShowLess] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pincode, setPincode] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");

  // Fetch cart data
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/cart", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };
    fetchCartData();
  }, [refresh]);

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/cart/remove/${itemId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.status === 200) {
        setRefresh(!refresh);
        alert("Item removed from cart");
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item");
    }
  };

  // Update item quantity
  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const updatedItems = cartItems.items.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems({ items: updatedItems });

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
        setRefresh(!refresh);
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
      alert("Failed to update quantity");
    }
  };

  // Check pincode
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
      if (
        data &&
        data[0].Status === "Success" &&
        data[0].PostOffice &&
        data[0].PostOffice.length > 0
      ) {
        const { Name, District, State } = data[0].PostOffice[0];
        setLocation(`${Name}, ${District}, ${State}`);
      } else {
        setLocation("");
        setError("Pincode not found.");
      }
    } catch (err) {
      console.error("Error in Fetch:", err);
      setError("Error fetching location data. Please try again.");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 text-center">
          <p className="fs_13">
            <span className="fw-bolder text-success">
              <u>BAG</u>
            </span>{" "}
            <span>--------</span>
            <span className="fw-bolder">ADDRESS</span>
            <span>--------</span>
            <span className="fw-bolder">PAYMENT</span>
          </p>
          <hr className="dotted-line" />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        {/* Left Section */}
        <div className="col-md-5">
          {/* Pincode Checker */}
          <div className="border rounded p-2 bg-light">
            <div className="row">
              <div className="col-md-6">
                <p className="fw-bolder f_14 mt-2">
                  Check delivery time & service
                </p>
                {location && <p className="text-success f_13">{location}</p>}
                {error && <p className="text-danger f_12">{error}</p>}
              </div>
              <div className="col-md-6">
                <div className="border rounded">
                  <input
                    type="number"
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="border-0 bg-transparent w-75"
                  />
                  <span className="text-danger pointer_text" onClick={checkPincode}>
                    CHECK
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Cart Items */}
          {cartItems.items?.map((item, index) => (
            <div key={index} className="border rounded p-2 bg-light mt-2">
              <div className="row">
                <p
                  className="text-end pointer"
                  onClick={() => removeFromCart(item._id)}
                >
                  <FontAwesomeIcon icon={faXmark} />
                </p>
                <div className="col-sm-3">
                  <Link to={`/productpreview/${item.productId}`}>
                    <img
                      className="img-fluid"
                      src={item.productDetails.image || card_image}
                      alt={item.productDetails.name}
                    />
                  </Link>
                </div>
                <div className="col-sm-9">
                  <p className="fw-bold">{item.productDetails.name}</p>
                  <p>₹{item.price}</p>
                  <select
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(item._id, parseInt(e.target.value))
                    }
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
          ))}
        </div>
        {/* Right Section */}
        <div className="col-md-5">
          <div className="border rounded p-2 bg-light">
            <p className="fw-bold">PRICE DETAILS</p>
            <p>Total MRP: ₹{cartItems.totalPrice}</p>
            <p>Platform Fee: Free</p>
            <p>Shipping Fee: Free</p>
            <hr />
            <p>Total Amount: ₹{cartItems.totalPrice}</p>
            <Link to="/cartaddress">
              <button className="btn btn-danger w-100">PLACE ORDER</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
