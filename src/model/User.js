const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const UserSchema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minlength: 6,
    },
    isAdmin: {
      type: String,
    },
    role: {
      type: String,
    },
    boutique: [
      {
        ref: "Boutique",
        type: String,
      },
    ],
    picture: {
      type: String,
      default: "./uploads/profil/random-user.png",
    },
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", UserSchema);
