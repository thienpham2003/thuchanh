// controllers/userController.js
import UserModel from "../model/UserModel.js"
import bcrypt from 'bcrypt';

// Controller để lấy danh sách người dùng
const loginuser = async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findByUsername(username);
  if (!user) {
    return res.render('login', {
      message: 'Tai khoan khong ton tai'
    })

  }
  const checkPass = await bcrypt.compare(password, user.password);
  if (!checkPass) {
    return res.render('login', {
      message: 'Mat khau khong chinh xac'
    })
  }
  req.session.user = {
    id: user.id,
    username: user.username,
  };
  return res.redirect('/');
}
const getLogin = (req, res) => {
  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng tới trang khác
  if (req.session.user) {
      return res.redirect('/listuser');
  }

  // Hiển thị form login với biến message trống (null) nếu không có lỗi
  return res.render('login', { message: null });
};
const createUser = async (req, res) => {
  const { username, hashedPassword, confirmPassword, fullname, address, sex, email } = req.body;

  // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
  if (hashedPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Mật khẩu không khớp' });
  }

  try {
      // Băm mật khẩu
      const hashed = await bcrypt.hash(hashedPassword, 10);

      // Lưu người dùng vào cơ sở dữ liệu
      const userId = await UserModel.createUser(username, hashed, fullname, address, sex, email );
      return res.redirect('/listuser');
  } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Lỗi khi lưu người dùng vào cơ sở dữ liệu' });
  }
};
const getAllUsers = async (req, res) => {
  let userList = await UserModel.getAllUsers();
  // Gửi thông tin đến view
  res.render('home', {
    data: {
      title: 'List User',
      page: 'listuser',
      rows: userList

    }
  });
};

export default { getAllUsers , loginuser,getLogin, createUser };
