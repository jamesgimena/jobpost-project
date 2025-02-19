const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
      type: String,
      required: [true, "Please add name"]
    },
    email: {
      type: String,
      required: [true, "Please add email"]
    }
  },{
    timestamps: true
});


module.exports = mongoose.model("User", userSchema);