const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  const bearerPrefix = 'bearer '
  if (authorization && authorization.toLowerCase().startsWith(bearerPrefix)) {
    request.token =  authorization.substring(bearerPrefix.length)
  }
  next()
}

module.exports = tokenExtractor