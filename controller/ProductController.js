const { Product, ProductDetails } = require("../model/productSchema");

// Controller for add product
const addProduct = async (req, res, next) => {
  try {
    const {image, name, price, quantity, consumed, mfgName, mfgAddress } = req.body.body;

    if (!name || !price || !quantity || !consumed || !mfgName || !mfgAddress) {
      return res.status(401).json("Please fill all the fields");
    } else {
      const addingProduct = new Product({
        image,
        name,
        price,
        quantity,
        consumed,
      });
      // Product.create({image: image});

      if(req.file){
        addingProduct.image = req.file.path
      }

      const addingProducts = await addingProduct.save();
      // res.status(201).json({ success: "Successfull registered" });

      const addingDetail = new ProductDetails({
        _id: addingProducts._id,
        productID: addingProducts._id,
        mfgName,
        mfgAddress
      });

      const addingDetails = await addingDetail.save();
      res.status(201).json({ success: "Product Add Successfully" });
    }
  } catch (e) {
    res.status(400).send(e);
  }
};

// Controller for product listing
const productListing = async (req, res, next) => {
  try {
    const products = await Product.find().populate("productDetails").exec();
    // const products = await Product.find().populate({
    //   path: "productDetails", // Assuming "productDetails" is the field referencing the "ProductDetails" documents
    //   // Assuming "productDetails" is an array of references, use the "populate" method to populate each element
    //   populate: {
    //     path: "productID",
    //   },
    // });
    console.log(products);
    res.send(products);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Controller for product details
const productDetails = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const product = await Product.findOne({ _id: _id }).populate("productDetails").exec();
    // const productDetails = await ProductDetails.findById({ _id: _id });
    res.send(product);
  } catch (e) {
    res.status(400).send(e);
  }
};

// Controller for delete product
const deleteProduct = async (req, res) => {
  try {
    const _id = req.params.id;
    const deleteProducts = await Product.findByIdAndDelete({_id: _id});
    const productDetails = await ProductDetails.deleteOne({ productID: deleteProducts._id });
    res.send(productDetails);
  } catch (e) {
    res.status(500).send(e);
  }
};

// Controller for update product
const updateProduct = async (req, res) => {
  // console.log(req.body);
  try {
    const _id = req.params.id;
    const getData = await Product.findByIdAndUpdate(_id, req.body.body);
    console.log(getData);
    const getProductDetails = await ProductDetails.findOneAndUpdate({productID: getData._id}, req.body.body );
    res.send(getProductDetails);
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  productListing,
  addProduct,
  deleteProduct,
  productDetails,
  updateProduct
};
