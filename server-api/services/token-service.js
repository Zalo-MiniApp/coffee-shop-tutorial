const jwt = require('jsonwebtoken');
const db = require('../models');

function generateAccessToken(zaloId) {
  return jwt.sign({ zaloId }, process.env.TOKEN_SECRET, { expiresIn: '30m' });
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.TOKEN_SECRET, (err, { zaloId }) => {
    if (err) return res.sendStatus(403)

    db.Users.findOne({ zaloId }).then(user => {
      req.user = user
      next()
    }).catch(err => {
      console.error(err)
      res.sendStatus(403)
    })
  })
}

module.exports = {
  generateAccessToken,
  authenticateToken
}