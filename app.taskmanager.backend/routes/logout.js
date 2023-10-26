const express = require("express");
const app = express();
const router = express.Router();
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/getAccessToken");
const generateRefreshToken = require("../utils/getRefreshToken");

const { setRefreshToken } = require("../resources/RefreshToken");
const { setAccessToken } = require("../resources/AccessToken");
const { getUsers, setUsers } = require("../resources/UsersRes");
const authVerification = require("../middlewares/auth");
const {
  getRefreshTokens,
  setRefreshTokens,
} = require("../resources/RefreshTokensRes");

//Logout endpoint
app.post("/api/logout", authVerification, (req, res) => {
  try {
    const USERS = getUsers();
    const REF_TOKENS = getRefreshTokens();
    const refreshToken = req.body.token;
    REF_TOKENS = REF_TOKENS.filter((token) => token !== refreshToken);
    setRefreshTokens(REF_TOKENS);
    res.status(200).send("You logged out successfully.");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
