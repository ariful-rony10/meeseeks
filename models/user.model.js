const bcrypt = require('bcrypt');

const db = require('../database/database');

class User {
  constructor(email, password, fullName, street, postal, city) {
    this.email = email;
    this.password = password;
    this.name = fullName;
    this.address = {
      street: street,
      postalCode: postal,
      city: city,
    };
  }

  // get user with same email
  getUserWithSameEmail() {
    return db.getDb().collection('users').findOne({ email: this.email });
  }

  // email already exists
  async existsAlready() {
    const existingUser = await this.getUserWithSameEmail();
    if (existingUser) {
      return true;
    } else {
      return false;
    }
  }

  // compare password
  hasMatchingPassword(hashedPassword) {
    return bcrypt.compare(this.password, hashedPassword);
  }

  // Signup
  async signup() {
    const hashedPassword = await bcrypt.hash(this.password, 12); // hashpassword

    await db.getDb().collection('users').insertOne({
      email: this.email,
      password: hashedPassword,
      name: this.name,
      address: this.address,
    });
  }
}

module.exports = User;
