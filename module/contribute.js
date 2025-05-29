const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const contribute= new Schema({ 
    placeName: String,
    location: String,
    moredetail:String,
    status:{type:Boolean,default:false}
 });

module.exports = mongoose.model("Contribute",contribute);