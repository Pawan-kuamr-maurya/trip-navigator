document.querySelector(".filtershape").addEventListener("click",()=>{
    console.log("click");
    document.querySelector(".cat").classList.toggle("cathide")
    
})


document.querySelector(".btn-outline-success").addEventListener("click",(e)=>{
    

    document.querySelector(".userdetail").classList.toggle("display-none");
})