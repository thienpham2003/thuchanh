import express from 'express'

import { AboutPage} from '../controller/AboutController.js';
import { ContactPage} from '../controller/ContactController.js';
import UserController from '../controller/UserController.js';
import HomeController from '../controller/HomeController.js';
import checkLogin from '../middleware/auth.js';
import { createPool } from 'mysql2';
const router = express.Router();
const initWebRoutes = (app) => {
  router.get('/', HomeController.getHomePage);
  router.get('/about', AboutPage);
  router.get('/contact', ContactPage);
  // router.get('/listuser', UserController.getAllUsers);
  // router.get('/listuser',checkLogin, UserController.getAllUsers);
  router.get('/listuser', UserController.getAllUsers);
  router.post('/login',UserController.loginuser);
  router.get('/loginK', UserController.getLogin);
  router.post('/createUser',UserController.createUser);
  return app.use("/", router);

}
export default initWebRoutes