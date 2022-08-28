/**
 * Name: auth.controller.js
 * Description:
 */
// GET signup page
const getSignupPage = (req, res) => {
  res.status(200).render('customer/auth/signup');
};
// POST signup page
// POST login page
// GET login page
const getLoginPage = (req, res) => {
  res.status(200).render('customer/auth/login');
};

module.exports = {
  getSignupPage,
  getLoginPage,
};
