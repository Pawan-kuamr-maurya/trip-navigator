    const mongoose = require("mongoose")
    const Schema = mongoose.Schema;
    const listinsgSchema= new mongoose.Schema({
        title:{type:String,required:true},
        description:String,
        image:{type:String,default:"https://www.shutterstock.com/image-photo/nice-green-forest-landscape-city-600nw-2166501331.jpg"},
        ticketPrice:Number,
        location:String,
        longitude:Number,
        latitude:Number,
        state:String,
        reviews:[
            {
                type:Schema.Types.ObjectId,
                ref:"Review"
            }
        ],
        owner:{
            type:Schema.Types.ObjectId,
            ref:"User"
        },
        category:{
            type:String,
            enum:["Temple", "Beach", "Hill Station", "Water Park", "Fort", "National Park", "Historical Site", "Museum", "Wildlife Sanctuary", "Adventure Park", "Cultural Village", "Scenic Viewpoint", "Amusement Park", "Botanical Garden", "Lakeside Resort", "Cave", "Stadium", "Aquarium", "Mountain Range",  "Street Market", "Art Gallery", "Theme Park", "Nature Reserve", "Skyscraper Observation Deck", "Monument", "Hot Springs", "Zoological Park"]
        },
        timestamp: { type: Date, default: Date.now },
        highlight:{
            istrue:Boolean,
            whatspeacial:String
        }
        })

    const Listing= mongoose.model("listing",listinsgSchema)
   module.exports=Listing;


   //sayad REview ko import karna rah raha hai
//    Temple 
// Beach 
// Hill Station 
// Water Park 
// Fort 
// National Park 
// Museum 
// Wildlife Sanctuary
// Historical Site 
// Adventure Park 
// Cultural Village 
// Scenic Viewpoint 
// Amusement Park 
// Botanical Garden 
// Lakeside Resort 
// Cave 
// Stadium 
// Aquarium 
//market
// Spa and Wellness Center 
// Mountain Range or Peak - High geographic features offering hiking, climbing, and mountaineering experiences.