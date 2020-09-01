const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../models/User");

async function authenticateUser(email, password, done) {
  let user = await User.findOne({ email });

  if (user == null) {
    return done(null, false, { message: "Email Not Found" });
  }

  try {
    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect Password" });
    }
  } catch {
    return done(e);
  }
}

function intializePassport(passport) {
  passport.use(new LocalStrategy({ usernameField: "email" }, authenticateUser));

  passport.serializeUser((user, done) => done(null, user._id));
  passport.deserializeUser(async (id, done) => {
    let user = await User.findById(id);
    return done(null, user);
  });
}

module.exports = intializePassport;
