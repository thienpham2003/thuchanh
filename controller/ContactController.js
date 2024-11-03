const ContactPage = (req, res) => {
    return res.render("home",{
        data:{
            title: "contact",
            page: "contact",
        }
    });
}
export {ContactPage}