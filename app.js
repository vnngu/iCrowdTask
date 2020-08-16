const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");

// Express app
const app = express();

// Register view engine
app.set("view engine", "ejs");

// Connect to MongoDB
const dbURI =
  "mongodb+srv://vnngu:bVWYE0tcX9kcKYAD@sit313.2hal6.mongodb.net/iCrowdTaskDB?retryWrites=true&w=majority";

// Listen to requests
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT))
  .catch((err) => console.log(err));

// Middleware and Static Files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Auth Routes
app.use("/", authRoutes);
// Request Task
app.get("/task", (req, res) => {
  res.render("reqtask");
});

// Success
app.get("/success", (req, res) => {
  res.render("success");
});
// Server Error
app.get("/server-error", (req, res) => {
  res.render("errors/500");
});
// 404
app.use((req, res) => {
  res.status(404).render("errors/404");
});
