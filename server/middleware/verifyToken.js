const jwt = require('jsonwebtoken')

function verifyToken(req, res, next){
  const token = req.headers.authorization?.split(' ')[1]
  if(!token){
    res.status(401).json({error: "Neplatný token"})
    return
  } else {
    try{
      const tokenApproved = jwt.verify(token, process.env.JWT_SECRET)
      req.user = tokenApproved
      next()
    } catch(err){
      res.status(401).json({error: "Neplatný token"})
    }
  }
}

module.exports = verifyToken