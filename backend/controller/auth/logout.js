module.exports = async function (req, res) {
  res.cookie("refreshToken", "").end();
};
