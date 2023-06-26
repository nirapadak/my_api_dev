const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.loginRequired = (req, res, next) => {
  try {
    const decoded = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    req.user = decoded;
    next();
  } catch (error) {
    res.json({
      'msg': `please login error: ${error.message}`
    })
  }
}

exports.isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);
        if (user.role !== "Admin") {
            return res.status(401).send("Unauthorized");
        } else {
            next();
        }
    } catch (err) {
      console.log(err);
      res.json({
        'msg': err.message
      })
    }
};