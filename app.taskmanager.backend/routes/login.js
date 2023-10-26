const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/getAccessToken");
const generateRefreshToken = require("../utils/getRefreshToken");

const { setRefreshToken } = require("../resources/RefreshToken");
const { setAccessToken } = require("../resources/AccessToken");
const { getUsers, setUsers } = require("../resources/UsersRes");
const {
  getRefreshTokens,
  setRefreshTokens,
} = require("../resources/RefreshTokensRes");

//Login endpoint
router.post("/", (req, res) => {
  try {
    const USERS = getUsers();
    console.log(USERS);
    const REF_TOKENS = getRefreshTokens();
    const { email, password } = req.body;
    const user = USERS.find((user) => {
      return user.email === email && user.password === password;
    });
    if (user) {
      //Generate an access token
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);

      REF_TOKENS.push(refreshToken);
      res.json({
        name: user.name,
        email: user.email,
        accessToken,
        refreshToken,
      });
      setRefreshTokens(REF_TOKENS);
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
    } else {
      res.status(400).send("Username or password incorrect!");
    }
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
