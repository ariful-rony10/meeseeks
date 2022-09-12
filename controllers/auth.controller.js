/**
 * Name: auth.controller.js
 * Description: Authentication related logics.
 */
const User = require('../models/user.model');
const authUtil = require('../util/authentication');
// GET signup page
const getSignupPage = (req, res) => {
  res.status(200).render('customer/auth/signup');
};
// POST signup page
const signup = async (req, res, next) => {
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );
  try {
    await user.signup();
  } catch (error) {
    next(error);
    return;
  }

  res.redirect('/login');
};
// user login page
const login = async (req, res, next) => {
  //login logics
  const user = new User(req.body.email, req.body.password);
  let existingUser;
  try {
    existingUser = await user.getUserWithSameEmail();
  } catch (error) {
    next(error);
    return;
  }

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
// user logout
const logout = (req, res) => {
  authUtil.destryUserAuthSession(req);
  res.redirect('/login');
};

module.exports = {
  getSignupPage,
  getLoginPage,
  signup,
  login,
  logout,
};
