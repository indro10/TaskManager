const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const generateAccessToken = require("../utils/getAccessToken");
const generateRefreshToken = require("../utils/getRefreshToken");
const {
  getRefreshTokens,
  setRefreshTokens,
} = require("../resources/RefreshTokensRes");
const authVerification = require("../middlewares/auth");

router.post("/", authVerification, (req, res) => {
  try {
    let refreshTokens = getRefreshTokens();
    const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
    //take the refresh token from the user
    const refreshToken = req.body.token;

    //send error if there is no token or it's invalid
    if (!refreshToken)
      return res.status(401).json("You are not authenticated!");
    if (!refreshTokens.includes(refreshToken)) {
      return res.status(403).json("Refresh token is not valid!");
    }
    jwt.verify(refreshToken, REFRESH_SECRET_KEY, (err, user) => {
      err && console.log(err);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

      const newAccessToken = generateAccessToken(user);
      const newRefreshToken = generateRefreshToken(user);

      refreshTokens.push(newRefreshToken);
      setRefreshTokens(refreshTokens);

      res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      });
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
