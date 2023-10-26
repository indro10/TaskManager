const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/getAccessToken");
const generateRefreshToken = require("../utils/getRefreshToken");
const generateUniqueId = require("generate-unique-id");

const { setRefreshToken } = require("../resources/RefreshToken");
const { setAccessToken } = require("../resources/AccessToken");
const { getUsers, setUsers } = require("../resources/UsersRes");
const {
  getRefreshTokens,
  setRefreshTokens,
} = require("../resources/RefreshTokensRes");

//Sign Up endpoint
router.post("/", (req, res) => {
  const USERS = getUsers();
  const REF_TOKENS = getRefreshTokens();
  const { email, password, name } = req.body;
  console.log(req.body);
  const user = USERS.find((user) => {
    return user.email === email && user.password === password;
  });
  if (!user) {
    const newUser = {
      email: email,
      password: password,
    };
    //Generate an access token
    const accessToken = generateAccessToken(newUser);
    const refreshToken = generateRefreshToken(newUser);

    REF_TOKENS.push(refreshToken);
    res.json({
      email: email,
      name: name,
      accessToken,
      refreshToken,
    });
    setUsers([
      ...USERS,
      { id: generateUniqueId(), name: name, email: email, password: password },
    ]);
    console.log(getUsers());
    setRefreshTokens(REF_TOKENS);
    setAccessToken(accessToken);
    setRefreshToken(refreshToken);
  } else {
    res.status(400).json("User Already added");
  }
});

module.exports = router;
