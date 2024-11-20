//apiProductController.js
import { getAllProducts, getProductById,getProductsByCategory  } from '../Model/productModel';

const showAllProducts = async (req, res) => {
  try {
    const products = await getAllProducts();
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      result: products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      errCode: 0,
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const showProductDetail = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({
        errCode: 0,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      errCode: 1,
      message: "Show Product Detail Success",
      result: product,
    });
  } catch (error) {
    console.error("Error fetching product details:", error);
    return res.status(500).json({
      errCode: 0,
      message: "Failed to fetch product details",
      error: error.message,
    });
  }
};
const showProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;  // Get categoryId from URL params
    console.log("Fetching products for category ID:", categoryId);  // Log category ID
    
    const products = await getProductsByCategory(categoryId);  // Fetch products by category
    
    if (!products || !products.length) {
      console.log("No products found for category ID:", categoryId);  // Log if no products found
      return res.status(404).json({
        errCode: 0,
        message: "No products found for this category",
      });
    }

    console.log("Found products:", products);  // Log the products that were fetched
    
    return res.status(200).json({
      errCode: 1,
      message: "Success",
      result: products,
    });
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return res.status(500).json({
      errCode: 0,
      message: "Failed to fetch products by category",
      error: error.message,
    });
  }
};

export { showAllProducts, showProductDetail,showProductsByCategory };
