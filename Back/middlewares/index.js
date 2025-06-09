const errorMiddleware  = require('./errorMidlewares')
const requireRole = require('./requireRole')
const authMiddleware = require('./authMiddleware')

module.exports = {authMiddleware ,errorMiddleware, requireRole}