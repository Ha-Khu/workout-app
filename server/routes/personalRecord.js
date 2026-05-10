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
    let sqlXP = "UPDATE users SET xp = xp + 100, lvl = FLOOR((xp + 100) / 500) WHERE id = ?"
    db.query(sqlXP, [userID], (err)=>{
      if(err){
        res.status(500).json({error: err.message})
        return
      }
      res.json(result)
    })
  })
})

router.delete("/:id", verifyToken, (req, res)=>{
  const id = Number(req.params.id)
  let sql = "DELETE FROM personal_record WHERE id = ?"
  db.query(sql, [id],(err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})


module.exports = router