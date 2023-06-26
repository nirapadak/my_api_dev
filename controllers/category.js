const category = require('../models/category.js');
const slugify = require('slugify');

exports.categoryCreate = async (req, res) => {
  try {
    const { name } = req.body
    if (!name.trim()) {
      return res.json({
        "msg": "please provide your name"
      })
    }

    const existingCategory = await category.findOne({ name });
    if(existingCategory){
      return res.json({
        'msg': 'category already exists',
      })
    }


    const Category = await category({ name, slug: slugify(name) }).save();
    
    res.json({Category})


  } catch (error) {
    res.json({
      error: error.message,
    'msg': "this is error"});
  }
}

// category update

exports.categoryUpdate = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(req.params);
    const { categoryId } = req.params
    

    const Category = await category.findByIdAndUpdate(
      categoryId,
      {
        name,
        slug: slugify(name),
      },
      {
        new: true
      }
    )

    res.json({Category})


  } catch (error) {
    res.json({
      "msg": "this is error",
      error: error.message
    })
  }
}

// category delete 
exports.remove = async (req, res) => {
  try {
    const removeCategory = await category.findByIdAndDelete(req.params.categoryId);
    res.json({ removeCategory });
  } catch (error) {
    console.log(error);
    res.json({
      "msg": "remove category error",
      error: error.message
    })
  }
}

exports.findAll = async (req, res) => {
  try {
    const all = await category.find({});
    res.json({ all });
  } catch (error) {
    console.log(error);
    res.json({error: error.message})
  }
}

exports.slugReade = async (req, res) => {
  try {
    const slug = await category.findOne({ slug: req.params.slug });
    res.json({ slug });
  } catch (error) {
    console.log(error);
    res.json({error: error.message});
  }
}