import express from 'express'
const router = express.Router();
import { HomeController} from '../controller/HomeController.js';
import { AboutController} from '../controller/AboutController.js';
import { ContactController} from '../controller/ContactController.js';
import {UserModel} from '../controller/UserController.js';

const initWebRoutes = (app) => {
   router.get("/", (req, res) => {
       HomeController(req, res)
   });
   router.get("/about", (req, res) => {
    AboutController(req, res)
});
router.get("/contact", (req, res) => {
    ContactController(req, res)
});
router.get("/user", (req, res) => {
    usserModel(req, res)
});

}
export default initWebRoutes