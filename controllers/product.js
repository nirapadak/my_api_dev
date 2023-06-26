const fs = require('fs');
const product = require('../models/product.js');
const slugify = require('slugify');




exports.createProduct = async (req, res) => {
  try {
    console.log(req.fields);
    console.log(req.files);
    const { name, description, price, category, quantity, shipping } = req.fields;
    const { photo } = req.files;
    console.log("PHOTO=======>", photo);

    // validation
    switch (true) {
      case !name?.trim():
        return res.json({ "msg": "name is required" });
      case !description?.trim():
        return res.json({ "msg": "description is required" });
      case !price?.trim():
        return res.json({ "msg": "price is required" });
      case !quantity?.trim():
        return res.json({ "msg": "quantity is required" });
      case !shipping?.trim():
        return res.json({ "msg": "shipping is required" });
      case !category?.trim():
        return res.json({ "msg": "category is required" });
      case photo && photo.size > 1000000:
        return res.json({ "msg": "photo is too large" });
    }
    // console.log(...req.fields)
    const Product = new product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      Product.photo.data = fs.readFileSync(photo.path);
      Product.photo.contentType = photo.type
    }

    await Product.save();
    res.json(Product)


  } catch (error) {
    res.json({
      'msg': "this is error",
      error: error.message
    })
  }
}