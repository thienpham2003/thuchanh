import mysql from 'mysql2/promise';
import connection from '../configs/connectDB'

export const getAllCategories = async () => {
  const [rows] = await connection.execute('SELECT * FROM category');
  return rows;
};

