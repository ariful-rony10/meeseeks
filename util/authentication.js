const createUserSession = (req, user, action) => {
  req.session.uid = user._id.toString();
  req.session.save(action);
};
// Destroy authentication session 
const destryUserAuthSession = (req) => {
  req.session.uid = null;
};
module.exports = {
  createUserSession,
  destryUserAuthSession
};
