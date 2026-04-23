const express = require('express')
const router = express.Router()
const db = require('../db.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/verifyToken.js')

router.get("/me", verifyToken, (req, res)=>{
  const userID = req.user.id
  let sql = "SELECT id, firstname, lastname, email, xp, lvl FROM users WHERE id = ?"
  db.query(sql, [userID], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.post("/register", (req,res)=>{
  const data = req.body
  let sql = "INSERT INTO users(firstname, lastname, email, password) VALUES(?, ?, ?, ?)"
  bcrypt.hash(data.password, 10).then((hashPassword)=>{
      db.query(sql, [data.firstname, data.lastname, data.email, hashPassword], (err, results)=>{
    if(err) {
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
   })
  })
})

router.post("/login", (req, res)=>{
  const data = req.body
  let sql = "SELECT * FROM users WHERE email = ?"
  db.query(sql, [data.email], (err, results)=>{
    if(err) {
      res.status(500).json({error: err.message})
      return
    }
    if(results.length === 0){
      res.status(401).json({error: "Email neexistuje"})
      return
    }
    bcrypt.compare(data.password, results[0].password).then((match)=>{
      if(match){
        const token = jwt.sign({id: results[0].id, email: results[0].email}, 
          process.env.JWT_SECRET, 
          {expiresIn: '1d'})
        res.json({token, message: "Prihlásenie úspešné"})
      } else {
        res.status(401).json({error: "Nesprávne heslo"})
      }
    })
  })
})

module.exports = router