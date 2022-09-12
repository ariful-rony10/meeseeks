/**
 * Name: validation.js
 * Description:
 */

const isEmpty = (value) => {
  return !value || value.trim() === '';
};

const userCredentialsAreValid = (email, password) => {
  return email && email.includes('@') && password.trim().length > 5;
};

const emailIsConfirmed = (email, confirmEmail) => {
  return email === confirmEmail;
};

const userDetailsAreValid = (email, password, name, street, postal, city) => {
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
};

module.exports = {
  userDetailsAreValid,
  emailIsConfirmed,
};
