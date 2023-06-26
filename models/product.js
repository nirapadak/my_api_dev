const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxLength: 220,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    descriptions: {
      type: {},
      trim: true,
      maxLength: 210,
    }, 
    price: {
      type: Number,
      trim: true,
      required: true
    },
    category: {
      type: ObjectId,
      ref: "category",
      required:true,
    },
    quantity: {
      type: Number,
    },
    sold: {
      type: Number,
      default: 0,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      required: false,
      type: Boolean,
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

const product = mongoose.model("Product", productSchema);
module.exports = product