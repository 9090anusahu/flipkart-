let express = require('express')
let router = express.Router();
let User = require('../models/signnup')
let cookieParser = require('cookie-parser')
let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
router.use(express.json())  //for form work
router.use(express.urlencoded({ extended: true }))  //for form work
router.use(cookieParser())


router.post('/login',async (req,res)=>{
//   console.log(req.body);
  let loginUser = await User.findOne({email:req.body.email})
    //   console.log(loginUser);
    //   console.log(loginUser.password);  //jo user ka original password hai
    //   console.log(req.body.password); //jo password user ne login form se bheja hai
      if(!loginUser) 
        {
        return res.send("email or password is incorrect")
        }
      else{
         bcrypt.compare(req.body.password,loginUser.password,(err,result)=>{
             if(result)
              {
                let token = jwt.sign({email: loginUser.email},"secretcode")
                res.cookie("token",token)
                res.send("yes u can login")
              }
            else{
              res.send("invalid user")
            }
         })
      }
})

module.exports = router