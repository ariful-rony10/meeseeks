/**
 * Name: auth.controller.js
 * Description:
 */
const User = require('../models/user.model');

// GET signup page
const getSignupPage = (req, res) => {
  res.status(200).render('customer/auth/signup');
};
// POST signup page
const signup = async (req, res) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
  await user.signup();

  res.redirect('/login');
};
// POST login page
// GET login page
const getLoginPage = (req, res) => {
  res.status(200).render('customer/auth/login');
};

module.exports = {
  getSignupPage,
  getLoginPage,
  signup,
};
