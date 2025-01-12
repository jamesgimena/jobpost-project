const express = require("express");
const router = express.Router();
const {
  getUsers,
  addUser,
  getUser,
  editUser,
  deleteUser
} = require("../controller/userController");
const validateToken = require("../middleware/validateToken");

router.use(validateToken);
router.route("/").get(getUsers);
router.route("/add").post(addUser);
router.route("/:id").get(getUser).put(editUser).delete(deleteUser);

module.exports = router;