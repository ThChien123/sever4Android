


const categoryService =  require('./CategoryService');

const getAllCategories = async () => {   
    try {
        return await categoryService.getAllCategories();
    } catch (error) {
        throw error;
    }
};

module.exports = { getAllCategories };