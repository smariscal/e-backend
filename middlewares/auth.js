let isAdmin = true;  // hardcodeado

const isAuthenticated = (req, res, next) =>{
  if (isAdmin){
    return next();
  }else{
    const response = {
      error: -1,
      description: `${req.path} ${req.method} no esta autorizado`
    }
    res.status(401).json(response);
  }
}

module.exports = {
  isAuthenticated: isAuthenticated
}