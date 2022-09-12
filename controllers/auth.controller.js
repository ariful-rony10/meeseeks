/**
 * Name: auth.controller.js
 * Description: Authentication related logics.
 */
const User = require('../models/user.model'); // user model
const authUtil = require('../util/authentication'); // authentication
const validation = require('../util/validation'); // validation
const sessionFlash = require('../util/session-flash'); // session flash
// GET signup page
const getSignupPage = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      confirmEmail: '',
      password: '',
      fullname: '',
      street: '',
      postal: '',
      city: '',
    };
  }

  res.status(200).render('customer/auth/signup', { inputData: sessionData });
};
// POST signup page
const signup = async (req, res, next) => {
  const enteredData = {
    email: req.body.email,
    confirmEmail: req.body['confirm-email'],
    password: req.body.password,
    fullname: req.body.fullname,
    street: req.body.street,
    postal: req.body.postal,
    city: req.body.city,
  };
  // Validate user details
  if (
    !validation.userDetailsAreValid(
      req.body.email,
      req.body.password,
      req.body.fullname,
      req.body.street,
      req.body.postal,
      req.body.city
    ) ||
    !validation.emailIsConfirmed(req.body.email, req.body['confirm-email'])
  ) {
    // Flash data to session
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Please check your inputs!',
        ...enteredData,
      },
      () => {
        res.redirect('/signup');
      }
    );
    return;
  }
  // Create user data object
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  try {
    // Check if  the user email already exists in the db
    const existsAlready = await user.existsAlready();
    if (existsAlready) {
      // Flash data to session
      sessionFlash.flashDataToSession(
        req,
        {
          errorMessage: 'User Exists Already - try login instead!',
          ...enteredData,
        },
        () => {
          res.redirect('/signup');
        }
      );
      return;
    }
    // insert into db
    await user.signup();
  } catch (error) {
    // if error throw error
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
    // flash data to session
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Invalid Credentials - Please check email and password!',
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect('/login');
      }
    );
    return;
  }

  const passwordIsCorrect = await user.hasMatchingPassword(
    existingUser.password
  );
  if (!passwordIsCorrect) {
    // flash data to session
    sessionFlash.flashDataToSession(
      req,
      {
        errorMessage: 'Invalid Credentials - Please check email and password!',
        email: user.email,
        password: user.password,
      },
      () => {
        res.redirect('/login');
      }
    );
    return;
  }

  authUtil.createUserSession(req, existingUser, function () {
    res.redirect('/');
  });
};
// GET login page
const getLoginPage = (req, res) => {
  let sessionData = sessionFlash.getSessionData(req);

  if (!sessionData) {
    sessionData = {
      email: '',
      password: '',
    };
  }
  res.status(200).render('customer/auth/login', { inputData: sessionData });
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
