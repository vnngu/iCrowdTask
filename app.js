require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const workerRoutes = require("./routes/workerRoutes");
const googleAuthRoutes = require("./routes/googleAuthRoutes");
const passport = require("passport");
const initailizePassport = require("./functions/passportConfig");
const initializedGooglePassport = require("./functions/googleLogin");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const { isUserAuthenticated } = require("./functions/checkAuthentication");
initailizePassport(passport);
initializedGooglePassport(passport);

// Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// Connect to MongoDB
const dbURI =
  "mongodb+srv://vnngu:bVWYE0tcX9kcKYAD@sit313.2hal6.mongodb.net/iCrowdTaskDB?retryWrites=true&w=majority";

// Listen to requests
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

// Middleware and Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECERT_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 3600 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
// Home
app.get("/", isUserAuthenticated, (req, res) => {
  res.render("home", { name: req.user.firstName });
});

// Auth Routes
app.use(authRoutes);
// Google Auth
app.use(googleAuthRoutes);

// Worker Routes
app.use("/workers", workerRoutes);

// Request Task
app.get("/task", isUserAuthenticated, (req, res) => {
  res.render("reqtask");
});

// Success
app.get("/success", isUserAuthenticated, (req, res) => {
  res.render("success", { name: req.user.firstName });
});

// Server Error
app.get("/server-error", (req, res) => {
  res.render("errors/500");
});
// 404
app.use((req, res) => {
  res.status(404).render("errors/404");
});
