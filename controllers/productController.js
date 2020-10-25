const Product = require('../models/productModal');

const { getPostData } = require('../utils');

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(products));
    } catch(error) {
        console.log(error);
    }
}

// @desc Gets Single Product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(product));
    } catch(error) {
        if (error.message === 'product not found') {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end(JSON.stringify(error));
        }
    }
}

// @desc create Product
// @route POST /api/products
async function createProduct(req, res) {
    try {

        const body = await getPostData(req);

        const { title, description, price } = JSON.parse(body);

        const product = {
            title,
            description,
            price
        };

        const newProduct = await Product.create(product);
        res.writeHead(201, {'Content-Type': 'application/json'});
        return res.end(JSON.stringify(newProduct));

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProduct,
    createProduct
};