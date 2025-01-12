const mongoose = require("mongoose");

const applicantSchema = mongoose.Schema(
  {    
    name: {
      type: String,
      required: [true, "Please add name"]
    },
    email: {
      type: String,
      required: [true, "Please add email"],
      unique: [true, "Email address already exist."]
    },
    password: {
      type: String,
      required: [true, "Please input password"]
    }
  },{
    timestamps: true
});


module.exports = mongoose.model("Applicant", applicantSchema);