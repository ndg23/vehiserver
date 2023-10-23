const mongoose = require("mongoose");
const bcrypt=require("bcrypt")
const UserSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true,
    },
    vehicles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vehicle",
        
      },
    ],
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: String,
      unique: true,
      trim: true,
    },
    uniq:{
      type:String,
      required:true,
    },
    password: {
      type: String,
    },
    isAdmin: {
      type: String,
    },
    role: {
      type: String,
    },
  
  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("User", UserSchema);
