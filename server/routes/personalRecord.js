const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db.js')
const verifyToken = require('../middleware/verifyToken.js')
const router = express.Router()

router.get("/", verifyToken, (req, res)=>{
  const userID = req.user.id
  let sql = "SELECT * FROM personal_record WHERE user_id = ?"
  db.query(sql, [userID], (err, result)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(result)
  })
})

router.post("/", verifyToken, (req, res)=>{
  const userID = req.user.id
  const data = req.body
  let sql = "INSERT INTO personal_record (user_id, exercise_library_id, weight, date) VALUES(?, ?, ?, ?)"
  db.query(sql, [userID, data.exercise_library_id, data.weight, data.date], (err, result)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(result)
  })
})


module.exports = router