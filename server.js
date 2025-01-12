const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 2000;
const userRoutes = require("./routes/userRoutes");
const applicantRoutes = require("./routes/applicantRoutes.js");
const errorHandler = require("./middleware/error.js");
const connectDB = require("./config/dbConnection.js");

connectDB();
app.use(express.json());
app.use("/api/users", userRoutes);
app.use("/api/applicant", applicantRoutes);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Working on port ${port}`);
});