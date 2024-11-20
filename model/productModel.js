// productModel.js
import pool from 'mysql2/promise';
import connection from '../configs/connectDB';


const getAllProducts = async () => {
  const [rows, fields] = await connection.execute('SELECT * FROM product');
  return rows;
};

const getProductById = async (id) => {
  const [rows] = await connection.execute('SELECT * FROM product WHERE product_id = ?', [id]);
  return rows[0];
};

const getProductsByCategory = async (categoryId) => {
  const [rows] = await connection.execute('SELECT * FROM product WHERE category_id = ?', [categoryId]);
  return rows;
};
export default {
   getAllProducts, 
   getProductById, 
   getProductsByCategory 
  };
