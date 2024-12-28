// User controller
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc get all User
// @route  GET /api/users
// @access public
const getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
};

// @desc get User info
// @route  GET /api/users/:id
// @access public
const getUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
    res.status(404);
    throw new Error("No user found!");
  }
  res.status(200).json(user);
});

// @desc Add User
// @route  POST /api/add/
// @access public
const addUser = asyncHandler(async (req, res) => {
  console.log("The res body is: "+ res.body);
  const { name, email }= req.body;
  if(!name || !email) {
    res.status(400);
    throw new Error("All fields are required!");
  }
  const addUsers = await User.create({
    name,
    email
  });
  res.status(201).json(addUsers);
});

// @desc Edit User
// @route  PUT /api/users/:1
// @access public
const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
    res.status(404);
    throw new Error("No user found!");
  }
  
  const update = await User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(update);
});

// @desc Delete User
// @route  DELETE /api/users/:1
// @access public
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if(!user) {
    res.status(404);
    throw new Error("No user found!");
  }
  
  await User.deleteOne();
  res.status(200).json(user);
});


module.exports = { 
  getUsers, 
  getUser, 
  addUser, 
  editUser, 
  deleteUser 
};