import path from 'path'
import ProductModel from '../models/product.model.js'
import { error } from 'console'

export default  class ProductCotroller{
    getProducts(req, res){
        var products = ProductModel.get()
        res.render("products",{products:products, userEmail: req.session.userEmail})
        // return res.sendFile(path.join(path.resolve(),'src','views','products.ejs'))
    }

getAddForm(req, res) {
    return res.render('new-product', {errorMessage:null, userEmail: req.session.userEmail});
}

addNewProduct(req,res, next){
    
    //acess data from form
    const {name, desc, price} =  req.body;
    const imageUrl = 'images/'+ req.file.filename;
    ProductModel.add(name, desc, price, imageUrl);
    var products = ProductModel.get()
    res.render('products',{products, userEmail: req.session.userEmail})
}

getUpdateProductView(req, res, next){
    //1. if product exists then return view
        const id = req.params.id;
        console.log(id);
        const productFound = ProductModel.getById(id);
        if(productFound){
            res.render('update-product',{product:productFound, errorMessage:null, userEmail: req.session.userEmail});
        }
    //2. else return error.
        else{
            res.status(401).send('Product not found');
        }
    }
    postUpdateProduct(req, res){
        ProductModel.update(req.body)
        let products = ProductModel.get()
        res.render('products',{products, userEmail: req.session.userEmail})

    }
    deleteProduct(req,res){
        const id= req.params.id;
        const productFound = ProductModel.getById(id);
        if(!productFound){
            return res.status(401).send("Product not found");
        }
        ProductModel.delete(id);
        var products = ProductModel.get()
        res.render('products', {products, userEmail: req.session.userEmail});
    }
}