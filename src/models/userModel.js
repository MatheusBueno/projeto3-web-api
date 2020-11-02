const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    require: true,
  },
  isAdmin: {
    type: Boolean,
    require: true,
    default: false,
  },
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(password) {
    return bcrypt.compare(password, this.password);
  },
};

UserSchema.statics = {
  generateToken({ id }) {
    return jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 10000000,
    });
  },
};

module.exports = mongoose.model("User", UserSchema);
