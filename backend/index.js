const express=require("express");
const app=express();
const cors=require("cors");
const connection  = require("./database/db");
app.use(express.json());
app.use(cors());
// api request
app.get("",(req,res)=>{
    res.json({message:"api successfull"})
});
const authRouter=require("./routers/auth.router");
app.use("/api/auth",authRouter);
const port=process.env.port || 5000;
connection();
app.listen(port,()=>console.log("uygulama localhost:5000 portundan ayağa kalktı"));
// connection string mongodb+srv://yucelalican30:<password>@cluster0.6axssxz.mongodb.net/?retryWrites=true&w=majority