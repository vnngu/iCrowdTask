const google_auth = () => {};
const google_auth_call_back = (req, res) => {
  res.cookie("isSave", "true", { httpOnly: true, maxAge: 3600 * 1000 });
  res.redirect("/");
};
module.exports = { google_auth, google_auth_call_back };
