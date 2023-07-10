const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
    },
    price: {
        type: String,
        required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    consumed: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    productDetails: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductDetail',
    }]
})

const productDetailsSchema = new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: false
    },
    mfgName: {
        type: String,
        required: true,
    },
    mfgAddress: {
        type: String,
        required: true,
    }
});

const Product = mongoose.model('Product',productSchema)

const ProductDetails = mongoose.model('ProductDetail', productDetailsSchema);

module.exports = {
    Product, ProductDetails
}