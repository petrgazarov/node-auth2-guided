const restrictOnlyAdmin = (req, res, next) => {
  const { decodedToken } = req;
  
  if (decodedToken.role !== 'admin') {
    next({ status: 403, message: 'Not allowed!' });
  } else {
    next();
  }
};

module.exports = restrictOnlyAdmin;