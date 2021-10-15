
exports.logErrors = (error, req, res, next) => {
  console.error(error.stack)
  next(error)
}

exports.respondNoResourceFound = (req, res) => {
  let errorCode = 404
  res.status(errorCode)
  res.send(`${errorCode} | The page does not exist!`)
}

exports.respondInternalError = (error, req, res, next) => {
  let errorCode = 500
  console.log(`ERROR occurred: ${error.stack}`)
  res.status(errorCode)
  res.send(`${errorCode} | Sorry, our application is experiencing a problem!`)
}
