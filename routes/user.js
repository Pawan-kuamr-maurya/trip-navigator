let express =require ("express");
const router = express.Router();
//const AsynExceHand= require("../utils/AsynExcepHandler.js");

const {currenturl} = require("../middleware.js")
const {signupform,signupform_data,signin,signindata,signout} = require("../controler/user.js")

const passport = require("passport");
// const path = require("path");


router.get("/signup",  signupform);

router.post("/signup", signupform_data);


router.get("/signin",  signin)  ;  
   
router.post("/signin",currenturl,passport.authenticate("local",{failureRedirect:"/user/signin",failureFlash:true}) ,signindata)                                       
   

 router.get("/signout", signout)   
 router.get("/deleteaccount", (req,res)=>
{ res.send("time lageaga ")})   

  module.exports=router;