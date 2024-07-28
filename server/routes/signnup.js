let express = require('express')
let router = express.Router();
let User = require('../models/signnup')
let cookieParser = require('cookie-parser')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
router.use(express.json())  //for form work
router.use(express.urlencoded({ extended: true }))  //for form work
router.use(cookieParser())

router.get('/',(req,res)=>{
    res.send('heheeh')

})
router.post('/users',async (req,res)=>{
  console.log(req.body);
  let {name,email,password} = req.body
  let user = await User.findOne({email})  //to find whether your email is exist or not
  if(user)
    {
        console.log("user exist");
    }

else{
    bcrypt.genSalt(10,(err,salt)=>{
        console.log("salt ",salt);
        bcrypt.hash(password,salt,async (err,hash)=>{
           console.log("hashPassword "+hash);

           let userCreated= await User.create({
              name:name,
              email:email,
              password:hash
           })
           let token = jwt.sign({email},"secret")
           console.log("token ",token);
           res.cookie("token",token)
           res.send(userCreated)
        })
    })
}
 
})


module.exports = router