

const AboutPage = (req, res) => {
    return res.render("home",{
        data:{
            title: "about",
            page: "about",
        }
    });
}
export {AboutPage}