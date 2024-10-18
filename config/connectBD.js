const mysql = require('mysql2');

// Tạo kết nối đến cơ sở dữ liệu
const pool = mysql.createPool({
  host: 'localhost',  // Địa chỉ host của MySQL
  user: 'root',       // Tên người dùng MySQL
  password: '', // Mật khẩu của MySQL
  database: 'NguoiDung ' // Tên database muốn kết nối
});

// Kết nối đến MySQL
pool.getConnection((err,connection) => {
  if (err) {
    console.error('Lỗi kết nối đến MySQL:', err);
    return;
  }
  console.log('Kết nối thành công!');
  connection.release(); 
});

