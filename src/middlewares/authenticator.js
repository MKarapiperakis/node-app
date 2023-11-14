const jwt = require('jsonwebtoken')
const { AuthError } = require('../lib/errors')

const bearerAuthenticator = (req, scopes, schema) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '')
    req.jwtPayload = jwt.verify(token, process.env.JWT_PRIVATE_KEY)
    if (req.openapi.schema['x-acl']) {
      const jwtScopes = new Set(req.jwtPayload.scopes)
      const reqScopes = new Set(req.openapi.schema['x-acl'])
      const intersection = new Set(
        [...reqScopes].filter(x => jwtScopes.has(x)))
      if (intersection.size > 0) return true
      else throw new AuthError('Invalid Scopes')
    }
    return true
  } catch (e) {
    throw new AuthError('Invalid Token')
  }
}

module.exports = {
  bearerAuthenticator
}