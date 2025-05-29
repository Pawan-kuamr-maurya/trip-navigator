
let Contribute=require("../module/contribute.js")
module.exports.contribute_get= async(req,res)=>{
  // res.send("hy");
 if(req.user&&req.user.isAdmin==true){ 
  let allcontribute=await Contribute.find();
  res.render("contri_correct_addsomthing/contribute_for_admin.ejs",{allcontribute});
  return ;
 }
  
res.render("contri_correct_addsomthing/contribution.ejs")
};
module.exports.contribute_post =async (req, res) => {
  try {
      console.log(req.body);

      // Create a new document
      const newContribution = new Contribute({
          placeName: req.body.placeName,
          location: req.body.location,
          moredetail: req.body.moredetail,
      });

      // Save the document to the database
      await newContribution.save();
// add flag which visible when redirect
req.flash("message",` your contribution  has submited`);
      res.status(201).redirect("/countribute");
  } catch (error) {
    req.flash("message",` sorry somthing happend bad ,plese try again`);
      console.error("Error adding place:", error);
      res.status(500).send("Error adding place: " + error.message);
  }
};
  

module.exports.delete_post =async (req, res) =>{
 
  if(req.user.isAdmin==true){
  let id = req.params.id;
  console.log(id);
  
 await Contribute.deleteOne({_id:id})}
  res.redirect("/countribute");

}