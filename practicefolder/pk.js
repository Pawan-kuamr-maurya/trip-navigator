const express = require("express");
const session=require("express-session")
const path = require('path');
const multer  = require('multer')
//const upload = multer({ dest: 'uploads/' })
const app= express();
app.use(express.static("uploads"));

const storage = multer.diskStorage({
               destination: function (req, file, cb) {cb(null, path.resolve(__dirname, '../public/image'))},
               filename: function (req, file, cb) { cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({
                 storage: storage,
                 limits: { fileSize: 5 * 1024 * 1024 }, // 5MB in bytes
                 fileFilter: (req, file, cb) => {
                                 const filetypes = /jpeg|jpg|png|gif/;
                                 const mimetype = filetypes.test(file.mimetype);
                                 const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb('Error: File upload only supports images of type: jpeg, jpg, png, gif');
        }
    }
}).single('image'); 
app.use(session({secret:"psy",resave:false,saveUninitialized:true})); 
app.get("/",(req,res)=>{
    
//     res.send(`<audio controls>
//     <source src="./8504277adfb372a5cc0ff69a8a076635" type="audio/ogg">
   
//     Your browser does not support the audio element.
//   </audio>`)
    res.send(`
        <form action="/upload" method="POST" enctype="multipart/form-data">
            <input type="file" name="image"  />
               <input type="text" name="nameof"  />
            <button type="submit">Upload Image</button>
        </form>
    `);

})

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            return res.send(err);
        }
        if (!req.file) {
            return res.send('Error: No file selected');
        }
        // Successfully uploaded; send the file name in response
        res.send(`Image uploaded successfully: ${req.file.filename}`);
    });
});
app.listen(8080,()=>{
    console.log("run");
    
})