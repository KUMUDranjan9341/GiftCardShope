const express=require('express');
const router=express.Router()
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
require('dotenv').config()

const auth = require('../middleware/auth');

const crypto = require('crypto');
const nodemailer = require("nodemailer")

const multer = require("multer");


function generateOTP() {
  return crypto.randomInt(1000, 10000).toString(); 
}


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'vishal.manthanitsolutions@gmail.com',
    pass: 'yjal dkyp ncld juil'
  }
});



let key=process.env.SECRET_KEY

const useraccounts=require('../models/UserSchema');
const Otp=require('../models/otpSchema');
const Category = require('../models/categoriesSchema');
const Contact = require('../models/contactSchema');
const Product = require("../models/Product");
const Cart=require('../models/Cart');
const Address=require('../models/Address');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });


router.get('/products', async (req, res) => {
    try {
      const data = await Product.find(); 
      res.json(data);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Server error' }); 
    }
  });


  router.post('/generate-otp', async (req, res) => {
    try {
      let { mobile, email } = req.body;
  
      let otp = generateOTP();
      console.log('otp: ', otp);
  
      let mailOptions = {
        from: 'vishal.manthanitsolutions@gmail.com',
        to: email,
        subject: 'Welcome! Complete Your Registration - OTP Verification',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
            <h2 style="color: #333;">Welcome to [Your App Name]!</h2>
            <p style="font-size: 16px; color: #555;">
              Dear User,
            </p>
            <p style="font-size: 16px; color: #555;">
              Thank you for signing up with us! To complete your registration and activate your account, please use the following One Time Password (OTP). This OTP is valid for the next 10 minutes.
            </p>
            <div style="text-align: center; margin: 30px 0;">
              <span style="font-size: 24px; font-weight: bold; color: #007BFF; background-color: #f9f9f9; padding: 15px; border-radius: 8px; display: inline-block;">
                ${otp}
              </span>
            </div>
            <p style="font-size: 16px; color: #555;">
              Please enter this OTP on the registration page to verify your email and activate your account.
            </p>
            <p style="font-size: 16px; color: #555;">
              If you did not initiate this registration, you can safely ignore this email.
            </p>
            <p style="font-size: 16px; color: #555;">
              Best regards,<br />
              The [Your App Name] Team
            </p>
            <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
              <small style="color: #999;">This is an automated email. Please do not reply.</small>
            </div>
          </div>
        `
      };
      

      let info = await transporter.sendMail(mailOptions);
 
      if (info) {
        const newData = new Otp({
          email,
          number:mobile,
          otp,
        });
  
        await newData.save(); 
  
        return res.status(200).json({ success: 'true', message: 'OTP sent and data saved.' });
      } else {
        return res.status(500).json({ success: 'false', message: 'Failed to send email.' });
      }
    } catch (error) {
      console.error('Error sending email: ', error);
      return res.status(500).json({ success: 'false', message: 'An error occurred.' });
    }
  });


  router.post('/verify-otp', async (req, res) => {
    try {
      let { mobile, otp, email } = req.body;
  
      const data = await Otp.findOne({ email, number: mobile }).sort({ createdAt: -1 });

  
      if (!data) {
        return res.status(404).json({ success: false, message: 'No OTP record found.' });
      }


  
      if (data.otp.toString()=== otp) {
        return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
      } else {
        return res.status(400).json({message: 'Invalid OTP.' });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'An error occurred during OTP verification.' });
    }
  });
  
  
  router.post('/register', async (req, res) => {
    try {
  
        const { name, email, num, password } = req.body;

        if (!name || !email || !num || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const existingUser = await useraccounts.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingNumber = await useraccounts.findOne({ number: num });
        if (existingNumber) {
            return res.status(400).json({ message: 'Mobile number already exists' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        

        const newUser = new useraccounts({
            name,
            email,
            number:num,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ success: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



router.post('/forgotpass',async(req,res)=>{
  try {
    let {email}=req.body
   

    let numExists=await useraccounts.findOne({email:email})
   
    if(!numExists){
      
      return res.status(404).json({numNotExists:"Email doesn't exists"})
    }


    let otp = generateOTP();
    console.log('otp: ', otp);

    let mailOptions = {
      from: 'vishal.manthanitsolutions@gmail.com',
      to: email,
      subject: 'Reset Your Password - OTP Verification',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #333;">Password Reset Request</h2>
          <p style="font-size: 16px; color: #555;">
            Dear User,
          </p>
          <p style="font-size: 16px; color: #555;">
            We received a request to reset the password associated with this email address. Please use the following One Time Password (OTP) to reset your password. The OTP is valid for the next 10 minutes.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #007BFF; background-color: #f9f9f9; padding: 15px; border-radius: 8px; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 16px; color: #555;">
            If you did not request this change, you can ignore this email.
          </p>
          <p style="font-size: 16px; color: #555;">
            Best regards,<br />
            The Gift Shop Team
          </p>
          <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #e0e0e0;">
            <small style="color: #999;">This is an automated email. Please do not reply.</small>
          </div>
        </div>
      `
    };
    


    let info = await transporter.sendMail(mailOptions);

    if (info) {
      const newData = new Otp({
        email,
        otp
      });

      await newData.save(); 

      return res.status(200).json({ success: 'true', message: 'OTP sent and data saved.' });

    }
    
  } catch (error) {
    console.log(error);
    
  }
})


router.post('/verifyForgotPass', async (req, res) => {
  try {
    let {otp, email } = req.body;


    const data = await Otp.findOne({email}).sort({ createdAt: -1 });


    if (!data) {
      return res.status(404).json({ success: false, message: 'No OTP record found.' });
    }



    if (data.otp.toString()=== otp) {
      return res.status(200).json({ success: true, message: 'OTP verified successfully.' });
    } else {
      return res.status(400).json({message: 'Invalid OTP.' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'An error occurred during OTP verification.' });
  }
});

router.post('/resetPassword', async (req, res) => {
  const { email, newPassword } = req.body;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await useraccounts.updateOne({ email }, { password: hashedPassword });

  res.json({ success: true, message: 'Password reset successfully!' });
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;


    const user = await useraccounts.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "Email doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect password' });
    }


    const payload = {
      id: user._id,
      name: user.name,
      email: user.email,
      num: user.number,
      role: user.role 
    };

    const token = jwt.sign(payload, key, { expiresIn: '1h' });


    return res.status(200).json({
      message: "Login successful",
      token: token,
      role: user.role 
    });

   
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


router.post('/manageCategory', async (req, res) => {
  try {
    const categoryName = req.body.categoryName;

    const existingCategory = await Category.findOne({ category: categoryName });
    
    if (existingCategory) {
      return res.status(400).json({ error: 'Category already exists' });
    }

    const newCategory = new Category({ category: categoryName });
    const add = await newCategory.save();

    if (add) {
      return res.status(200).json({ success: 'ok' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add category' });
  }
});


router.get('/categoryData', async (req, res) => {
  try {
    const categoryData = await Category.find({});
    res.status(200).json(categoryData); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch category data' }); 
  }
});
router.get('/registrationDetails', async (req, res) => {
  try {
    const accountData = await useraccounts.find({});
    res.status(200).json(accountData); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch category data' }); 
  }
});
router.get('/contactUsDetails', async (req, res) => {
  try {
    const contactUsData = await Contact.find({});
    res.status(200).json(contactUsData); 
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch category data' }); 
  }
});


router.delete('/deleteCategory/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
      const deletedCategory = await Category.findOneAndDelete({ categoryId });

      if (!deletedCategory) {
          return res.status(404).json({ error: 'Category not found' });
      }

      res.status(200).json({ success: true, message: 'Category deleted successfully', deletedCategory });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete category' });
  }
});


router.post('/contact', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: 'All fields are required.' });
    }
    const newContact = new Contact({ name, email, message });

    await newContact.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Message not sent due to a server error.' });
  }
});



// router.post("/addProduct", upload.fields([
//   { name: "coverImage", maxCount: 1 },
//   { name: "productImages", maxCount: 6 }
// ]), async (req, res) => {
//   try {

//     console.log('req.body', req.body)
//     console.log('req.files', req.files)

      
//       const { productName, productType, productPrice, categoryDetails, productDescription } = req.body;

//       let categoryId = null;
//       let categoryName = null;
//       if (categoryDetails) {
//                   [categoryId, categoryName] = categoryDetails.split("-");
//       }
//       const coverImage = req.files["coverImage"] ? req.files["coverImage"][0].filename : null;
//       const productImages = req.files["productImages"] ? req.files["productImages"].map(file => file.filename) : [];

//       const newProduct = new Product({
//           productName,
//           productType,
//           productPrice,
//           categoryId,
//           categoryName,
//           productDescription,
//           coverImage,
//           productImages
//       });

    
//       await newProduct.save();
//       res.status(201).json({ message: "Product added successfully", product: newProduct });
//   } catch (error) {
//       console.error("Error adding product:", error);
//       res.status(500).json({ error: "Error adding product" });
//   }
// });

router.post("/addProduct", upload.fields([
  { name: "coverImage", maxCount: 1 },
  { name: "productImages", maxCount: 6 }
]), async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Request Files:", req.files);

    const { productName, productType, productPrice, categoryDetails, productDescription } = req.body;

    let categoryId = null;
    let categoryName = null;
    if (categoryDetails) {
      [categoryId, categoryName] = categoryDetails.split("-");
    }

    const coverImage = req.files["coverImage"] ? req.files["coverImage"][0].filename : null;
    const productImages = req.files["productImages"] ? req.files["productImages"].map(file => file.filename) : [];

    const newProduct = new Product({
      productName,
      productType,
      productPrice,
      categoryId,
      categoryName,
      productDescription,
      coverImage,
      productImages,
    });

    console.log("New product object:", newProduct);
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ error: "Validation failed", details: error.errors });
    }

    res.status(500).json({ error: "Error adding product", details: error.message });
  }
});




router.get('/productData', async (req, res) => {
  try {
      const products = await Product.find({});
      res.json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/productPreview/:productId', async (req, res) => {
  try {
    const productId=req.params.productId
      const products = await Product.findOne({productId});
      res.json(products);
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.delete('/productData/:id', async (req, res) => {
  try {
    
      const productId = req.params.id;
      console.log(productId);
      const deletedProduct = await Product.findOneAndDelete(productId);
      
      if (!deletedProduct) {
          return res.status(404).json({ message: 'Product not found' });
      }
      
      res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: 'Failed to delete product' });
  }
});



router.get('/fetchCategory/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // console.log("Requested categoryId:", categoryId);

    const category = await Category.findOne({ categoryId });
    const otherCategories = await Category.find({ categoryId: { $ne: categoryId } });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.json({
      requestedCategory: category,
      otherCategories: otherCategories,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});
router.get('/fetchProductByCategory/:categoryId', async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    // console.log("Requested categoryId:", categoryId);

    const data = await Product.find({ categoryId });
res.json(data);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/cartAdd', auth, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id;
  const { email, name, num } = req.user;

  console.log(req.user, 'req.user');
  console.log(req.body, 'req.body');

  try {
    const product = await Product.findOne({ productId: productId });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId });

    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity, price: product.productPrice });
      }
    } else {
      cart = new Cart({
        userId,
        emailId: email,
        name: name,
        number: num,
        items: [{ productId, quantity, price: product.productPrice }]
      });
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully', cart });

  } catch (error) {
    console.error("Error adding product to cart:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/api/cart', auth, async (req, res) => {
  try {
    const email = req.user.email;
    const cart = await Cart.findOne({ emailId: email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Fetch all products in parallel using Promise.all
    const productPromises = cart.items.map(item =>
      Product.findOne({ productId: item.productId })
    );

    const products = await Promise.all(productPromises);

    // Update cart items with product details
    const updatedItems = cart.items.map((item, index) => {
      const product = products[index];
      return product
        ? {
            ...item.toObject(),
            productDetails: {
              name: product.productName,
              description: product.productDescription,
              type:product.productType,
              price: product.productPrice,
              image: product.coverImage,
            },
          }
        : {
            ...item.toObject(),
            productDetails: null,
          };
    });

    const updatedCart = {
      ...cart.toObject(),
      items: updatedItems,
    };

    
    res.json(updatedCart);

  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


router.delete('/api/cart/remove/:itemId', auth, async (req, res) => {
  try {
    const email = req.user.email;
    const { itemId } = req.params;  

    const cart = await Cart.findOne({ emailId: email });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item._id.toString() !== itemId);  // Assuming _id is the identifier for each cart item

    cart.totalPrice = cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    cart.totalQuantity = cart.items.reduce((total, item) => total + item.quantity, 0);

    await cart.save();

    res.status(200).json(cart);
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ message: 'Server error' });
  }
});

// router.put('/api/cart/update/:itemId', async (req, res) => {
//   try {
//       const { itemId } = req.params;
//       const { quantity } = req.body;

//       if (!itemId || !quantity) {
//           return res.status(400).json({ error: "Invalid data provided" });
//       }

//       const cartItem = await Cart.findById(itemId);
//       if (!cartItem) {
//           return res.status(404).json({ error: "Item not found" });
//       }

//       cartItem.quantity = quantity;
//       await cartItem.save();

//       res.status(200).json({ message: "Quantity updated successfully" });
//   } catch (error) {
//       console.error("Error updating quantity:", error);
//       res.status(500).json({ error: "Internal server error" });
//   }
// });


router.put('/api/cart/update/:itemId', async (req, res) => {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Validate input
    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({ message: 'Invalid quantity' });
    }

    // Ensure emailId is available (set in middleware)
    const emailId = req.emailId;
    if (!emailId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Fetch the cart
    const cart = await Cart.findOne({ emailId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Find and update the item
    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    item.quantity = quantity;
    await cart.save();
    res.status(200).json({ message: 'Quantity updated', cart });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ message: 'Error updating quantity', error });
  }
});



router.post('/api/address', auth, async (req, res) => {
  const userId = req.user.id;
  
  const { address } = req.body;

  try {
    // Find the user by ID
    let user = await Address.findById(userId);

    if (!user) {
      user = new Address({
        _id: userId,
        name: req.user.name,
        emailId: req.user.email,
        mobileNo: req.user.num,
        addresses: [address] 
      });
    } else {
      user.addresses.push(address); 
    }

    await user.save();

    // Returning success message
    res.status(200).json({ message: 'Address added successfully', user });
  } catch (error) {
    console.error("Error saving address:", error.message);
    // Return detailed error message
    res.status(500).json({ message: `Server error: ${error.message}` });
  }
});


router.get('/api/address', auth, async (req, res) => {
  const userId = req.user.id; 

  try {
    let user = await Address.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    

    res.status(200).json({
      message: 'Addresses fetched successfully',
      addresses: user.addresses, 
    });

  } catch (error) {
    console.error('Error fetching addresses:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


// Backend Route: Remove address
router.post('/api/address/remove', auth, async (req, res) => {
  const userId = req.user.id; // User ID from JWT
  const { addressId } = req.body; // Address ID to be removed

  try {
    // Find the user by ID
    let user = await Address.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
 const addressIndex = user.addresses.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: 'Address not found' });
    }

    user.addresses.splice(addressIndex, 1);

    await user.save();

    res.status(200).json({ message: 'Address removed successfully', user });
  } catch (error) {
    console.error("Error removing address:", error);
    res.status(500).json({ message: 'Server error' });
  }
});




router.get('/profile', async (req, res) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    const tokenValue = token.replace('Bearer ', '');

    const decoded = jwt.verify(tokenValue, process.env.SECRET_KEY); 

    const user = await useraccounts.findById(decoded.id).select('-password'); 
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);

  } catch (error) {
    console.error(error);

    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Invalid or expired token, please log in again' });
    }

    return res.status(500).json({ message: 'Server error, please try again later' });
  }
});

  

// Update Profile 


router.put('/profile', auth, async (req, res) => {
  try {
    const { name, email, number, dob, gender } = req.body;

    // console.log('Request Body:', req.body);
    // console.log('User ID:', req.user.id);

    // Ensure that name, email, and number are provided
    if (!name || !email || !number) {
      return res.status(400).json({ message: 'Name, email, and number are required.' });
    }

    const user = await useraccounts.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.number = number || user.number;
    user.dob = dob || user.dob;
    user.gender = gender || user.gender;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        name: user.name,
        email: user.email,
        number: user.number,
        dob: user.dob,
        gender: user.gender,
      },
    });

  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ message: 'Server error, unable to update profile.', error: err.message });
  }
});









module.exports=router