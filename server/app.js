const express=require('express');
const app=express();
var cors = require('cors');
require('dotenv').config();
const path=require('path');

const bodyParser=require('body-parser');
bodyParser.urlencoded({extended:true})

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(cors())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

require('./db/connection')

const router=require('./routes/routes');


app.use('/',router)
app.listen(process.env.PORT,()=>{
    console.log(`Server is running on PORT ${process.env.PORT} `)
})