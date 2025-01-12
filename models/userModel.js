const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    applicant_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Applicant"
    },
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