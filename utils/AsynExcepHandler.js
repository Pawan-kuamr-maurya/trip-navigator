module.exports =(fun)=>{
    console.log("SUCCESSFUL RUN");
    
    return  (req,res,next)=>{
        fun(req,res,next).catch(next);
    }
}