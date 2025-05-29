const { resolveInclude } = require("ejs");
let express =require ("express");
const geolib = require('geolib');
let Listing =require("../module/listing.js")
const router = express.Router();



async function findNearbyListings(req) {
    try {
        const longitude = parseFloat(req.headers.longitude);
        const latitude = parseFloat(req.headers.latitude);
        const radius = 1000000; // 100 km in meters

        // Retrieve all listings
        const listings = await Listing.find({});

        // Filter listings within 100 km
        const nearbyListings = listings.filter(listing => {
            const distance = geolib.getDistance(
                { latitude: listing.latitude, longitude: listing.longitude },
                { latitude, longitude }
            );
// console.log(distance +"    "+radius );


            return distance <= radius;
        });
    
    //   console.log(nearbyListings);
      
        return nearbyListings;

    } catch (error) {
        console.error('Error finding nearby listings', error);
        throw error; 
    }
}

// Example usage in an Express.js route
router.get("/location", async (req, res) => {
    try {
        const nearbyListings = await findNearbyListings(req);
        res.json(nearbyListings);
    } catch (error) {
        res.status(500).send('An error occurred');
    }
});

router.get("/allthingnext/:val", async(req,res)=>{
   if(req.headers['referer']=="http://localhost:3000/allthing/listings/filter"){
    return;
   }
     
    try {      
        const entries = await Listing.find()
            .skip(req.params.val) 
            .limit(10) // Limit to 10 entries
            .populate({path:"reviews",populate:{path:"reviewby"}}).exec(); // Execute the query
           
            res.status(200).send(entries);
     //   console.log('Entries from 10 to 20:', entries);
    } catch (error) {
        console.error('Error fetching entries:', error);
    }



    
})


module.exports=router;