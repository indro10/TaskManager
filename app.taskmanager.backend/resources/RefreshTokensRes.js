let refreshTokens = [];

const setRefreshTokens = (refreshTokensData) => {
  refreshTokens = refreshTokensData;
};
const getRefreshTokens = () => {
  return refreshTokens;
};

module.exports.getRefreshTokens = getRefreshTokens;
module.exports.setRefreshTokens = setRefreshTokens;
