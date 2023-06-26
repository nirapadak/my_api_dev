const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "customer",
    enum: ['customer', 'Admin', 'employee']
  },
  password: {
    type: String,
    required: true
  }
},{
  timestamps: true, versionKey: false,
})

const User = mongoose.model('User', userSchema);
module.exports = User;