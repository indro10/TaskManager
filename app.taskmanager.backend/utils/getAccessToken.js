const jwt = require("jsonwebtoken");
const getToken = (user) => {
  return jwt.sign(
    { email: user.email, password: user.pass },
    process.env.SECRET_KEY,
    {
      expiresIn: "20m",
    }
  );
};
module.exports = getToken;
