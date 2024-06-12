const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {
  // First check request headers has authorization or not
  const authorization = req.headers.authorization;
  if(!authorization){
    return res.status(401).json({error: "Token not found."});
  }

  // Extract the jwt token from the request header
  const token = req.headers.authorization.split(' ')[1];
  if(!token){
    return res.status(401).json({error: 'Unauthorized'});
  }

  try {
    // Verify the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    // token ka data extract krke ham req.user me dal rahe hai 
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({error: 'Invalid token'});
  }
}

// Function to generate JWT tokens
const generateToken = (userData) => {
  // Generate a new jwt token using user data
  return jwt.sign(userData, process.env.JWT_SECRET);

  // May be many a times, the expiresIn doesn't work, so when you are passing the payload, here (userData), make sure it should be an object, not any string or other data type.

  // We can also set the expiry time of the token. Here it is 30 sec

  // return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 30});
}

module.exports = {jwtAuthMiddleware, generateToken};