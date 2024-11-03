// models/userModel.js
import e from 'express';
import pool from '../config/connectBD.js';
import connection from '../config/connectBD.js';
const createUser = async (username, password, fullname, address, sex, email) => {
  const [result] = await connection.execute(
      'INSERT INTO user (username, password, fullname, address, sex, email) VALUES (?, ?, ?, ?, ?, ? )',
      [username, password, fullname, address, sex, email ]
  );
  return result.insertId; // Trả về ID của bản ghi mới được chèn
};
const findByUsername = async (username) => {
  const [rows] = await connection.execute('SELECT * FROM user WHERE username = ?', [username]);
  return rows[0];
}
const getAllUsers = async () => {
  const [rows, fields] = await pool.execute('SELECT * FROM user')
  return rows
} 

export default {getAllUsers , findByUsername , createUser};
