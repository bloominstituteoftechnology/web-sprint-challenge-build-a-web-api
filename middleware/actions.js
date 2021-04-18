function checkUserData() {
    return (req, res, next) => {
      if (!req.body.name || !req.body.email) {
        return res.status(400).json({
          message: "Missing user name or email",
        });
      }
  
      next();
    };
  }

  module.exports ={
      checkUserData,
  }