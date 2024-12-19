const asyncHandler = require('express-async-handler')
const Contact=require("../models/contactModel")
//desc get all contacts
//route get/api/contacts
//acccess private
const getContact=asyncHandler(async(req,res)=>{    const contacts= await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
    
    })
//desc get all contacts
//route get/api/contacts:id
//acccess private
const getContacts=asyncHandler(async(req,res)=>{   //process of fetching the contacts
     const contact=await Contact.findById(req.params.id);
     //if the contact not found 
     if(!contact){
        res.status(404);
        throw new Error("contact not found")
     }
     //if we find the contacct
    res.status(200).json(contact);
    
    })
    
//desc create new  contacts
//route POST/api/contacts
//acccess private
const createContact=asyncHandler(async(req,res)=>{
    console.log("the requested body is",req.body);
    //if i am removing the body parser then the requested body will be undefined
    const {name,email,phone}=req.body
    if(!name ||!email||!phone){
         res.status(400)
        throw new Error("all fields are required")
    }
    //
    const contact=await Contact.create({name,email,phone,user_id:req.user.id});//whenever this req.user.id is called then it will be called from the validiateTokenHandler it will decode the tolen and stores to req.user and from there the req.user.id will decode the id of the user
    res.status(201).json(contact);
    
    })
 //whenever we have to have to recieve the data from the client to the server we will always use the body parser to parse the stream of data by using the middleware   
//updating the contacts
//route put/api/contacts
//acccess private
const updateContact=asyncHandler(async(req,res)=>{


    const contact=await Contact.findById(req.params.id);
    //if the contact not found 
    if(!contact){
       res.status(404);
       throw new Error("contact not found")
    }

     //we have to keep the chaeck that one user cannot update the contact of the other user
     if(contact.user_id.toString()!==req.user.id){
        res.status(401);
        throw new Error("Not authorized,token failed")
     }
    const updatedContact=await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true})
    
   
    res.status(200).json(updatedContact);
    
    })
//deleting the   contacts
//route DELETE/api/contacts
//acccess private
const deleteContact=asyncHandler(async(req,res)=>{
    //fetching the contact
    const contact=await Contact.findById(req.params.id);
    //if the contact not found 
    if(!contact){
       res.status(404);
       throw new Error("contact not found")
    }
    if(contact.user_id.toString()!==req.user.id){
        res.status(401);
        throw new Error("Not authorized,token failed")
     }
    //if we find the contacct then delete

   /* await Contact.remove() */
   await Contact.findByIdAndDelete(req.params.id)
    res.status(200).json({message:"contact removed"});
    
    })
    module.exports={getContact,createContact,updateContact,deleteContact,getContacts}
    //imp point to remmember that when we use mongodb an dmongoose then we have to use the async await function to handle the promise
    //but to deal with the error there is a way that we can implement try catch in every block but there is another way to handle the error by using the express-async-handler