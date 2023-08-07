const categoryModel = require('./CategoryModel');

const getAllCategories = async () => {

  try {
    return await categoryModel.find();
  } catch (error) {
    console.log('Get all categories error: ', error);
  }
  return [];
}

module.exports = { getAllCategories };

var data = [{
  "_id": 1,
  "name": "Royal tern"
}, {
  "_id": 2,
  "name": "Cardinal, black-throated"
}, {
  "_id": 3,
  "name": "Neotropic cormorant"
}, {
  "_id": 4,
  "name": "Gull, lava"
}, {
  "_id": 5,
  "name": "Red-knobbed coot"
}, {
  "_id": 6,
  "name": "Skimmer, four-spotted"
}, {
  "_id": 7,
  "name": "Partridge, coqui"
}, {
  "_id": 8,
  "name": "Southern right whale"
}, {
  "_id": 9,
  "name": "Sambar"
}, {
  "_id": 10,
  "name": "Turkey, wild"
}]