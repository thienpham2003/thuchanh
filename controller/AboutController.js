

const AboutController = (req, res) => {
    return res.render("about", {
        header: "header.ejs",
        footer: "footer.ejs",
    });
}
export {AboutController}