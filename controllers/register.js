const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.userRegister = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;
    if (!name.trim()) {
      return res.send("name is required");
    }
    if (!email) {
      return res.send("email is required");
    }
    if (!password || password.length < 6) {
      return res.send("password is required and password must be at least 6 characters");
    }

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.send("email is already in use please try again and to anther email");
    }

    const hashedPassword = await hashPassword(password);

    const user = await new User({
      name: name,
      email: email,
      role: role,
      password: hashedPassword
    }).save();

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d"
    })


    res.json({
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
    })

  } catch (error) {
    res.json({
      error: error.message
    })
  }
}


// login routes controller -------------

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email) {
      return res.send("please enter your email address");
    }
    if(!password || password.length < 6){
      return res.send("password is required and password must be at least 6 characters");
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.send("invalid email address please try again");
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.send('invalid password');
    }

  

    const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    })

    res.json({
      'success': true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role
      },
      token,
    })

  } catch (error) {
    res.json({
      "msg": `login failed : ${error.message}` 
    })
  }
}
// admin check
exports.adminCheck = (req, res) => {
  res.json({
    "success": true
  })
}


// secret router
exports.secret = async (req, res) => {
  // console.log(req.user)
  res.json({
    currentUser: req.user
  })
}

// profile update
exports.updateProfile = async (req, res) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findById(req.user._id);
    if (password && password.length < 6) {
      return res.json({
        'msg': 'Password must be at least 6 characters'
      })
    }

    const hashedPassword = password ? await hashPassword(password) : undefined;

    const updateUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        email: email || user.email,
        password: hashedPassword || user.password,
      },
      {
        new: true
      }
    )

    updateUser.password = undefined;
    updateUser.role = undefined;
    res.json({updateUser})

  } catch (error) {
    return res.json({"msg": error})
  }
}