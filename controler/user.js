const Usermodal = require("../module/usermodal.js");





module.exports.signupform=(req,res)=>{
    res.render("./sighuplogin/sighnup.ejs")
   }

 module.exports.signupform_data=async(req,res)=>{
    console.log(req.flash("message"));
try{let { username,gender, password,name  ,rep_password}=req.body.signup;
    let newdat=new Usermodal({username,gender ,name }) //we can store normal object too 
    if(password!=rep_password){req.flash("message"," retype  password dont mathch"); res.redirect("/user/signup")}
    let savedata= await Usermodal.register(newdat, password);
    req.login(savedata,(err)=>{
    if(err){ next(err);}
    else{   
      req.flash("message","regester and login sussfully"); 
      res.redirect("/allthing");
      }
     })
 
}catch(e){
    req.flash("message",e.message );
    console.log(e.message);
    res.redirect("/user/signup")
  }
}  


module.exports.signin=(req,res)=>{
    res.render("./sighuplogin/login.ejs")
   }


module.exports.signindata=async (req,res)=>{
       if(!(res.locals.originalpath)){ req.flash("message",`wellcome ${req.user.name} `)
        res.redirect("/allthing")
       }else{
           res.redirect(res.locals.originalpath)
        }
    }
   
    module.exports.signout=(req,res)=>{
        req.logout((err)=>{
          if(err){
            return next(err)
          }else{
            req.flash("message","you got logout sussfully")
            console.log("we got again logout");
            
            res.redirect("/allthing");
          }
        })
       }
      
      
  