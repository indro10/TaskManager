const jwt = require("jsonwebtoken");
const getRefreshToken = (user) => {
  return jwt.sign(
    { email: user.email, password: user.pass },
    process.env.REFRESH_SECRET_KEY
  );
};
module.exports = getRefreshToken;
