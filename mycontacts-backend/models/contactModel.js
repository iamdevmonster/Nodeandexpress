const mongoose = require('mongoose');

const contactSchema=mongoose.Schema({
    
    user_id:{
        type:mongoose.Schema.Types.ObjectId,//this specifies that the user_id field will store an ObjectId, which is a unique identifier used by MongoDB
        ref:"User",
        required:true,
    },//this field is used to link a contact to a specific user by storing the user's unique identifier (ObjectId) and ensuring that every contact must be associated with a user.
    name:{
        type:String,
        required:[true,"Name is required"],
    },
    email:{
        type:String,
        required:[true,"add the conatct email is required"],
    },
    phone:{
        type:String,
        required:[true,"contact phone number is required"],
    },

},{
    timestamps:true,
})

module.exports=mongoose.model("contact",contactSchema)