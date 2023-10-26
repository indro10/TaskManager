let refreshToken = "";

const getRefreshToken = () => {
  return refreshToken;
};

const setAccessToken = (token) => {
  if (token) {
    refreshToken = token;
  }
};
module.exports.getRefreshToken = getRefreshToken;
module.exports.setRefreshToken = setAccessToken;
