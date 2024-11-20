import { getAllProducts, getProductById, getProductsByCategory } from '.../Model/productModel';
import { getAllCategories } from '../Model/categoryModel';

export const showProductsByCategory = async (req, res) => {
    const user = req.session.user;
    const categoryId = req.params.categoryId;
    const products = await getProductsByCategory(categoryId);
    res.render('home', {data: {title: 'Sản phẩm theo loại', content : 'Sản phẩm theo loại', page:'productsByCategory', user, products}});
};


export const showAllProducts = async (req, res) => {
    const products = await getAllProducts();
    res.render('products', { products });
};


export const showProductDetail = async (req, res) => {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).send('Product not found');
    
    res.render('productDetail', { product });
};
