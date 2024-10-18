const ContactController = (req, res) => {
    return res.render("contact", {
        header: "header.ejs",
        footer: "footer.ejs",
    });
};
export { ContactController }