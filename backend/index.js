const express = require("express");
require('dotenv').config();
const cors = require("cors");
const { connection } = require("./config/db");
const routes = require("./routes/user.route");
const { authenticate } = require("./middleware/authenticate.middleware");

const app = express();
app.use(express.json());

app.use(cors({origin:"*"}));


app.use("/",(err,res)=>{
    res.send("welcome to the nike backend");
    console.log("welcome to the nike backend");
})

app.use("/user",routes);

// authentication
app.use(authenticate)


app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("connected to mongo");
    }
    catch(err){
        console.log("msg:",err);
    }
    console.log(`connected to port ${process.env.port} successfully`)
})
