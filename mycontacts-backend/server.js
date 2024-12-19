console.log("let's build a server!");
//creating the express server
const express=require("express");
const dotenv=require("dotenv").config();
//creating the connection

const errorHandler=require("./middleware/errorhandler");
const connectDb = require("./config/dbConnection");
connectDb();
const app=express();
//creating the port
const port=process.env.PORT||5000
//creating the middleware
app.use(express.json());//it act like a parser which the parse the tsream of data from the client to the server
app.use("/api/contacts",require("./routes/contactroute"));
;
 app.use("/api/users",require("./routes/userroute"));
app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})