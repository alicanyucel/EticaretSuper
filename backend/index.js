const express=require("express");
const app=express;
const cors=require("cors");
app.request(express.json());
app.use(cors());
// api request

const port=process.env.port || 5000;
app.listen(port,()=>console.log("uygulama localhost:5000 portundan ayağa kalktı"));
