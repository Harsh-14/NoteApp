const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      index: true,
      trim: true,
      minlength: 2,
      max: 20,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      minlength: 5,
      required: true,
    },
    hash_password: {
      type: String,
      required: true,
      minlength: 6,
    },
    status: {
      type: String, 
      enum: ['Pending', 'Active'],
      default: 'Pending'
    },
    confirmationCode: { 
      type: String, 
      unique: true },

  
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("password").set(function (password) {
  this.hash_password = bcrypt.hashSync(password, 10);
});

//or use directly in routes
userSchema.methods = {
  authenticate: function (password) {
    return bcrypt.compareSync(password, this.hash_password);
  },
};

module.exports = mongoose.model("User", userSchema);
