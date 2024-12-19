const express=require("express");
const validiateToken=require("../middleware/validiateTokenHandler");
const { getContact,createContact,updateContact,deleteContact,getContacts} = require("../controllers/contactcontroller");
const router=express.Router();
//you can clearly see that the get and post route is same 
//they all are prtected route
router.use(validiateToken);
router.route("/").get(getContact).post(createContact)
router.route("/:id").get(getContacts).put(updateContact).delete(deleteContact)

//exporting the router
module.exports=router;