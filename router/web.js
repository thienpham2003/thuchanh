import express, { Router } from 'express'
import { AboutPage } from '../controller/AboutController.js';
import { ContactPage } from '../controller/ContactController.js';
import UserController from '../controller/UserController.js';
import HomeController from '../controller/HomeController.js';
import checkLogin from '../middleware/auth.js';
import { createPool } from 'mysql2';
const router = express.Router();
// router.get('/register', (req, res) => {
//   res.render('register', { message: null });
// });
const initWebRoutes = (app) => {
  // router.get('/', HomeController.getHomePage);
  router.get('/', UserController.getLogin);
  router.get('/about', AboutPage);
  router.get('/contact', ContactPage);
  // router.get('/listuser', UserController.getAllUsers);
  router.get('/listuser', checkLogin, UserController.getAllUsers);
  router.get('/listuser', UserController.getAllUsers);
  router.post('/login', UserController.loginUser);
  router.get('/logout', UserController.logoutUser);
  // router.get('/', UserController.getLogin);
  // router.post('/createUser',UserController.createUser);
  router.get('/getregister', UserController.getRegister);
  router.post('/register', UserController.registerUser);
  router.get('/geteditUser', UserController.getupdateUser);
  router.post('/editUser', UserController.updateUser);
  router.post('/delete-user', UserController.deleteUserById);
  router.get('/detailUser', UserController.getDetailUser);
  router.get('/listuser', checkUserPermissions('view'), UserController.getAllUsers);



  router.get('/categories', showAllCategories);
  router.get('/products', showAllProducts);
  router.get('/products/category/:categoryId', showProductsByCategory);
  router.get('/products/:id', showProductDetail);



  return app.use("/", router);

}
export default initWebRoutes