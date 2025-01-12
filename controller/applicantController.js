const asyncHandler = require("express-async-handler");
const Applicant = require("../models/applicantModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc get applicant info
// @route  GET /api/applicant/dashboard
// @access private
const getApplicant = asyncHandler(async (req, res) => {
  res.json(req.applicant); //base on decode in validateToken.js
  console.log("dashboard ",req.applicant);
});


// @desc Register Applicant
// @route  POST /api/applicant/register
// @access public
const registerApplicant = asyncHandler(async (req, res) => {
  console.log("The res body is: "+ res.body);
  const { name, email, password }= req.body;
  if(!name || !email || !password) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const findNameIfExist = await Applicant.findOne({ name });
  if(findNameIfExist) {
    res.status(400);
    throw new Error("Name is already exist.");
  }

  const findEmailIfExist = await Applicant.findOne({ email });
  if(findEmailIfExist) {
    res.status(400);
    throw new Error("Email is already exist.");
  }

  // hash password
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("hash password: ", hashPassword);

  const addApplicant = await Applicant.create({
    name,
    email,
    password: hashPassword
  });
  console.log(`Applicant register successfully ${name}`);
  if(addApplicant) {
    res.status(201).json({
      _id: addApplicant.id,
      name: addApplicant.name,
      email: addApplicant.email
    });
  } else {
    res.status(400);
    throw new Error("Register unsuccessful.");
  }
  
});

// @desc login applicant 
// @route  POST /api/applicant/login/:id
// @access public
const loginApplicant = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const applicant = await Applicant.findOne({ email })
  
  if(applicant && (await bcrypt.compare(password, applicant.password))) {
    const accessToken = jwt.sign({
      applicant: {
        name: applicant.name,
        email: applicant.email,
        id: applicant.id
      }
    }, process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "10m"}
  );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("Email or password is incorrect!");
  }
  
});


module.exports = {
  getApplicant,
  registerApplicant,
  loginApplicant
};