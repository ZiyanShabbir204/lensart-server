// models/User.js
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

import mongoose  from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
 
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [
      /^[\w+.-]+@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email address",
    ],
  }
});

// Encrypt password before saving
UserSchema.pre(["save"], async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare entered password with hashed password
UserSchema.methods.matchPassword = async function (enteredPassword) {
  const tes = await bcrypt.compare(enteredPassword, this.password);
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', UserSchema);

export default User
