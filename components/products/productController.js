

const productService = require('./productService');
const getAllProducts = async () => {
    try {
          return await productService.getAllProducts();
     //   return await productService.getAllProducts2();
    } catch (error) {
        throw error;
    }


};

const deleteProductById = async (id) => {
    try {
        return await productService.deleteProductById(id);
    } catch (error) {
        throw error;
    }
};
const addNewProduct = async (name, price, quantity, image, category) => {
    try {
        console.log('add param: ', name, price, quantity, image, category);
        return await productService.addNewProduct(name, price, quantity, image, category);
    } catch (error) {
        console.log('Add new product error: ', error);
        return false;
    }
};


const updateProduct = async (id, name, price, quantity, image, category) => {

    try {
        return await productService.updateProduct(id, name, price, quantity, image, category);
    } catch (error) {
        console.log('Update product error: ', error);
    }
};
const getProductById = async (id) => {
    try {
        console.log('Add param: ', id);
        return await productService.getProductById(id);
    } catch (error) {
        console.log('Get product by Id error: ', error);
    }
};

const search = async (keyword) => {
    try {
        return await productService.search(keyword);
    } catch (error) {
        console.log('Get product error: ', error);
    }
}

module.exports = { getAllProducts, deleteProductById, addNewProduct, updateProduct, getProductById, search };