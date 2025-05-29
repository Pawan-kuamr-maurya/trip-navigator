let Listing =require("../module/listing.js")
let Review= require("../module/review.js")

module.exports.home=async(req,res)=>{
  if(req.headers.longitude&&req.headers.latitude){
  
  }
  

    let data= await Listing.find({}).limit(10).populate({path:"reviews",populate:{path:"reviewby"}});
    res.render("allthing/home.ejs",{data})
  }

  module.exports.userview=async (req,res)=>{
    if(req.params.id.length!=24){req.flash("error",`you serch place not in database`); res.redirect("/allthing"); return ;}
   try{  
     let data= await Listing.findOne({_id:req.params.id}).populate({path:"reviews",populate:{path:"reviewby"}}).populate("owner");
   if(!data){
     req.flash("error",`you serch place not in database`); res.redirect("/allthing"); 
   }else{res.render("allthing/userview.ejs",{data});}
   }catch(e){ 
     req.flash("error",`you serch place not in database`); res.redirect("/allthing");}
     console.log(req.params.id.length);
   
     };

  module.exports.newpostform=async (req,res)=>{
        console.log(req.user);
        
                    res.render("allthing/new.ejs");
             }
   
             
  module.exports.newpostdata=async (req,res,next)=>{
        
                let newdata= new Listing(req.body.listing);
                console.log(newdata);
                newdata.owner=req.user._id;   // this will add the ownen who is currently login along with post
                console.log(newdata);
                
                await newdata.save();
                req.flash("message","new item added sussfully");
                res.redirect("/allthing/");                                          
        }

  module.exports.editpost=async (req,res,next)=>{
    let data= await Listing.findOne({_id:req.params.id});
    console.log(data);
    
    res.render("allthing/edit.ejs" ,{data})
  }      


  module.exports.editpostdata=async (req,res,next)=>{
    console.log(req.body.istrue+"   "+req.body.whatspecial);
    if(req.body.istrue==undefined){
      const highlight = {
        istrue: false, // or false depending on your requirement
        whatspecial: ""
    };
      // Add the highlight object to the listing
  req.body.listing.highlight = highlight;
    }else{
      const highlight = {
        istrue: true, // or false depending on your requirement
        whatspeacial: req.body.whatspeacial
    };
      // Add the highlight object to the listing
  req.body.listing.highlight = highlight;
    }
  


    
    await Listing.findOneAndUpdate({_id:req.params.id},req.body.listing).then(()=>{console.log("sussufukly update");})
    let data= await Listing.findOne({_id:req.params.id});
    req.flash("success_msg",` tourest place ${data.title} update sussfully`);
    res.redirect(`/allthing/listing/${req.params.id}`);
  }



  module.exports.deletepost=async (req,res,next)=>{
    let id= req.params.id;
    let deleteitem=await Listing.findByIdAndDelete(id);
    await Review.deleteMany({_id:{$in:deleteitem.reviews}})  //delete hone ke bad bbhi data data store tha jo hamne deleteitem me rakh liya
    req.flash("message",` tourest place  delete sussfully`);
    res.redirect("/allthing/");   //to many work if post delete then relateed review delete
  }








///************** related to review ******************** */





  module.exports.addreview=async (req,res)=>{
    console.log(req.body.review);
     
    let  listing = await Listing.findById(req.params.id)   //pahali bat ye ki , koi  bhi relation  //
    let revew= new Review(req.body.review);                // me koi relation store karne ke liye pahale relation ke modal la instance banatae hai
    revew.reviewby=res.locals.currentuser._id;
    listing.reviews.push(revew) ;                                       // tab store karte hai 
    revew.save();    // revew ko store kar diya 
    listing.save();    /// listing ko store kar diya
    req.flash("success_msg","rew subbmit sussfully");
    res.redirect(`/allthing/listing/${req.params.id}`);
  }

  module.exports.deletereview=async (req,res,next)=>{
       let pid= req.params.postid;
       let rid= req.params.reviewid;
       let newdata= await Listing.findByIdAndUpdate(pid,{$pull:{reviews:rid}});
       await  Review.deleteOne({_id:rid}).then(()=>{ console.log("delete sussfull");});
       req.flash("success_msg",` review delete sussfully`);
       res.redirect(`/allthing/listing/${pid}`);
      
  }

  module.exports.filter=async (req,res,next)=>{
    let placetomatch=req.body.place;
    let catogary=req.body.filselect;
    console.log(placetomatch+" "+catogary);
    
      try {
        if(placetomatch&& (!catogary)){
        //  console.log("notext");
        const results = await Listing.find( {location:{ $regex: placetomatch, $options: 'i' }} );
       // console.log(results);
        
        return   res.render("allthing/home.ejs",{data:results})
      }else if(!placetomatch&& (catogary)){
        const results = await Listing.find({ category: { $in: catogary } });
       // console.log(results);
        
        return  res.render("allthing/home.ejs",{data:results})
      }else{
        const results = await Listing.find({$or: [ { location: { $regex: placetomatch, $options: 'i' } }, { category: { $in: catogary } }]});
       // console.log(results);
        
        return   res.render("allthing/home.ejs",{data:results})
      }
       
       
    } catch (error) {
        next(error)
    }
    
      
      
      }