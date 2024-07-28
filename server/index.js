let express=require ("express");
let mongoose=require("mongoose");
let cors = require('cors')
mongoose.connect("mongodb://127.0.0.1:27017/flipkartproject").then(()=>{
    console.log("db");
}).catch((err)=>{
    console.log(err)
})
let signup=require('./routes/signnup')
let login=require('./routes/login')
let product=require('./routes/product');

let app=express();
app.use(cors());
app.get("/",(req,res)=>{
    res.send("hyy")
})
app.use('/api',signup)
app.use('/api',login)
app.use('/api',product)



app.listen(3000,()=>{
    console.log("server is working")
})