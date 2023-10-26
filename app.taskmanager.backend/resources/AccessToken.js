let accessToken = "";

const getAccessToken = () => {
  return accessToken;
};

const setAccessToken = (token) => {
  if (token) {
    accessToken = token;
  }
};
module.exports.getAccessToken = getAccessToken;
module.exports.setAccessToken = setAccessToken;
