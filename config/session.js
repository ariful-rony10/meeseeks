const mongoDbStore = require('connect-mongodb-session');
const expressSession = require('express-session');
// Create session store
const createSessionStore = () => {
  const MongoDBStore = mongoDbStore(expressSession);

  const store = new MongoDBStore({
    uri: process.env.MONGODB_URL || 'mongodb://localhost:27017',
    databaseName: 'meeseeks',
    collection: 'sessions',
  });
  
  return store;
};

// Session config
const createSessionConfig = () => {
  return {
    secret: process.env.SESSION_SECRECT || 'super-secrect',
    resave: false,
    saveUninitialized: false,
    store: createSessionStore(),
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
    },
  };
};

module.exports = createSessionConfig;
