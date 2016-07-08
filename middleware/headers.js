module.exports = (req, res, next) => {
  // Allow CORS
  res.header("Access-Control-Allow-Origin", "*");
  // Allow Content-type header for JSON payloads
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  // Allow  more HTTP verbs
  res.header('Access-Control-Allow-Methods', 'GET,PUT, POST,DELETE');
  // Continue processing next request
  next();
};
