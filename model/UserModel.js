// models/userModel.js
const pool = require('../config/connectBD');


// Hàm để lấy tất cả người dùng từ cơ sở dữ liệu
const getAllUsers = (callback) => {
    pool.query('SELECT * FROM users', (err, results) => {
      if (err) {
        return callback(err);
      }
      callback(null, results);
    });
  };
  
// Export các hàm
module.exports = {
  getAllUsers,
  
};      
export {getAllUsers};
