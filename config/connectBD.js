import mysql2 from 'mysql2';  

// Tạo kết nối đến cơ sở dữ liệu
const pool = mysql2.createPool({
  host: 'localhost',  // Địa chỉ host của MySQL
  user: 'root',
  database: 'nguoidung',       // Tên người dùng MySQL
  password: '', // Mật khẩu của MySQL
});

const connection = pool.promise();

export default connection ; 