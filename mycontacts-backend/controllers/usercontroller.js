const asyncHandler = require('express-async-handler')
const User = require("../models/usermodel")
const bcrypt = require('bcryptjs')
const jwt=require('jsonwebtoken')
//desc register a user
//route post/api/users/register
//acccess public
const registerUser = asyncHandler(async (req, res) => {
    const {username,email,password}=req.body;
    if(!username|| !email|| !password){
        res.status(400);
        throw new Error("all fields are required")
    }
    //first you have to check that the person is already register ot not 
    const userAvaliable=await User.findOne({email})//here we are checking the email is already register or not and it's working
    if(userAvaliable){
        res.status(400);
        throw new Error("user already exists")
    }
    //if the user is not register then we will create it but when we pass the data to the database we will pass the hashed password we cannot pass the raw password for that we will use the bcryptjs
    //to use bycryptjs we have to create the hashed password and then we will pass the hashed password to the database
    const hashedPassword=await bcrypt.hash(password,10);
    console.log("the hashed password:",hashedPassword);
   
    //
    try {
        const user = await User.create({
            username,
            email,
            password: hashedPassword
        });
    
        console.log(`User created: ${user}`);
    
        if (user) {
            res.status(201).json({ _id: user.id, email: user.email });
        } else {
            res.status(400);
            throw new Error("Invalid user data");
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
    
})
//desc login of  a user
//route post/api/users/login
//acccess public
const loginUser = asyncHandler(async (req, res) => {
    const{email,password,username}=req.body;
    if(!email|| !password||!username){
        res.status(400);
        throw new Error("all fields are required")
    }
    //first you have to check that the person is already register ot not
    const user=await User.findOne({email})
    //comaaring the password of the user with the password of the database
    if(user && (await bcrypt.compare(password,user.password))){// password=>it is the password which the user is passing and user.password=>it is the password which is stored in the database it is the hashed password
        const acesstoken=jwt.sign({
            user:{
                name:user.username,
                email:user.email,
                id:user.id
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {"expiresIn":"15m"}
    )
    res.status(200).json({acesstoken})

    }
    else{
        res.status(400);
        throw new Error("Invalid credentials")
    }
  
})
//desc get the current user
//route get/api/users/current
//acccess private
const currentUser = asyncHandler(async (req, res) => { res.json(req.user) }) //this req.user is coming from the validiateTokenHandler.jswhere we have the extraced the token the user from the token and we have stored it in the req.user
module.exports = { registerUser, loginUser, currentUser }
