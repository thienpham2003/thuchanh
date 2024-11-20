// models/userModel.js
import e from 'express';
import pool from '../config/connectBD.js';
import connection from '../config/connectBD.js';
const createUser = async (username, password, fullname, address, sex, email, role = 'user') => {
  const [result] = await connection.execute(
      'INSERT INTO user (username, password, fullname, address, sex, email, role) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [username, password, fullname, address, sex, email, role] // Thêm role vào câu lệnh
  );
   // Trả về ID của bản ghi mới được chèn
};
const findByUsername = async (username) => {
  const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
  return rows[0];
}
const getAllUsers = async () => {
  const [rows, fields] = await pool.execute('SELECT * FROM user')
  return rows
}
let getUsername = async (username) => {
    let [rows, fields] = await pool.query(
        "SELECT * FROM user WHERE username = ?",
        [username]
    );
    return rows.length > 0 ? rows[0] : null;
}; 

let deleteUserById = async (id) => {
    return await pool.query("DELETE FROM user WHERE id = ?", [id]);
};
const getUserById = async (userId) => {
  const query = "SELECT * FROM user WHERE id = ?";
  const [rows] = await pool.execute(query, [userId]);
  return rows[0]; // Lấy user đầu tiên
};


const updateUserById = async (userId, userData) => {
  const { username, fullname, address, sex, email } = userData;
  const query = `
    UPDATE user
    SET username = ?, fullname = ?, address = ?, sex = ?, email = ?
    WHERE id = ?
  `;
  await pool.execute(query, [username, fullname, address, sex, email, userId]);
};




export default {getAllUsers , findByUsername , createUser, getUsername, deleteUserById, updateUserById,getUserById};
