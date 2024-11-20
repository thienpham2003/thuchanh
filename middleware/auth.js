const checkLogin = (req, res, next) => {
    if (req.session && req.session.user) {
        const { role } = req.session.user;

        if (role === 'admin') {
            res.redirect('/admin/user-list'); // Trang dành cho admin
        } else if (role === 'user') {
            res.redirect('/home'); // Trang dành cho user
        } else {
            res.redirect('/login'); // Nếu không rõ role, chuyển về trang login
        }
    } else {
        res.redirect('/login'); // Nếu chưa đăng nhập
    }
};

export default checkLogin;
