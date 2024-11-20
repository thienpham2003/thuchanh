import { getAllCategories } from '../Model/categoryModel';

export const showAllCategories = async (req, res) => {
  try {
    const categories = await getAllCategories();
    return res.status(200).json({
      errCode: 1,
      message: "Show List categories Success",
      result: categories,
    });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return res.status(500).json({
      errCode: 0,
      message: "Failed to fetch categories",
      error: error.message,
    });
  }
};
