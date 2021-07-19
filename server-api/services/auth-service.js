const jwt = require('jsonwebtoken');
const db = require('../models');

const auth = {};

const ERROR_CODE = {
  SUCCESS: 0,
  FAIL: -1,
  EXCEPTION: -2,
  INVALID_PARAM: -3,
  INVALID_DATA: -4,
  UNKNOWN_EXCEPTION: -5,
  NOT_EXIST: -9,
  ALREADY_EXIST: -10,
  INVALID_SESSION: -11,
  INVALID_REQUEST: -12,
}

auth.genJSONWebToken = (uid, exp) => {
  return jwt.sign({
    id: uid
  }, process.env.TOKEN_SECRET, { expiresIn: exp });
}

auth.verify = async (req, res, next) => {
  try {
    let header = req.headers['authorization'];
    if (!header || !header.startsWith('Bearer ')) {
      return res.send({ error: ERROR_CODE.INVALID_SESSION, message: 'User session invalid.' });
    }

    let authToken = header.substring(7);
    var data = jwt.verify(authToken, process.env.TOKEN_SECRET);

    let user = await db.Users.findOne({
      zaloId: data.id
    });

    if (!user) {
      return res.send({ error: ERROR_CODE.NOT_EXIST, message: 'Account is not exits' });
    }
    
    req.user = user;
    return next();
  } catch (exception) {
    res.send({ error: ERROR_CODE.INVALID_SESSION, message: 'User session invalid.' });
    console.error('API-Exception:', exception);
  }
}

module.exports = auth;