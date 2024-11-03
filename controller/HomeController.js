
const getHomePage =(req, res) =>{
    return res.render("home",{
        data: {
            title: "Home",
            page: "main",
        }
    })
    
}
// const HomeController =(req, res) =>{
//     return res.render("main",{
//         header: "header.ejs",
//         footer: "footer.ejs",

//     })
//     }   


export default  { getHomePage}