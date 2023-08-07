const express = require('express');
const router = express.Router();

const categoryController = require('../../components/categories/CategoryController');
const productController = require('../../components/products/ProductController');
const uploadFile = require('../../middle/UploadFile');
const CONFIG = require('../../config/config');
const auth = require('../../middle/Authen');
// http://localhost:3000/cpanel/product


// http://localhost:3000/cpanel/product
// hiển thị trang danh sách sản phẩm
router.get('/', [auth.authenWeb], async (req, res, next) => {
    const products = await productController.getAllProducts();
    res.render('product/list', { products });
});

// http://localhost:3000/cpanel/product/:id/delete
// xóa sản phẩm theo id
router.get('/:id/delete', [auth.authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        await productController.deleteProductById(id);
        return res.json({ status: 'true' });
    } catch (error) {
        return res.json({ status: 'false' });
    }
});


// http://localhost:3000/cpanel/product/new
//hiển thị trang thêm mới sản phẩm
router.get('/new', [auth.authenWeb], async (req, res, next) => {
    try {
        const categories = await categoryController.getAllCategories();
        res.render('product/new', { categories });
    } catch (error) {
        next(error);
    }

});

// http://localhost:3000/cpanel/product/new
//xử lý thêm mới sản phẩm
router.post('/new', [auth.authenWeb, uploadFile.single('image'),], async (req, res, next) => {
    try {
        //ipconfig
        let { body, file } = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`;
            body = { ...body, image: image };
        }
        let { name, price, quantity, image, category } = body;
        //   image = 'https://thicc.mywaifulist.moe/pending/waifus/vk1qXyhh5FZ5PWyuRZ93ID2lRTXgLnkKJJYXc0o9.jpg';
        const a = await productController
            .addNewProduct(name, price, quantity, image, category);
        console.log(body);
        console.log(a);
        if (a) {
            return res.redirect('/cpanel/product');
        } else {
            return res.redirect('/cpanel/product/new');
        }

    } catch (error) {
        console.log('Add new product error: ', error);
        next(error);
    }

});

// http://localhost:3000/cpanel/product/:id/edit
//hiển thị trang cập nhật sản phẩm 
router.get('/:id/edit', [auth.authenWeb], async (req, res, next) => {
    try {
        const { id } = req.params;
        const product = await productController.getProductById(id);
        let categories = await categoryController.getAllCategories();
        for (let i = 0; i < categories.length; i++) {
            const element = categories[i];
            categories[i].selected = false;

            if (element._id.toString() == product.category.toString()) {
                categories[i].selected = true;
            }
        }
        res.render('product/edit', { product, categories });
    } catch (error) {
        next(error);
    }

});

// http://localhost:3000/cpanel/product/:id/edit
//xử lý cập nhật sản phẩm
router.post('/:id/edit', [auth.authenWeb, uploadFile.single('image'),], async (req, res, next) => {
    try {
        //ipconfig
        let { id } = req.params;
        let { body, file } = req;
        if (file) {
            let image = `${CONFIG.CONSTANTS.IP}/images/${file.filename}`;
            body = { ...body, image: image };
        }
        let { name, price, quantity, image, category } = body;
        //   image = 'https://thicc.mywaifulist.moe/pending/waifus/vk1qXyhh5FZ5PWyuRZ93ID2lRTXgLnkKJJYXc0o9.jpg';
        await productController
            .updateProduct(id, name, price, quantity, image, category);
        return res.redirect('/cpanel/product');
    } catch (error) {
        console.log('Update product error: ', error);
        next(error);
    }

});




module.exports = router;