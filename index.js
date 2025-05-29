const express = require("express");
const mongoose = require('mongoose');
//let Listing =require("./module/listing")
//let Review= require("./module/review.js")
const methodOverride= require("method-override")
const boyler= require("ejs-mate");
const path = require('path'); 
const session =require("express-session")
const passport = require("passport");
const Localstrategy = require("passport-local");
const flash=require("connect-flash");
//const { log } = require("console");
//const AsynExceHand= require("./utils/AsynExcepHandler.js");

const user= require("./routes/user.js")
const allthing= require("./routes/allthing.js");
const contribute=require("./routes/contribute.js")
const usermodal = require("./module/usermodal.js");
const API =require("./routes/API.js")

mongoose.connect('mongodb://127.0.0.1:27017/newdata').then(() => console.log('Connected!'));
 
const app= express();

app.use(session({secret:"anystringsecrete",resave:false,saveUninitialized:true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new Localstrategy(usermodal.authenticate()));
passport.serializeUser(usermodal.serializeUser());
passport.deserializeUser(usermodal.deserializeUser());

app.use(flash());
app.use(methodOverride("_method"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));
app.engine('ejs',boyler);
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');             
  res.locals.fail_msg = req.flash('fail_msg');
  res.locals.message = req.flash('message');

  res.locals.error = req.flash('error'); // Use this for passport error messages its value set by passport when somthing happend bad
 res.locals.currentuser=req.user;     //use in home to show login and logout and varifi edit and delete button
 
  next();
});
// app.set('trust proxy', true)
// app.use((req,res,next)=>{
//   console.log("pawan");
  
//  console.log( req.ip);
//  next()
 
// })

app.use("/user",user);
app.use("/allthing",allthing);
app.use("/countribute",contribute)
app.use("/api",API)
 


app.use((err,req,res,next)=>{
  res.render("error/error.ejs",{err} )
  console.log(err);
  
})

app.use((req,res)=>{
  res.send('<img hight="500" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSyK5l9ki_uEKerEUkzg8OlorqjR1xAapxRA&amp;s" alt="" srcset="" style=" height: 100%; width: 100%;">')
})
 
app.listen(3000,()=>{
    console.log("run");
    
})

