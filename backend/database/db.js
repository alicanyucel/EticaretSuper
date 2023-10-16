const mongoose=require("mongoose");
const url="mongodb+srv://yucelalican30:alican12345.@cluster0.6axssxz.mongodb.net/?retryWrites=true&w=majority";
const connection=()=>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(()=>console.log("bağlantı sağlam")).catch((err)=>console.log("bağlantı yok" + err.message));
}
module.exports=connection;