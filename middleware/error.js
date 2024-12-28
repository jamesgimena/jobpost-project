const { constants } = require("../constants");

const error = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.json({ message: err.message, stackTrace: err.stack });

  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validation Failed",
        message: err.message, 
        stackTrace: err.stack 
      });
      break;

    case constants.UNAUTHORIZE:
      res.json({
        title: "Unauthorized",
        message: err.message, 
        stackTrace: err.stack 
      });
      break;
    
    case constants.FORBIDDEN:
      res.json({
        title: "Forbidden 403",
        message: err.message, 
        stackTrace: err.stack 
      });
      break;
    
    case constants.NOT_FOUND:
      res.json({
        title: "404 Not found",
        message: err.message, 
        stackTrace: err.stack 
      });

    case constants.SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message, 
        stackTrace: err.stack 
      });
  
    default:
      console.log("No status code error");
      break;
  }
};

module.exports = error;