

const HomeController =(req, res) =>{
    return res.render("main",{
        header: "header.ejs",
        footer: "footer.ejs",

    })
    }   


export  {HomeController}