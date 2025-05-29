let Listing =require("./module/listing.js")
let Review= require("./module/review.js")

module.exports.islogin=(req,res,next)=>{
  if(!req.isAuthenticated()){
    req.flash("error","you need to login first");  
  
    
    if(req.method=="DELETE"){
      req.session.originalpath= req.headers.referer;
      console.log("here");
      
      res.redirect("/user/signin");                // par login hote hi pasport ise bhi reset ksr dega ,
       return;
    }                                       //aur sath me ham  path res.locals.currenturl=req.originalUrl; me bhi store nahi kara sakte kyu ki  redirect ke nai request hai aur iski vajah se sari valu reset ho jati hai aur hame kuch bhi nahi milega
       req.session.originalpath=(req.originalUrl); //is liye ise hamne saeesion me store kiya jo redirect hone pe bhi path ko save rakhega       
       res.redirect("/user/signin");                // par login hote hi pasport ise bhi reset ksr dega ,
       return;                                          // to redirect ke bad(sesion save path ) => login hone se pahale(loacl save path)
       }                                       // req.flash("path",req.originalUrl);  we cant use this when person login this data will we deleted along with session 
      next();
  }
       
     
      

module.exports.currenturl=(req,res,next)=>{
   if( req.session.originalpath){ res.locals.originalpath=req.session.originalpath;  }    //upar kahi gai bat
   next();                                    //bhia kuch bhi ho jaye next ko call karna mat bhiulio
}



module.exports.isuserhaveaccesto_Id= async (req,res,next)=>{  // we plce these midleware in front og those route which contain  /:id
  let data= await Listing.findOne({_id:req.params.id});     
  if(!(res.locals.currentuser.isAdmin==true)){                       // define in index.js
    req.flash("success_msg",`sorry somthing went wrong`);
    res.redirect(`/allthing/listing/${data._id}`); 
    return;
    }
  next();                                  
  }


  module.exports.isreviewowner=async(req,res,next)=>{
    let rid= req.params.reviewid;
    let pid= req.params.postid;
    let personwhopost= await Review.findOne({_id:rid}).populate("reviewby"); 
    if(personwhopost.reviewby._id.toString()==res.locals.currentuser._id||res.locals.currentuser.isAdmin==true){
      return  next();       
    }
    req.flash("success_msg",`you is not owner of review`);
    res.redirect(`/allthing/listing/${pid}`);

  }


  