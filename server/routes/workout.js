const express = require('express')
const jwt = require('jsonwebtoken')
const db = require('../db.js')
const verifyToken = require('../middleware/verifyToken.js')
const router = express.Router()

router.get("/", verifyToken, (req, res)=>{
  const userID = req.user.id
  let sql = "SELECT * FROM workout WHERE user_id = ?"
  db.query(sql, [userID], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.post("/", verifyToken, (req, res)=>{
  const userID = req.user.id
  const data = req.body
  let sql = "INSERT INTO workout(user_id, date) VALUES(?, ?)"
  db.query(sql, [userID, data.date], (err, results)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

router.delete("/:id", verifyToken, (req, res)=>{
  const userID = req.user.id
  const id = Number(req.params.id)
  let sql = "DELETE FROM workout WHERE id = ? AND user_id = ?"
  db.query(sql, [id, userID], (err, results)=>{
    if (err){
      res.status(500).json({error: err.message})
      return
    }
    res.json(results)
  })
})

module.exports = router