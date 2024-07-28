let mongoose=require("mongoose")
let userSchema=mongoose.Schema({
    name:{
type:String,
require:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
require:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:"user",
    }
})
let user=mongoose.model("User",userSchema);
module.exports=user;