// controllers/userController.js
import UserModel from "../model/UserModel.js"
import bcrypt from 'bcrypt';

// Controller để lấy danh sách người dùng
const loginUser = async (req, res) => {
  const { username, password } = req.body;
  // let message = req.query.message || null;  
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
  return res.redirect('/detailuser');
}

const getLogin = (req, res) => {
  let message = req.query.message || null; 
  
  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng tới trang khác
  if (req.session.user) {
    return res.redirect('/listuser');
  }

  // Hiển thị form login với biến message trống (null) nếu không có lỗi
  return res.render('login', { successMessage: message });
};
let logoutUser = (req, res) => {
  req.session.destroy();
  res.redirect('/getlogin');
}
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
    const userId = await UserModel.createUser(username, hashed, fullname, address, sex, email);
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
// const register = (req, res) => {
//   res.render('home', {
//     data: {
//       title: 'Register',
//       page: 'register',
//     }
//   });
// }

// controllers/userController.js
const registerUser = async (req, res) => {
  const { username, password, confirmPassword, fullname, address, sex, email, role } = req.body;

  // Kiểm tra nếu mật khẩu và xác nhận mật khẩu khớp
  if (password !== confirmPassword) {
    return res.render('register', { message: 'Mật khẩu không khớp' });
  }

  try {
    // Kiểm tra nếu tên người dùng đã tồn tại
    const existingUser = await UserModel.findByUsername(username);
    if (existingUser) {
      return res.render('register', { message: 'Tên người dùng đã tồn tại' });
    }

    // Mặc định role là 'user', nếu người dùng có quyền admin thì có thể chọn role khác
    let userRole = 'user';  // Mặc định là 'user'
    
    // Kiểm tra nếu người dùng đang đăng ký có quyền admin (dựa trên session)
    if (req.session.user && req.session.user.role === 'admin') {
      // Nếu admin có thể chỉ định 'role' là admin từ form
      userRole = role || 'user'; // Nếu không có giá trị 'role' từ form, mặc định là 'user'
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo người dùng mới với thông tin đăng ký
    await UserModel.createUser(username, hashedPassword, fullname, address, sex, email, userRole);
    
    // Đăng ký thành công, chuyển hướng đến trang đăng nhập
    return res.redirect("/?message=Đăng ký tài khoản thành công.");
    
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).render('register', { message: 'Lỗi khi lưu người dùng vào cơ sở dữ liệu' });
  }
};

const getRegister = (req, res) => {
  let message = req.query.message || null; 
  // Kiểm tra nếu người dùng đã đăng nhập, chuyển hướng tới trang khác
  if (req.session.user) {
    return res.redirect('/');
  }

  // Hiển thị form đăng ký với biến message trống (null) nếu không có lỗi
  return res.render('register', { succesMessage: message });
};


let getDetailUser = async (req, res) => {
  let username = req.session.user.username;
  // let message = req.query.message || null;
  let dataUser = await UserModel.getUsername(username);
  return res.render("detailUser", {
    user: dataUser,
    // session: req.session.user,
    // successMessage: message,
});
}

let deleteUserById = async (req, res) => {
  let { userId } = req.body;
  await UserModel.deleteUserById(userId);
  if(req.session.user && req.session.user.username) {
    req.session.destroy();
    return res.redirect("/?message=Xóa người dùng thành công.");
  }

  // if (req.session.user && req.session.user.role === "admin") {
  //     return res.redirect("/list-user?message=Xóa người dùng thành công.");
  // }
  // if (req.session.user && req.session.user.role === "user") {
  //     req.session.destroy();
  //     return res.redirect("/login?message=Xóa người dùng thành công.");
  // }
};
let getupdateUser = async (req, res) => {
  let { userId } = req.query;
  let dataUser = await UserModel.getUserById(userId);

  return res.render("editUser", {
    user: dataUser,
    message: "Welcome to the edit user page", // Truyền biến `message`
  });
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { fullname, address, sex, email } = req.body;
  try {
      const result = await userModel.updateUserById(userId, fullname, address, sex, email);
      if (result.affectedRows > 0) {
          // Nếu không muốn chuyển hướng, bạn có thể gửi một thông báo
          res.redirect("/detailUser?message=Cập nhật thành công");

      } else {
          return res.status(400).send('Failed to update user');
      }
  } catch (error) {
      console.error(error);
      return res.status(500).send('Server error');
  }
};



export default { getAllUsers, loginUser, getLogin, logoutUser, createUser, registerUser, getRegister, getDetailUser, deleteUserById,updateUser,getupdateUser };
