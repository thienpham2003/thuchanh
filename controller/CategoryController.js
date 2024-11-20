import { getAllCategories } from '../Model/categoryModel';

export const showAllCategories = async (req, res) => {
    const user = req.session.user;
    const categories = await getAllCategories();
    res.render('home', {data: {title: 'Trang Loại sp', content : 'nội dung trang Trang Loại sp', page:'categories', user, categories}});
  };
