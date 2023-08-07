const express = require('express');
const router = express.Router();
const productController = require('../../components/products/ProductController');
const CONFIG = require('../../config/config');
const { authenApp } = require('../../middle/Authen');
const upload = require('../../middle/UploadFile');
//http://localhost:3000/api/product

//lấy danh sách sản phẩm
//http://localhost:3000/api/product
router.get('/', async (req, res, next) => {
    try {
        const products = await productController.getAllProducts();
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({});
    }

});

//http://localhost:3000/api/product/:id
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const products = await productController.getProductById(id);
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({});
    }

});

//thêm sản phẩm
//http://localhost:3000/api/product
router.post('/', async (req, res, next) => {
    try {
        const { name, price, quantity, image, category } = req.params;
        await productController.addNewProduct(name, price, quantity, image, category);
        return res.status(200).json({ result: true });
    } catch (error) {
        return res.status(400).json({ result: false });

    }

});

//tìm kiếm sản phẩm
//http://localhost:3000/api/product/search/name?keyword=abc
router.get('/search/name', async (req, res, next) => {
    try {
        const { keyword } = req.query;
        const products = await productController.search(keyword);
        return res.status(200).json({ products });
    } catch (error) {
        console.log('Search product error: ', error);
        return res.status(500).json({});
    }

});


//upload hình ảnh lên sever
// http://localhost:3000/api/product/upload
router.post('/upload', [upload.single('image')], async (req, res, next) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ result: false });
        } else {
            const url = `${CONFIG.CONSTANTS.IP}:3000/${file.filename}`;
            return res.status(200).json({ result: true, url });
        }
    } catch (error) {
        console.log('Upload image error: ', error);
        return res.status(500).json({});
    }

});


module.exports = router;