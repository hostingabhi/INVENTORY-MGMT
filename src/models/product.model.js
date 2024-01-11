export default class ProductModel{
    constructor(_id, _name, _desc, _price, _imageUrl){
        this.id= _id
        this.name = _name
        this.desc = _desc
        this.price = _price
        this.imageUrl = _imageUrl
    }
    static get(){
        return products

    }
    static update(productObj){
        const index = products.findIndex((p)=> p.id == productObj.id);
        products[index] = productObj;
    }
    static add(name, desc, price, imageUrl){
        let newProduct = new ProductModel(
            products.length+1, 
            name, 
            desc, 
            price, 
            imageUrl)
        products.push(newProduct)
    }

    static getById(id){
        return products.find((p)=> p.id == id);
    }
    static delete(id){
        const index = products.findIndex((p)=> p.id == id);
        products.splice(index, 1);
    }
}

var products = [
    new ProductModel(1, 'Product 1', 'Description for Product 1', 19.99, 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/5165He67NEL._SY445_SX342_.jpg'),
    new ProductModel(2, 'Product 2', 'Description for Product 2', 29.99, 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/81Wbfijio4L._SY385_.jpg'),
    new ProductModel(3, 'Product 3', 'Description for Product 3', 39.99, 'https://m.media-amazon.com/images/W/MEDIAX_792452-T2/images/I/51COxWxryWL._SY445_SX342_.jpg')
]