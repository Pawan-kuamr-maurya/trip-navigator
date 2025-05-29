const { resolveInclude } = require("ejs");
let express =require ("express");
let {contribute_get,contribute_post,delete_post}= require("../controler/contribute");
const router = express.Router();
router.get("/",contribute_get)
router.post("/",contribute_post);
router.get("/delete/:id",delete_post)
module.exports=router;