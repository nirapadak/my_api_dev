const mongoose = require('mongoose');
const { Schema } = mongoose
const { ObjectId } = mongoose.Schema

const OrderModel = new Schema({
  products: [{
    type: ObjectId,
    ref: "Product",
  }],
  payment: {},
  buyers: [{ type: ObjectId, ref: "Users" }],
  status: {
    type: String,
    default: "no Processing",
    enum: [
      'no Processing',
      'processing',
      'complete',
      'pending',
      'shipping',
      'delivered',
      'Canceled'
    ]
  },


}, {
  timestamps: true,
  versionKey: false
})

const OrdersModel = mongoose.model("order", OrderModel);
module.exports = OrdersModel;