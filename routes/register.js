const express = require('express');
const router = express.Router();
const { userRegister, userLogin, secret, adminCheck, updateProfile} = require('../controllers/register')
const { loginRequired, isAdmin} = require('../middleware/auth.js');


router.post('/register', userRegister);
router.post('/login', userLogin);
router.get('/login-check', loginRequired, (req, res) => {
  res.json({
    "ok": true
  })
})
router.get('/admin-checkout',loginRequired, isAdmin, adminCheck)

// test
router.get('/secret', loginRequired, isAdmin, secret)
// profile update
router.put('/profile', loginRequired, updateProfile);


module.exports = router;