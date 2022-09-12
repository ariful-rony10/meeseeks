/**
 * Name: auth.controller.js
 * Description:
 */
const User = require('../models/user.model');
const authUtil = require('../util/authentication');
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
const login = async (req, res) => {
  //login logics
  const user = new User(req.body.email, req.body.password);
  const existingUser = await user.getUserWithSameEmail();

  if (!existingUser) {
    res.redirect('/login');
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );
  if (!passwordIsCorrect) {
    res.redirect('/login');
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
};
// GET login page
const getLoginPage = (req, res) => {
  res.status(200).render('customer/auth/login');
};

module.exports = {
  getSignupPage,
  getLoginPage,
  signup,
  login,
};
