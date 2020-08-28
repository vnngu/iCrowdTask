const mongoose = require("mongoose");
const { validateUser } = require("../functions/validateUser");
const uuid = require("uuid");
const bcrypt = require("bcrypt");

// Mongoose generates ID automically by defaul
const UserSchema = mongoose.Schema({
  _id: {
    type: String,
    default: uuid.v4,
  },
  country: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zipCode: String,
  phoneNumber: String,
});

UserSchema.pre("save", async function (next) {
  const req = {
    body: {
      country: this.country,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      address: this.address,
      city: this.city,
      state: this.state,
      zipCode: this.zipCode,
      phoneNumber: this.phoneNumber,
    },
  };
  const { success, message } = await validateUser(req);
  if (success) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } else {
    throw Error(message);
  }
});

module.exports = mongoose.model("users", UserSchema);
