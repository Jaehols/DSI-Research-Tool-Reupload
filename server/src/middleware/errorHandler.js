function logError(err, req, res, next) {
  console.error(err.stack)
  res.status(err.statusCode)
  res.send({ description: err.message })
}

module.exports = {
  logError,
}
