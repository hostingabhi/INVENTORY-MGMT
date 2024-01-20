import express from 'express';
import ProductCotroller from './src/controllers/product.controller.js';
import ejsLayouts from 'express-ejs-layouts'
import path from 'path'
import validationMiddleware from './src/middlewares/validation.middleware.js';
import { uploadFile } from './src/middlewares/file-upload.middleware.js';
import UserController from './src/controllers/user.controller.js';
import session from 'express-session';
import { auth } from './src/middlewares/auth.middleware.js'
import cookieParser from 'cookie-parser';
import { setLastVisit } from './src/middlewares/lastVisit.middleware.js';
const port = 3300;

const server = express();

server.use(express.static('public'));
server.use(express.static('src/views'));
//CookieParser
server.use(cookieParser());
// server.use();

//session
server.use(session({
    secret:'1JOEc4zNRKVXNACrCDR2ACX4AHNJZ3UZ',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false },
}))

//parse form data
server.use(express.urlencoded({extended: true}));

//setup view engine setting
server.set("view engine","ejs")
server.set("views",path.join(path.resolve(),'src','views'))

//use layouts
server.use(ejsLayouts)
//create an instance of product controller
const productCotroller = new ProductCotroller();
const userController = new UserController();

server.get('/', auth, setLastVisit,  productCotroller.getProducts);
server.get('/new', auth, productCotroller.getAddForm);
server.get('/update-product/:id', auth, productCotroller.getUpdateProductView);
server.post('/', auth,  uploadFile.single('imageUrl'), validationMiddleware, productCotroller.addNewProduct);
server.post('/update-product', auth, productCotroller.postUpdateProduct)
server.post("/delete-product/:id", auth, productCotroller.deleteProduct)
//user controller routes
server.get('/register',userController.getRegister);
server.post('/register', userController.postRegister);
server.get('/login',userController.getLogin);
server.post('/login', userController.postLogin);
server.get('/logout',userController.logout)



server.listen(port,()=>{
    console.log(`Server is listennin at http://localhost:${port}`);
});