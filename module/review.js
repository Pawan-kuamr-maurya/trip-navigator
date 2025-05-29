const  mongoose  = require("mongoose");
const Schema = mongoose.Schema;
const review= new Schema({
    comment:String,
    rating:{
        type:Number,
        min:0,
        max: 5
    },
    createdAt:{
        type:Date,
        default: Date.now()
    },
    like:{
        type:Number,
        default:0
    },
    reviewby:{
             type:Schema.Types.ObjectId,
              ref:"User"
    },
    image:{type:String}
})
module.exports = mongoose.model("Review",review);