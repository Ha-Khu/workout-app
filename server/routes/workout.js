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
    let sqlXP = "UPDATE users SET xp = xp + 50, lvl = FLOOR((xp + 50) / 500) WHERE id = ?"
    db.query(sqlXP, [userID], (err)=>{
      if(err){
        res.status(500).json({error: err.message})
        return
      }
      res.json(results)
    })
  })
})

router.delete("/:id", verifyToken, (req, res)=>{
  const userID = req.user.id
  const id = Number(req.params.id)
  
  let deleteSets = "DELETE workout_set FROM workout_set INNER JOIN workout_exercise ON workout_set.workout_exercise_id = workout_exercise.id WHERE workout_exercise.workout_id = ?"
  
  db.query(deleteSets, [id], (err)=>{
    if(err){
      res.status(500).json({error: err.message})
      return
    }
    let deleteExercises = "DELETE FROM workout_exercise WHERE workout_id = ?"
    db.query(deleteExercises, [id], (err)=>{
      if(err){
        res.status(500).json({error: err.message})
        return
      }
      let deleteWorkout = "DELETE FROM workout WHERE id = ? AND user_id = ?"
      db.query(deleteWorkout, [id, userID], (err, results)=>{
        if(err){
          res.status(500).json({error: err.message})
          return
        }
        res.json(results)
      })
    })
  })
})

module.exports = router