// controllers/userController.js
const UserModel = require('../model/UserModel');

// Controller để lấy danh sách người dùng
const getUsers = (req, res) => {
  UserModel.getAllUsers((err, users) => {
    if (err) {
      return res.status(500).send('Lỗi khi lấy danh sách người dùng');
    }
    // Trả về view userView với dữ liệu là danh sách người dùng
    res.render('userView', { users });
  });
};

module.exports = {
  getUsers
};
export {UserModel};
