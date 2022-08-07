const jwt = require("jsonwebtoken");

const createToken = async (data) => {
  const token = await jwt.sign(data, "helloitsabouthackathone", {
    expiresIn: "24h",
  });
  return token;
};

module.exports = createToken;
