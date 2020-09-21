const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate');

const productSchema = new Schema({
    productname: {
        type: String,
        required: true
    },
    unitOfMeasurement: {
        type: String,
        required: true  
    },
    price: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    }   
});
productSchema.plugin(mongoosePaginate);

module.exports = Product = mongoose.model('product', productSchema);